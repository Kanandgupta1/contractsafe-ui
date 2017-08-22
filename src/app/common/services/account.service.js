import { Observable } from 'rxjs';
import _ from 'lodash';

import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { HttpService } from '@fino/ng2-common';

import { AccountModel } from '../models/account.model';
import { ContractModel } from '../models/contract.model';

import { CustomAppStateService, StateKeys } from './appState.service';
import { FormularService } from './formular.service';

const ContractPrefillMapping = {
  homepage: 'contact.portal',
  email: 'contact.email',
  phone: 'contact.phone',
  amount: 'product.amount',
  interval: 'duration.interval',
  selectedTag: 'general.category',
  contractStatus: 'product.status'
};

// TODO Rename with...Message to notifyOn...
// TODO Call order with... first
// TODO Extract all save state logic (concat/update)
// TODO Add data models (contract, feed, booking, etc)
//      and maybe move transforming logic to them (?)
// TODO Handle busy flags
@Injectable()
export class AccountService extends InjectableClass {
  constructor(
    @Inject(HttpService) http, 
    @Inject(CustomAppStateService) storage,
    @Inject(FormularService) formularService) {
    super({ http, storage, formularService });
  }

  addAccount(user, bank) {
    const { credentials } = user;
    const { legacyBankIdentifier } = bank;

    return this.http.post('/api/v0/user/bankaccount', { 
        credentials: _.map(credentials), 
        bankCode: legacyBankIdentifier 
      }, {
        silent: true
      })
      .withTranslationKey('login')
      .withErrorMessage()
      .execute();
  }

  addContract(contract) {
    return this.http
      .post('/api/v1/user/contracts/add', contract, { silent: true})
      .withTranslationKey('addContract')
      .withErrorMessage()
      .withSuccessMessage()
      .execute();
  }

  fetchContracts(replace = false, silent = false) {
    return this.http
      .get('/api/v1/user/contracts', { silent })
      .modelize(ContractModel)
      .transform((data) => {
        // Mark empty contracting partner for hiding
        const hidable = _.filter(data, this.mustHideContract);
        _.forEach(hidable, h => {
          h.hide = true;
          h.selected = false;
        });
        // Map elastic search values to contracting details
        this.resolvePrefillMapping(data);

        // Calculate details completed
        this.calculatedCompleted(data);

        // Replace existing contracting partner if needed
        if (replace) {
          return data;
        }
        const current = this.storage.contracts || [];
        return current.concat(data);
      })
      .saveToState(StateKeys.Contracts)
      .forceReload()
      .withErrorMessage()
      .execute();
  }

  fetchContractsForOnboarding() {
    return this.http
      .get('/api/v1/user/contracts', { silent: true })
      .modelize(ContractModel)
      .transform((data) => {
        _.each(data, c => c.selected = true);
        return data;
      })
      .saveToState(StateKeys.Contracts)
      .forceReload()
      .withErrorMessage()
      .execute();
  }

  fetchUntaggedContracts() {
    return this.http
      .get('/api/v1/user/contracts/untagged')
      .modelize(ContractModel)
      .saveToState(StateKeys.Contracts)
      .forceReload()
      .withErrorMessage()
      .execute();
  }

  putUntaggedContracts(contractIds) {
    return this.http
      .put(`api/v1/user/contracts/untagged`, contractIds)
      .withTranslationKey('saveUntagged')
      .withErrorMessage()
      .execute();
  }

  fetchStandingOrders() {
    return this.http
      .get('/api/v1/user/contracts/standingOrders')
      .modelize(ContractModel)
      .saveToState(StateKeys.Contracts)
      .forceReload()
      .withErrorMessage()
      .execute();
  }

  putStandingOrders(contractIds) {
    return this.http
      .put(`api/v1/user/contracts/standingOrders`, contractIds)
      .withTranslationKey('saveUntagged')
      .withErrorMessage()
      .execute();
  }

  fetchNewsFeed() {
    return this.http
      .get('/api/v0/user/feed')
      .withErrorMessage()
      .execute();
  }

  fetchBookings() {
    return this.http
      .get('/api/v0/user/bookings')
      .saveToState(StateKeys.Bookings)
      .withErrorMessage()
      .execute();
  }

  fetchDetailsFor(id) {
    return this.http
      .get(`api/v1/user/contracts/${id}`, { silent: true })
      .withTranslationKey('details')
      .withErrorMessage()
      .transform((resp) => {
        resp.summedBookings = this.sumBookingsAmout(resp.bookingHistory, b => {
          return new Date(b.bookingdate).getMonth();
        });
        return resp;
      })
      .execute();
  }

