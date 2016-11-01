Ext.define('Banking.model.Account', {
   extend: 'Ext.ux.hal.HalModel',

   fields: [
      {name: 'accountNumber', type: 'string'},
      {name: 'type', type: 'string'},
      {name: 'balance', type: 'number'}
   ]
});
