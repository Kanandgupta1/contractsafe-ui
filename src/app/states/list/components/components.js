import { NgModule, ViewContainerRef, ComponentFactoryResolver, Host } from '@angular/core';
import { FilterComponent } from './filter';
import { SortComponent } from './sort';
import { MenuDetailTypes } from '../list.constants';

import { ComponentsModule } from '../../../components/components';

// Gather all possible dynamic modules as entry components for the dynamic component
const PossibleComponents = [FilterComponent, SortComponent];

// Create component to state mapping, to select the state specific component
export const ComponentMapping = {
  [MenuDetailTypes.Filter] : FilterComponent,
  [MenuDetailTypes.Sort] : SortComponent
};

@NgModule({
  imports: [
    ComponentsModule
  ],
  entryComponents: PossibleComponents,
  declarations: PossibleComponents,
  exports: PossibleComponents
})
export class ListComponentsModule {}; 