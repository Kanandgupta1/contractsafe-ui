import _ from 'lodash';
import { BaseModel } from '@fino/ng2-common';

export class AccountModel extends BaseModel {
  get summary() {
    const value = _.get(this.model, 'Summary.value') || 0;
    return [{
      type: 'contracts',
      value
    }];
  }

  constructor(account) {
    super(account);
  }
}