Ext.define('Banking.view.accounttransactions.AccountTransactionsModel', {
   extend: 'Ext.app.ViewModel',
   alias: 'viewmodel.accounttransactions',

   data: {
      account: {},
      transactionsStore: {}
   },

   formulas: {
      canDeposit: function(get) {
         return get('account').hasLink('banking:deposit');
      },

      canWithdraw: function(get) {
         return get('account').hasLink('banking:withdraw');
      },

      canTransfer: function(get) {
         return get('account').hasLink('banking:transfer');
      }
   }
});
