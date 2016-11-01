Ext.define('Banking.view.accountlist.AccountListController', {
   extend: 'Ext.app.ViewController',
   alias: 'controller.accountlist',

   requires: [
      'Banking.model.Transaction'
   ],

   init: function() {
   },

   accountTapped: function(grid, rowIndex, row, event) {
      var account = row.getRecord();

      var view = grid.getParent().getParent().push({
         xtype: 'accounttransactions',
         title: 'Transactions',
         viewModel: {
            data: {
               account: account
            }
         }
      });

      account.loadLink(Banking.model.Transaction, 'banking:transactions', {
         success: function(transactionsModel) {
            var transactionsStore = transactionsModel.getEmbeddedAsStore(Banking.model.Transaction, 'banking:transactions');
            view.getViewModel().set('transactionsStore', transactionsStore);
         },
         failure: function() {
            alert('Error loading transactions for account ' + account.get('accountNumber'));
         }
      });
   }
});
