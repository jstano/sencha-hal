Ext.define('Banking.view.accounttransactions.AccountTransactionsController', {
   extend: 'Ext.app.ViewController',
   alias: 'controller.accounttransactions',

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
