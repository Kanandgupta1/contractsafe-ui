import { ExtendedComponent } from '@fino/ng2-common';
import { Inject, Output, EventEmitter } from '@angular/core';
import  {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import template from './contractDetailCompletionView.html';
import styles from './contractDetailCompletionView.scss';
import PeerGroupAnalysis from '../../common/constants/peerGroup.constants';
import { ContractDetails, Test } from '../../common/constants/formular.constants';
import { FormularService } from '../../common/services/formular.service';

@ExtendedComponent({
  inputs: ['contracts'],
  selector: 'contract-detail-completion-view',
  template,
  styles: [styles],
  animations: [
    trigger('previewState', [
      state('frst', style({top: '60px', transform: 'scale(1)'})),
      state('scnd', style({top: '40px', transform: 'scale(0.95)'})),
      state('thrd', style({top: '20px', transform: 'scale(0.9)'})),
      state('frth', style({top: '0px', transform: 'scale(0.85)'})),
      transition('scnd => frst', [animate('0.2s')]),
      transition('thrd => scnd', [animate('0.3s')]),
      transition('frth => thrd', [animate('0.4s')]),
      transition('void => frth', [animate('0.5s')]),
    ])
  ]
})
export class ContractDetailCompletionViewComponent {
  @Output() contractUpdated = new EventEmitter();

  get previewStates() {
    return ['frst', 'scnd', 'thrd', 'frth'];
  }

  get hasContracts() {
    return this.visibleDetails && this.visibleDetails.length;
  }

  constructor(@Inject(FormularService) formularService ) {
    this.formularService = formularService;
  }

  getContractDetailsToComplete() {
    return _.reduce(this.contracts, (acc, contract) => {
      _.each(contract.detailsIncomplete, detail => {
        acc.push({
          contract,
          detail
        });
      });
      return acc;
    }, []);
  }

  getVisibleDetails() {
    return _.reverse(_.reduce(this.previewStates, (acc, previewState, i) => {
      const contractDetail = _.get(this.contractDetailsToComplete, i);
      if (contractDetail) {
        acc.push(_.merge(
          {},
          contractDetail,
          { previewState }
        ));
      }
      return acc;
    }, []));
  }

  ngOnChanges(changes) {
    this.update();
  }

  update() {
    //this.updateContract(updates);
    this.contractDetailsToComplete = this.getContractDetailsToComplete();
    this.visibleDetails = this.getVisibleDetails();
    this.total = _.filter(this.contracts, c => c.detailsIncomplete.length).length;
  }

  trackByContractDetail(i, item) {
    return item.contract.id + item.detail;
  }
};