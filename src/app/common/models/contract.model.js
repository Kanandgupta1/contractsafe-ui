import _ from 'lodash';
import { BaseModel } from '@fino/ng2-common';

const ContractStatus = {
  Active: 'active'
};

export class ContractModel extends BaseModel {
  static createNew(values) {
    values.contractStatus = ContractStatus.Active;
    values.selected = true;
    values.product.amount *= -1;
    return new ContractModel(values);
  }

  get detailsForCompletion() {
    return ['general.customerNumber', 'general.category', 'duration.interval', 'duration.extend', 'duration.expiration'];
  }

  get detailsIncomplete() {
    return _.filter(this.detailsForCompletion, (detail) => !this.detailCompleted(detail));
  }

  get active() {
    return !this.contractStatus || this.contractStatus === ContractStatus.Active;
  }

  get endDate() {
    return this.duration && this.duration.expiration && new Date(this.duration.expiration);
  }

  get ended() {
    return this.endDate && Date.now() > this.endDate;
  }

  constructor(contract) {
    super(contract);
  }

  detailCompleted(detail) {
    return this.details && _.includes(this.details, detail);
  }
}