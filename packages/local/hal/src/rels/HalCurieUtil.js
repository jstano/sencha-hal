Ext.ns('URI.addon.URI');

Ext.define('Ext.ux.hal.rels.HalCurieUtil', {

   requires: [
      'URI.addon.URI'
   ],

   statics: {
      findCurie: function(curies, name) {
         if (curies) {
            return Ext.Array.findBy(curies, function(curie) {
               if (curie.name === name) {
                  return curie;
               }
            });
         }

         return null;
      },

      expandRel: function(curies, rel) {
         var idx = rel.indexOf(':');
         if (idx < 0) {
            return rel;
         }

         var curie = this.findCurie(curies, rel.substring(0, idx));
         if (!curie) {
            return rel;
         }

         if (!curie.templated) {
            return curie.href;
         }

         var tag = rel.substring(idx + 1);

         return URI.expand(curie.href, {rel: tag}).toString()
      }
   }
});
