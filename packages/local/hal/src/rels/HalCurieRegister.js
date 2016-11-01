Ext.define('Ext.ux.hal.rels.HalCurieRegister', {

   requires: [
      'Ext.ux.hal.rels.HalCurieUtil'
   ],

   singleton: true,

   curies: [],

   registerCuries: function(curies) {
      for (var name in curies) {
         if (curies.hasOwnProperty(name)) {
            this.registerCurie(name, curies[name]);
         }
      }
   },

   registerCurie: function(name, href) {
      var curie = this.getRegisteredCurie(name);
      if (curie) {
         if (curie.href !== href) {
            throw 'Attempting to re-register an existing curie with a different href'
         }
         return;
      }

      this.curies.push({
         name: name,
         href: href,
         templated: true
      });
   },

   getRegisteredCurie: function(name) {
      return Ext.ux.hal.rels.HalCurieUtil.findCurie(this.curies, name);
   },

   deserialize: function(rel) {
      return Ext.ux.hal.rels.HalCurieUtil.expandRel(this.curies, rel);
   }
});
