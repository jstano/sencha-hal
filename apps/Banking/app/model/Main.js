Ext.define('Banking.model.Main', {
   extend: 'Ext.ux.hal.HalModel',

   fields: [
      {name: 'customerName', type: 'string'},
      {name: 'bankName', type: 'string'}
   ]
});
