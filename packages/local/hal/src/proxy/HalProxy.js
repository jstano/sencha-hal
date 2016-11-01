Ext.define('Ext.ux.hal.proxy.HalProxy', {
   extend: 'Ext.data.proxy.Rest',

   alias: 'proxy.hal',

   requires: [
      'Ext.ux.hal.reader.HalReader'
   ],

   config: {
      appendId: false,

      format: null,

      batchActions: false,

      actionMethods: {
         create: 'POST',
         read: 'GET',
         update: 'PUT',
         destroy: 'DELETE'
      },

      noCache: true,
      pageParam: '',
      startParam: '',
      limitParam: '',
      sortParam: '',
      filterParam: '',
      groupParam: '',
      withCredentials: true,
      useDefaultXhrHeader: false,
      reader: {
         type: 'hal'
      },
      headers: {
         'Content-Type': 'application/hal+json',
         'Accept': 'application/hal+json'
      }
   }
});