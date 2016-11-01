Ext.ns('URI.addon.URI');

Ext.define('Ext.ux.hal.HalLinks', {

   requires: [
      'URI.addon.URI'
   ],

   links: null,

   constructor: function(links) {
      if (!links) {
         throw "Links array cannot be null";
      }

      this.links = links;
   },

   getLink: function(name) {
      return Ext.Array.findBy(this.links, function(link) {
         if (link && link.name === name) {
            link.expand = function(templateParams) {
               return URI.expand(this.href, templateParams).toString();
            };

            return link;
         }

         return null;
      });
   }
});
