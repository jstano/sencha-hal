Ext.define('Banking.view.main.MainController', {
   extend: 'Ext.app.ViewController',

   alias: 'controller.main',

   requires: [
      'Banking.model.Account',
      'Banking.model.Main'
   ],

   init: function() {
      Banking.model.Main.load('resources/banking/main.json', {
         success: function(mainModel) {
            var viewModel = this.getViewModel();
            viewModel.set('customerName', mainModel.get('customerName'));
            viewModel.set('bankName', mainModel.get('bankName'));

            var accountStore = mainModel.getEmbeddedAsStore(Banking.model.Account, 'banking:accounts');
            var accountList = this.lookupReference('accountList');
            accountList.getViewModel().set('accountStore', accountStore);
         },
         failure: function(record, operation) {
            alert('Error loading banking model');
         },
         scope: this
      });
   }
});
