import _ from 'lodash';
import { BaseModel } from '@fino/ng2-common';

export class BankModel extends BaseModel {
  get loginIcon() {
    return this.additional_icons['120x120'];
  }

  constructor(bank) {
    super(bank);
  }
}