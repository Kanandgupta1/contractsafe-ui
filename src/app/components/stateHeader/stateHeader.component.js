import { ViewChild, Output, EventEmitter } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './stateHeader.html';
import styles from './stateHeader.scss';

@ExtendedComponent({
  inputs: ['header', 'left', 'right', 'leftIcon', 'rightIcon', 'noContent', 'expanded'],
  selector: 'state-header',
  template,
  styles: [styles],
  queries: {
    summaryDetail: new ViewChild('summaryDetail'),
    summaryIcon: new ViewChild('summaryIcon'),
    summaryIconContainer: new ViewChild('summaryIconContainer'),
    summaryContent: new ViewChild('summaryContent'),
    summaryContentSlider: new ViewChild('summaryContentSlider'),
    summaryContentContainer: new ViewChild('summaryContentContainer')
  }
})
export class StateHeaderComponent {
  @Output() expandedChange = new EventEmitter();

  get hasDetailContent() {
    return this.summaryDetail && this.summaryDetail.nativeElement.children.length;
  }

  expand() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }

  ngAfterViewInit() {
    if (!this.summaryIcon.nativeElement.children.length) {
      this.summaryIconContainer.nativeElement.remove();
    }

    if (!this.summaryContent.nativeElement.children.length) {
      this.summaryContentSlider.ngOnDestroy();
      this.summaryContentContainer.nativeElement.remove();
    }
  }
};