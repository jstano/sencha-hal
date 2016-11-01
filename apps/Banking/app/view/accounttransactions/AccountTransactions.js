Ext.define('Banking.view.accounttransactions.AccountTransactions', {
   extend: 'Ext.Container',

   requires: [
      'Banking.view.accounttransactions.AccountTransactionsModel',
      'Banking.view.accounttransactions.AccountTransactionsController'
   ],

   xtype: 'accounttransactions',

   viewModel: {
      type: 'accounttransactions'
   },

   controller: 'accounttransactions',

   layout: 'fit',

   items: [
      {
         xtype: 'toolbar',
         docked: 'top',
         items: [
            {
               xtype: 'component',
               bind: {
                  html: 'Account #: {account.accountNumber} - {account.type} ({account.balance:number("0,000.00")})'
               }
            }
         ]
      },
      {
         xtype: 'toolbar',
         docked: 'top',
         items: [
            {
               xtype: 'button',
               text: 'Deposit',
               reference: 'depositButton',
               bind: {
                  hidden: '{!canDeposit}'
               },
               listeners: {
                  tap: 'depositTapped'
               }
            },
            {
               xtype: 'button',
               text: 'Withdraw',
               reference: 'withdrawButton',
               bind: {
                  hidden: '{!canWithdraw}'
               },
               listeners: {
                  tap: 'withdrawTapped'
               }
            },
            {
               xtype: 'button',
               text: 'Transfer',
               reference: 'transferButton',
               bind: {
                  hidden: '{!canTransfer}'
               },
               listeners: {
                  tap: 'transferTapped'
               }
            }
         ]
      },
      {
         xtype: 'grid',
         bind: {
            store: '{transactionsStore}',
            title: '{account.accountNumber} - {account.type} - {account.balance}'
         },
         columns: [
            {
               text: 'Date',
               dataIndex: 'date',
               xtype: 'datecolumn',
               format: 'm/d/y'
            },
            {
               text: 'Description',
               dataIndex: 'description',
               width: 350
            },
            {
               text: 'Type',
               dataIndex: 'type'
            },
            {
               text: 'Amount',
               dataIndex: 'amount',
               xtype: 'numbercolumn',
               format: '0,000.00',
               align: 'right'
            }
         ]
      }
   ]
});
