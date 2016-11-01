Ext.define('Banking.view.main.Main', {
   extend: 'Ext.navigation.View',
   xtype: 'app-main',

   requires: [
      'Banking.view.main.MainController',
      'Banking.view.main.MainModel',
      'Banking.view.accountlist.AccountList'
   ],

   controller: 'main',
   viewModel: 'main',

   items: [
      {
         xtype: 'accountlist',
         reference: 'accountList'
      }
   ]
});
