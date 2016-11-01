Ext.define('Ext.ux.hal.HalStore', {
   extend: 'Ext.data.Store',

   alias: 'store.hal',

   requires: [
      'Ext.ux.hal.proxy.HalProxy',
      'Ext.ux.hal.reader.HalReader'
   ],

   proxy: {
      type: 'hal',
      reader: {
         type: 'hal'
      },
      writer: {
         writeAllFields: true,
         writeRecordId: false
      }
   }
});
