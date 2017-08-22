import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ErrorComponentsModule } from '../../components/components';

import { ErrorComponent } from './error.component';
import { errorLazyState } from './error.state';

@NgModule({
  imports: [
    ErrorComponentsModule,
    RouterModule.forChild(errorLazyState)
  ],
  declarations: [ErrorComponent]
})
export class ErrorLazyModule {};