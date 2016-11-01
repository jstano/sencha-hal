Ext.define('Ext.ux.hal.reader.HalReader', {
   extend: 'Ext.data.reader.Json',

   alias: 'reader.hal',

   requires: [
      'Ext.ux.hal.rels.HalCurieUtil'
   ],

   readRecords: function(data, readOptions) {
      var resultSet = this.callParent(arguments);
      var records = resultSet.getRecords();

      if (records) {
         Ext.each(records, function(record) {
            Ext.ux.hal.reader.HalReader.convertModel(record);
         });
      }

      return resultSet
   },

   statics: {
      convertModel: function(record) {
         if (!record.isModel || !record.data || !record.data._links) {
            return;
         }

         record._links = {};

         var curies;
         if (record.data._links['curies']) {
            curies = record.data._links['curies'];
         }

         var expandedRel;
         for (var rel in record.data._links) {
            if (rel === 'curies') {
               continue;
            }

            expandedRel = Ext.ux.hal.rels.HalCurieUtil.expandRel(curies, rel);
            record._links[expandedRel] = record.data._links[rel];
         }

         var selfLink = record._links['self'];
         if (selfLink) {
            record.id = selfLink.href;
            record.phantom = false;
         }

         delete record.data._links;

         if (record.data._embedded) {
            record._embedded = {};

            for (var prop in record.data._embedded) {
               expandedRel = Ext.ux.hal.rels.HalCurieUtil.expandRel(curies, prop);
               record._embedded[expandedRel] = record.data._embedded[prop];
            }

            delete record.data._embedded;
         }
         else if (record._embedded) {
            delete record._embedded;
         }
      }
   }
});
