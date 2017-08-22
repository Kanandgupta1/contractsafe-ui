import { AppPath } from '../../app.state'
import { <%= upperCaseName %>Component } from './<%= lowerCaseName %>.component';

export const <%= upperCaseName %>Path = '<%= lowerCaseName %>';

export const <%= lowerCaseName %>State = {
  path: <%= upperCaseName %>Path,
  component: <%= upperCaseName %>Component
};