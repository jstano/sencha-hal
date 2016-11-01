Ext.define('Banking.view.accounttransactions.AccountTransactionsController', {
   extend: 'Ext.app.ViewController',
   alias: 'controller.accounttransactions',

   // init: function(view) {
   //    // var account = view.getViewModel().get('account');
   //    // var transactionsStore = account.loadLink(Banking.model.Transaction, 'banking:transactions', {
   //    //    success: function(transactionsModel) {
   //    //       var transactionsStore = transactionsModel.getEmbeddedAsStore(Banking.model.Transaction, 'banking:transactions');
   //    //       view.getViewModel().set('transactionsStore', transactionsStore);
   //    //    }
   //    // });
   //
   //    // var account = this.getViewModel().get('account');
   //
   //    // this.lookupReference('depositButton').setHidden(!account.hasLink('banking:deposit'));
   //    // this.lookupReference('withdrawButton').setHidden(!account.hasLink('banking:withdraw'));
   //    // this.lookupReference('transferButton').setHidden(!account.hasLink('banking:transfer'));
   // },

   // initViewModel: function(view) {
   //    var account = view.getViewModel().get('account');
   //    var transactionsStore = account.loadLink(Banking.model.Transaction, 'banking:transactions', {
   //       success: function(transactionsModel) {
   //          var transactionsStore = transactionsModel.getEmbeddedAsStore(Banking.model.Transaction, 'banking:transactions');
   //          view.getViewModel().set('transactionsStore', transactionsStore);
   //       }
   //    });
   // },

   depositTapped: function(grid, rowIndex, row, event) {
      var account = this.getViewModel().get('account');
      alert('Deposit tapped for account ' + account.get('accountNumber'));
   },

   withdrawTapped: function(grid, rowIndex, row, event) {
      var account = this.getViewModel().get('account');
      alert('Withdraw tapped for account ' + account.get('accountNumber'));
   },

   transferTapped: function(grid, rowIndex, row, event) {
      var account = this.getViewModel().get('account');
      alert('Transfer tapped for account ' + account.get('accountNumber'));
   }
});
