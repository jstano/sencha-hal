Ext.Loader.setConfig({
   enabled: true,
   paths: {
      'Ext.ux.hal': '../src',
      'URI.addon.URI': '../lib/URI.js',
      'Ext.ux': '../../../../ext/packages/ux/src'
   }
});

Ext.syncRequire([
   'URI.addon.URI'
]);
