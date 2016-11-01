Ext.define('Banking.view.accountlist.AccountList', {
   extend: 'Ext.Panel',

   xtype: 'accountlist',

   requires: [
      'Banking.view.accountlist.AccountListModel',
      'Banking.view.accountlist.AccountListController'
   ],

   viewModel: {
      type: 'accountlist'
   },

   controller: 'accountlist',

   title: 'Accounts',

   layout: 'fit',

   bind: {
      title: '{customerName} - {bankName} Accounts'
   },

   items: [
      {
         xtype: 'grid',
         bind: {
            store: '{accountStore}'
         },
         listeners: {
            itemtap: 'accountTapped'
         },
         columns: [
            {
               text: 'Account #',
               dataIndex: 'accountNumber',
               width: 200
            },
            {
               text: 'Type',
               dataIndex: 'type'
            },
            {
               text: 'Balance',
               dataIndex: 'balance',
               xtype: 'numbercolumn',
               format: '0,000.00'
            }
         ]
      }
   ]
});
