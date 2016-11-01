Ext.define('Ext.ux.hal.schema.HalSchema', {
   extend: 'Ext.data.schema.Schema',

   alias: 'schema.hal',

   proxy: {
      type: 'hal',
      url: '/undefined',
      reader: {
         type: 'hal'
      },
      writer: {
         writeAllFields: true,
         writeRecordId: false
      }
   }
});
