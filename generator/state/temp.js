import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components';

import { <%= upperCaseName %>Component } from './<%= lowerCaseName %>.component';
import { <%= lowerCaseName %>State } from './<%= lowerCaseName %>.state';

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule.forChild(<%= lowerCaseName %>State)
  ],
  declarations: [<%= upperCaseName %>Component],
  exports: [
    RouterModule
  ]
})
export class <%= upperCaseName %>Module {};