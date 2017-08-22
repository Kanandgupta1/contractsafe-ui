import { Observable } from 'rxjs';
import _ from 'lodash';
import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { HttpService } from '@fino/ng2-common';

import { Http, Headers, RequestOptions } from '@angular/http';
import { BankModel } from '../models/bank.model';

const LogoMapping = {
  'ostseesparkasse': 'sparkasse',
  'mritzsparkasse': 'sparkasse',
  'landesbank': 'sparkasse',
  'spardabank': 'sparda-hessen',
  'vr': 'vrbank',
  'eckernfrder': 'vrbank',
  'frankfurter': 'sparkasse'
};

const AchtzehnBlzs = ['50050222'];

@Injectable()
export class BankService extends InjectableClass {
  constructor(@Inject(HttpService) http) {
    super({ http });
  }

  search(search, limit = 10) {
    return this.http
      .get(`/api/v0/banks/${search}?limit=${limit}`, { silent: true })
      .transform(this.expandWithLogo)
      .execute();
  }

  getBank(bank) {
    return this.http
      .get(`/api/v0/bank/${bank.legacyBankIdentifier}`)
      .transform(data => {
        return _.merge({}, bank, data)
      })
      .modelize(BankModel)
      .execute();
  }

  // TODO Find better way to get logos
  expandWithLogo(data) {
    return _.map(data.banks, bank => {
      let bankName = bank.description.split(' ')[0];
      if (_.includes(AchtzehnBlzs, bank.legacyBankIdentifier)) {
        bankName = '1822direkt';
      }
      else {
        bankName = bankName.replace(/[^\w\s]/gi, '').toLowerCase();
        if (LogoMapping[bankName]) {
          bankName = LogoMapping[bankName];
        }
      }
      const homepage = `${bankName}.de`;
      return _.merge({}, bank, { homepage });
    });
  }
}