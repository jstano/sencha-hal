Ext.ns('URI.addon.URI');

Ext.define('Ext.ux.hal.HalModel', {
   extend: 'Ext.data.Model',

   requires: [
      'Ext.ux.hal.reader.HalReader',
      'Ext.ux.hal.schema.HalSchema',
      'Ext.ux.hal.rels.HalCurieRegister',
      'Ext.ux.hal.HalLinks',
      'Ext.ux.hal.HalLinkModel',
      'Ext.ux.hal.HalStore'
   ],

   schema: 'hal',

   constructor: function() {
      this.callParent(arguments);

      this.phantom = true;
   },

   /**
    * Gets a link for the specified rel.
    * @param {String} [rel] The rel to find a link for.
    * @return {Object} The link object or null if no link for the specified rel could be located.
    */
   getLink: function(rel) {
      var link = this._links ? this._links[Ext.ux.hal.rels.HalCurieRegister.deserialize(rel)] : null;

      if (link && !Ext.isArray(link)) {
         link.expand = function(templateParams) {
            return URI.expand(this.href, templateParams).toString();
         };
      }

      if (link) {
         return link;
      }

      return null;
   },

   /**
    * Checks if a link for the specified rel exists.
    * @param {String} [rel] The rel to find a link for.
    * @return {Boolean} True if a link for the specified rel could be located; false otherwise.
    */
   hasLink: function(rel) {
      return this.getLink(rel) ? true : false;
   },

   /**
    * Loads a new model instance for the link specified by the rel. If no link for
    * the specified rel could be found, then nothing will be loaded. The load action
    * is asynchronous. Any processing of the loaded record should be done in a callback.
    *
    * The options param is an {@link Ext.data.operation.Read} config object containing
    * success, failure and callback functions, plus optional scope.
    *
    * @param {Object} [modelType] The class instance of the HalModel.
    * @param {String} [rel] The rel to be loaded.
    * @param {Object} [options] Options to pass to the proxy.
    * @param {Function} options.success A function to be called when the
    * model is processed by the proxy successfully.
    * The callback is passed the following parameters:
    * @param {Ext.data.Model} options.success.record The record.
    * @param {Ext.data.operation.Operation} options.success.operation The operation.
    *
    * @param {Function} options.failure A function to be called when the
    * model is unable to be processed by the server.
    * The callback is passed the following parameters:
    * @param {Ext.data.Model} options.failure.record The record.
    * @param {Ext.data.operation.Operation} options.failure.operation The operation.
    *
    * @param {Function} options.callback A function to be called whether the proxy
    * transaction was successful or not.
    * The callback is passed the following parameters:
    * @param {Ext.data.Model} options.callback.record The record.
    * @param {Ext.data.operation.Operation} options.callback.operation The operation.
    * @param {Boolean} options.callback.success `true` if the operation was successful.
    *
    * @param {Object} options.scope The scope in which to execute the callback
    * functions.  Defaults to the model instance.
    *
    * @return {Ext.data.operation.Read} The read operation.
    */
   loadLink: function(modelType, rel, options) {
      var link = this.getLink(rel);

      return link ? modelType.load(link.href, options ? options : {}, null) : null;
   },

   /**
    * Loads a new model instance for the self link of the model. If the model has no self link,
    * then nothing will be loaded. The load action is asynchronous. Any processing of the
    * loaded record should be done in a callback.
    *
    * The options param is an {@link Ext.data.operation.Read} config object containing
    * success, failure and callback functions, plus optional scope.
    *
    * @param {Object} [modelType] The class instance of the HalModel.
    */
   loadSelfLink: function(options) {
      var link = this.getLink('self');
      if (!link) {
         return null;
      }

      return Ext.getClass(this).load(link.href, options, null);
   },

   /**
    * Get the links from the HAL model as a Store.
    *
    * @param {String} [rel] The rel whose links are to be retrieved.
    *
    * @return {HalLiunks} A HalLinks object containing the links.
    */
   getLinks: function(rel) {
      var links = this.getLink(rel);

      if (!links) {
         links = [];
      }
      else if (!Ext.isArray(links)) {
         links = [links];
      }

      return Ext.create("Ext.ux.hal.HalLinks", links);
   },

   /**
    * Get the links from the HAL model as a Store.
    *
    * @param {String} [rel] The rel whose links are to be retrieved.
    *
    * @return {Store} The store containing the link objects.
    */
   getLinksAsStore: function(rel) {
      var links = this.getLink(rel);

      if (!links) {
         links = [];
      }
      else if (!Ext.isArray(links)) {
         links = [links];
      }

      return Ext.create('Ext.data.Store', {
         model: 'Ext.ux.hal.HalLinkModel',
         data: links,
         proxy: {
            type: 'memory'
         },
         writer: {
            writeAllFields: true,
            writeRecordId: false
         }
      });
   },

   /**
    * Get embedded data from the HalModel as an Array of HalModel objects
    *
    * @param {Object} [ModelType] The class instance of the HalModel.
    * @param {String} [rel] The rel whose links are to be retrieved.
    *
    * @return {Array} The array containing the embedded HalModel objects.
    */
   getEmbeddedAsArray: function(ModelType, rel) {
      if (!this._embedded) {
         return [];
      }

      var embeddedArray = this._embedded[Ext.ux.hal.rels.HalCurieRegister.deserialize(rel)];
      if (!embeddedArray) {
         return [];
      }

      if (!Ext.isArray(embeddedArray)) {
         embeddedArray = [embeddedArray];
      }

      var result = [];
      var rawData;
      var model;

      for (var i = 0; i < embeddedArray.length; i++) {
         rawData = embeddedArray[i];

         model = new ModelType(Ext.clone(rawData), null);

         Ext.ux.hal.reader.HalReader.convertModel(model);

         model.rawData = rawData;
         model.phantom = !(model.id && model._links && model._links['self']);

         result.push(model);
      }

      return result;
   },

   /**
    * Get embedded data from the HalModel as a Store containing HalModel objects
    *
    * @param {Object} [ModelType] The class instance of the HalModel.
    * @param {String} [rel] The rel whose links are to be retrieved.
    *
    * @return {Store} The store containing the embedded HalModel objects.
    */
   getEmbeddedAsStore: function(ModelType, rel) {
      var rawData = this._embedded ? this._embedded[Ext.ux.hal.rels.HalCurieRegister.deserialize(rel)] : [];

      if (!Ext.isArray(rawData)) {
         rawData = [rawData];
      }

      return Ext.create('Ext.ux.hal.HalStore', {
         model: ModelType,
         data: Ext.clone(rawData),
         proxy: {
            type: 'memory',
            reader: {
               type: 'hal'
            },
            writer: {
               writeAllFields: true,
               writeRecordId: false
            }
         },
         load: function(options) {
            return this.loadRawData(Ext.clone(rawData));
         }
      });
   },

   getEmbedded: function(ModelType, rel) {
      return this.getEmbeddedAt(ModelType, rel, 0, null);
   },

   getEmbeddedAt: function(ModelType, rel, index) {
      if (!this._embedded) {
         return null;
      }

      var embeddedArray = this._embedded[Ext.ux.hal.rels.HalCurieRegister.deserialize(rel)];
      if (!embeddedArray) {
         return null;
      }

      if (!Ext.isArray(embeddedArray)) {
         embeddedArray = [embeddedArray];
      }

      rawData = embeddedArray[index];

      var model = new ModelType(Ext.clone(rawData), null);

      Ext.ux.hal.reader.HalReader.convertModel(model);

      model.rawData = rawData;
      model.phantom = !(model.id && model._links && model._links['self']);

      return model;
   },

   load: function(options) {
      var headers = Ext.Object.merge({}, this.getProxy().getHeaders(), options.headers);
      this.getProxy().setHeaders(headers);

      if (options.url && this.id !== options.url) {
         this.setId(options.url);
         this.getProxy().setUrl(options.url);
      }

      return this.callParent([options]);
   },

   save: function(options) {
      options = Ext.apply({}, options, {url: this.id});

      var headers = Ext.Object.merge({}, this.getProxy().getHeaders(), options.headers);
      this.getProxy().setHeaders(headers);

      return this.callParent([options]);
   },

   set: function(fieldName, newValue, options) {
      var result = this.callParent(arguments);

      if (this.data && (this.data._links || this.data._embedded)) {
         var rawData = Ext.clone(this.data);

         Ext.ux.hal.reader.HalReader.convertModel(this);

         this.rawData = rawData;
         this.phantom = !(this.id && this._links && this._links['self']);
      }

      return result;
   },

   statics: {
      load: function(url, options) {
         var data = {};
         data[this.prototype.idProperty] = url;

         var rec = new this(data, null);
         delete rec.data[this.prototype.idProperty];

         rec.getProxy().setUrl(url);
         rec.load(options);

         return rec;
      }
   }
});
