import _ from 'lodash'; 
import Categories from './category.constants';

export const ContractDetails = [{
  name: 'general',
  controls: [{
      type: 'input',
      id: 'customerNumber'
    },
    {
      type: 'select',
      id: 'category',
      inject: [{
        where: 'options',
        what: (fcm, model) => {
          let categories =  _.keys(Categories);

          return categories.map(t => { 
            return {
              value: t,
              label: t
            };
          });
        }
      }]
    },
    {
      type: 'select',
      id: 'subcategory',
      inject: [{
        where: 'options',
        observe: 'category',
        what: (fcm, model, value) => {
          if (!value || !Categories[value]) {
            return [];
          }

          return Categories[value].map(t => { 
            return {
              value: t,
              label: t
            };
          });
        }
      }]
    }
  ]
}, {
  name: 'product',
  controls: [
      {
        type: 'input',
        id: 'tarif'
      }, {
        type: 'select',
        id: 'status',
        options: [{
          value: 'active',
          label: 'translate:formControl.options.active'
        },{
          value: 'inactive',
          label: 'translate:formControl.options.inactive'
        }]
      }, {
        type: 'input',
        inputType: 'number',
        id: 'amount',
        dependant: {
          on: 'contractType',
          value: 'manual'
        },
        // TODO: use provider (NG_FORMATTERS f.e.), make pipes injectable
        formatter: {
          read: val => val/100,
          write: val => {
            let formatted = _.isString(val) ? val.replace(',', '.') : val;
            return formatted * 100;
          }
        }
      }
    ]
}, {
  name: 'duration',
  controls: [
    {
      type: 'select',
      id: 'interval',
      options: [{
        value: 1,
        label: 'translate:intervals.1'
      },{
        value: 4,
        label: 'translate:intervals.4'
      },{
        value: 6,
        label: 'translate:intervals.6'
      },{
        value: 12,
        label: 'translate:intervals.12'
      }]
    }, {
      type: 'input',
      inputType: 'number',
      id: 'noticePeriod',
      suffix: 'translate:formControl.suffix.monthes'
    }, {
      type: 'datepicker',
      id: 'expiration',
      formatter: {
        read: val => new Date(val),
        write: val => val.toISOString ? val.toISOString() : val
      }
    }, {
      type: 'input',
      inputType: 'number',
      id: 'extend',   
      suffix: 'translate:formControl.suffix.monthes'
    }
  ]
}, {
  name: 'contact',
  controls: [
    {
      type: 'input',
      id: 'hotline',
      validators: {
        validatePhone: null
      }
    }, 
    {
      type: 'input',
      id: 'email',
      validators: {
        validateEmail: null
      }
    }, 
    {
      type: 'input',
      id: 'portal'
    }
  ]
}];

export const AddContract = [{
  name: 'duration',
  header: 'addContract',
  controls: [{
    type: 'datepicker',
    id: 'expiration',
    validators: {
      required: null
    },
    formatter: {
      read: val => new Date(val),
      write: val => val.toISOString ? val.toISOString() : val
    }
  }, {
    type: 'select',
    id: 'interval',
    options: [{
      value: 1,
      label: 'translate:intervals.1'
    },{
      value: 4,
      label: 'translate:intervals.4'
    },{
      value: 6,
      label: 'translate:intervals.6'
    },{
      value: 12,
      label: 'translate:intervals.12'
    }],
    validators: {
      required: null
    }
  }]
},{
  name: 'product',
  hideHeader: true,
  controls: [{
    type: 'input',
    inputType: 'number',
    id: 'amount',
    validators: {
      required: null
    },
    // TODO: use provider (NG_FORMATTERS f.e.)
    formatter: {
      write: val => {
        let formatted = val.replace(',', '.');
        return formatted * 100;
      }
    }
  }]
}]

export const User = [{
  name: 'user',
  controls: [{
      type: 'input',
      id: 'firstName'
    },{
      type: 'input',
      id: 'lastName'
    },{
      type: 'input',
      id: 'email',
      validators: {
        validateEmail: null
      }
    },{
      type: 'input',
      id: 'phone',
      validators: {
        validatePhone: null
      }
    }
  ]
}, {
  name: 'address',
  controls: [{
      type: 'input',
      id: 'street',
      grid: 8
    },{
      type: 'input',
      id: 'houseNumber',
      grid: 4
    },{
      type: 'input',
      id: 'postcode',
      grid: 4
    },{
      type: 'input',
      id: 'city',
      grid: 8
    }
  ]
}];
