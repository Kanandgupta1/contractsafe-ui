import _ from 'lodash';
import { Injectable } from '@angular/core';

import { ContractDetails, User, AddContract } from '../constants/formular.constants';

Injectable()
export class FormularService {
  get DefaultFields() {
    return {
      AddContract,
      ContractDetails,
      User
    };
  }

  calculatedCompleted(model, fields) {
    const fieldCount = 100 / _.sumBy(fields, f => f.controls.length);
    return parseInt(_.sumBy(fields, f => _.sumBy(f.controls, c => {
      return +!!(model[f.name] && !_.isUndefined(model[f.name][c.id]));
    })) * fieldCount);
  }

  calculateContractDetailsCompleted(model) {
    const fields = this.DefaultFields.ContractDetails;
    return this.calculatedCompleted(model, fields);
  }

  getContractDetailField(detail) {
    const path = detail.split('.');
    const group = _.find(this.DefaultFields.ContractDetails, cd => cd.name === path[0]);
    const controls = _.filter(group.controls, c => c.id === path[1]);
    return [_.merge(
      {},
      _.omit(group, 'controls'), 
      { hideHeader: true, controls }
    )];
  }
}