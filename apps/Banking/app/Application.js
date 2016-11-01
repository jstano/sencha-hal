Ext.define('Banking.Application', {
   extend: 'Ext.app.Application',

   name: 'Banking',

   requires: [
      'Ext.ux.hal.rels.HalCurieRegister'
   ],

   stores: [
   ],

   launch: function () {
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('banking', 'http://rels.test.com/banking/{rel}');
   },

   onAppUpdate: function () {
      Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
         function (choice) {
            if (choice === 'yes') {
               window.location.reload();
            }
         }
      );
   }
});
