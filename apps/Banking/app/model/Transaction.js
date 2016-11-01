Ext.define('Banking.model.Transaction', {
   extend: 'Ext.ux.hal.HalModel',

   fields: [
      {name: 'accountNumber', type: 'string'},
      {name: 'date', type: 'date'},
      {name: 'description', type: 'string'},
      {name: 'type', type: 'string'},
      {name: 'amount', type: 'number'}
   ]
});