  deleteDocument(documentId, id) {
    return this.http
      .delete(`api/v0/user/contracts/${id}/document/restore/${documentId}`, {silent: true})
      .withTranslationKey('delete')
      .withErrorMessage()
      .execute();
  }

  fetchDocument(documentId, id) {
    return this.http
      .get(`api/v0/user/contracts/${id}/document/restore/${documentId}`, {silent: true})
      .execute();
  }

  uploadDocument(id, document) {
    return this.http
      .post(`api/v0/user/contracts/${id}/document/upload/`, document, { silent: true})
      .withTranslationKey('upload')
      .withErrorMessage()
      .execute();
  }

  fetchSummary() {
    return this.http
      .get('/api/v1/user/contracts/overview')
      .transform((data) => { 
        const { summary, categories } = data;
        return summary && categories && { 
          total: summary,
          categories
        };
      })
      .saveToState(StateKeys.Summary)
      .withErrorMessage()
      .execute();
  }

  fetchAccounts() {
    return this.http
      .get('/api/v0/user/accounts', { silent: true })
      .modelize(AccountModel)
      .withErrorMessage()
      .execute();
  }

  fetchPersonalInformation() {
    return this.http
      .get('/api/v0/user/personalInformation')
      .execute();
  }

  putPersonalInformation(user) {
    return this.http
      .put('/api/v0/user/personalInformation', user, { silent: true })
      .withErrorMessage()
      .withSuccessMessage()
      .execute();
  }

  refresh(silent = false) {
    return this.http
      .get('/api/v1/user/contracts/update', { silent })
      .transform(c => {
        if (c.contracts) {
          c.contracts = _.map(c.contracts, contract => {
            contract.selected = true;
            return contract;
          });
        }
        return c;
      })
      .saveToState(StateKeys.OnboardingContracts)
      .forceReload()
      .execute();
  }

  putDetails(id, details, successMessage = true) {
    const request = this.http
      .put(`api/v1/user/contracts/${id}`, details,
      { 
        silent: true
      })
      .withTranslationKey('saveDetails')
      .withErrorMessage()
      .transform((data) =>  {
        this.storage.updateContract(id, details);
        return data;
      });

    if (successMessage) {
      request.withSuccessMessage();
    }
    return request.execute();
  }

  deleteContracts(contractIds, silent) {
    return this.http
      .put('/api/v1/user/contracts', contractIds, { silent })
      .transform(data => {
        this.storage.deleteContracts(contractIds);
        return data;
      })
      .withTranslationKey('contractDeleted')
      .withErrorMessage()
      .execute();
  }

  delete() {
    return this.http
      .delete('/api/v0/user/contracts/delete')
      .withTranslationKey('deleteUser')
      .withErrorMessage()
      .execute();
  }

  deleteAccount(id) {
    return this.http
      .delete(`/api/v0/user/bankaccount/${id}`)
      .withTranslationKey('deleteAccount')
      .withErrorMessage()
      .execute();
  }

  sumBookingsAmout(bookings, groupFunc) {
    return _.reduce(bookings, (acc, next) => {
      const group = groupFunc(next);
      let crntGroup = _.find(acc, i => i.group === group);
      if (!crntGroup) {
        crntGroup = { 
          group,
          amount: 0 
        };
        acc.push(crntGroup);
      }
      crntGroup.amount -= next.amount;
      return acc;
    }, [])
  }

  mustHideContract(cp) {
    return !cp || !cp.name;
  }

  resolvePrefillMapping(contracts) {
    const prefillSources = _.keys(ContractPrefillMapping);
    _.forEach(contracts, cp => {
      // Get all prefill properties which destination isnt present
      // Set it to prefill source
      const prefills = _.filter(prefillSources, source => !_.get(cp, ContractPrefillMapping[source]));
      _.forEach(prefills, source => {
        const prefillDestination = ContractPrefillMapping[source];
        _.set(cp, prefillDestination, cp[source]);
      });
    })
  }

  calculatedCompleted(contracts) {
    _.forEach(contracts, cp => {
      // Get the default contract detail fields and calculate the percentage
      // from what the user has already filled of them
      const fields = this.formularService.DefaultFields.ContractDetails;
      cp.completed = this.formularService.calculatedCompleted(cp, fields);
    });
  }
}
