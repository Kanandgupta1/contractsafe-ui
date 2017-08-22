import _ from 'lodash';
import { WebEnvironment } from '@fino/lib-environment';

const customizations = {
  default: 'default',
  professional: 'professional'
};

const host = window.location.host;
const Environment = new WebEnvironment(customizations, host);

Environment.pending = _.includes(host, '1822direkt');

export default Environment;