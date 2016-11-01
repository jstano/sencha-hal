Ext.ns('URI.addon.URI');

Ext.define('Ext.ux.hal.HalLinkModel', {
   extend: 'Ext.data.Model',

   requires: [
      'URI.addon.URI'
   ],

   fields: [
      {name: 'name', type: 'string'},
      {name: 'title', type: 'string'},
      {name: 'href', type: 'string'},
      {name: 'hreflang', type: 'string'},
      {name: 'profile', type: 'string'},
      {name: 'type', type: 'string'},
      {name: 'deprecation', type: 'string'},
      {name: 'templated', type: 'boolean'}
   ],

   expand: function (templateParams) {
      return URI.expand(this.get('href'), templateParams).toString();
   }
});
