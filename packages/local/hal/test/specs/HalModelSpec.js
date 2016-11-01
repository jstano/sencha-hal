Ext.syncRequire(['Ext.ux.hal.HalModel',
                 'Ext.ux.hal.reader.HalReader',
                 'Ext.ux.hal.schema.HalSchema',
                 'Ext.ux.hal.proxy.HalProxy',
                 'Ext.ux.ajax.SimManager']);

Ext.ux.ajax.SimManager.register(
   {
      '/test-load': {
         stype: 'json',
         data: {
            name: 'a',
            _links: {
               'curies': [
                  {
                     "href": "http://rels.test.com/test/{rel}",
                     "name": "test",
                     "templated": true
                  }
               ],
               'self': {
                  href: '/test-load'
               }
            }
         }
      }
   }
);

Ext.define('TestModel', {
   extend: 'Ext.ux.hal.HalModel',
   fields: [
      {name: 'name', type: 'string'}
   ]
});

describe('HalModel.load', function() {
   var halModel = Ext.create('TestModel');

   beforeEach(function(done) {
      halModel.load({
         url: '/test-load',
         success: function() {
            done();
         }
      });
   });

   it("should load the data", function(done) {
      expect(halModel._links['self'].href).toBe('/test-load');
      expect(halModel.get('name')).toBe('a');
      expect(halModel.getId()).toBe('/test-load');
      expect(halModel.getProxy().url).toBe('/test-load');
      expect(halModel.phantom).toBe(false);
      expect(halModel.data._embedded).toBeUndefined();
      expect(halModel.data._links).toBeUndefined();
      done();
   });
});

describe('static HalModel.load', function() {
   var halModel = null;

   beforeEach(function(done) {
      TestModel.load('/test-load', {
         success: function(model) {
            halModel = model;
            done();
         }
      });
   });

   it("should load the data", function(done) {
      expect(halModel._links['self'].href).toBe('/test-load');
      expect(halModel.get('name')).toBe('a');
      expect(halModel.getId()).toBe('/test-load');
      expect(halModel.getProxy().url).toBe('/test-load');
      expect(halModel.phantom).toBe(false);
      expect(halModel.data._embedded).toBeUndefined();
      expect(halModel.data._links).toBeUndefined();
      done();
   });
});

describe('HalModel.getLink', function() {
   beforeEach(function() {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('curried', 'http://rels.test.com/curried/{rel}');
   });

   it("should return the correct link given a rel", function() {
      var halModel = Ext.create('TestModel');
      halModel._links = {
         'self': {
            href: 'http://localhost:8080/self'
         },
         'test': {
            href: 'http://localhost:8080/test'
         },
         'http://rels.test.com/curried/test': {
            href: 'http://localhost:8080/curried-test'
         },
         'curies': [
            {
               'name': 'curried',
               'href': 'http://rels.test.com/curried/{rel}',
               'templated': true
            }
         ]
      };

      expect(halModel.getLink('test').href).toBe('http://localhost:8080/test');
      expect(halModel.getLink('test').expand).not.toBeNull();

      expect(halModel.getLink('curried:test').href).toBe('http://localhost:8080/curried-test');
      expect(halModel.getLink('curried:test').expand).not.toBeNull();
   });

   it("should return null if the rel is not found", function() {
      var halModel = Ext.create('TestModel');
      halModel._links = {
         'self': {
            href: 'http://localhost:8080/self'
         },
         'test': {
            href: 'http://localhost:8080/test'
         }
      };

      expect(halModel.getLink('invalid')).toBeNull();
   });

   it("should return null if there are no links", function() {
      var halModel = Ext.create('TestModel');

      expect(halModel.getLink('test')).toBeNull();
   });
});

describe('HalModel.hasLink', function() {
   beforeEach(function() {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('curried', 'http://rels.test.com/curried/{rel}');
   });

   var halModel = Ext.create('TestModel');
   halModel._links = {
      'self': {
         href: 'http://localhost:8080/self'
      },
      'test': {
         href: 'http://localhost:8080/test'
      },
      'http://rels.test.com/curried/test': {
         href: 'http://localhost:8080/curried-test'
      },
      'curies': [
         {
            'name': 'curried',
            'href': 'http://rels.test.com/curried/{rel}',
            'templated': true
         }
      ]
   };

   it("should return true if the rel is found", function() {
      expect(halModel.hasLink('test')).toBe(true);

      expect(halModel.hasLink('curried:test')).toBe(true);
   });

   it("should return false if the rel is not found", function() {
      expect(halModel.hasLink('invalid')).toBe(false);
   });

   it("should return false if there are no links", function() {
      var halModel = Ext.create('TestModel');

      expect(halModel.hasLink('test')).toBe(false);
   });
});

describe('HalModel.loadSelfLink', function() {
   var halModel = Ext.create('TestModel');
   halModel._links = {
      'self': {
         href: '/test-load'
      },
      'curies': [
         {
            'name': 'curried',
            'href': 'http://rels.test.com/curried/{rel}',
            'templated': true
         }
      ]
   };

   var newSelfModel = null;

   beforeEach(function(done) {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://rels/test');

      halModel.loadSelfLink({
         url: '/test-load',
         success: function(model) {
            newSelfModel = model;
            done();
         }
      });
   });

   it("should return null if there is no self link", function(done) {
      expect(newSelfModel).not.toBe(halModel);
      expect(newSelfModel._links['self'].href).toBe('/test-load');
      expect(newSelfModel.get('name')).toBe('a');
      expect(newSelfModel.getId()).toBe('/test-load');
      expect(newSelfModel.getProxy().url).toBe('/test-load');
      expect(newSelfModel.phantom).toBe(false);
      expect(newSelfModel.data._embedded).toBeUndefined();
      expect(newSelfModel.data._links).toBeUndefined();

      done();
   });
});

describe('HalModel.getLinks', function() {
   beforeEach(function() {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://rels/test');
   });

   var halModel = Ext.create('TestModel');
   halModel._links = {
      'self': {
         href: 'http://localhost:8080/self'
      },
      'test': {
         href: 'http://localhost:8080/test'
      },
      'array': [
         {
            name: 'a',
            href: 'http://localhost:8080/test/a'
         },
         {
            name: 'b',
            href: 'http://localhost:8080/test/b'
         }
      ]
   };

   it("should return an empty HalLinks if the rel is not found", function() {
      expect(halModel.getLinks('invalid').links.length).toBe(0);
   });

   it("should return a HalLinks model with the single link for the test rel", function() {
      var links = halModel.getLinks('test').links;
      expect(links.length).toBe(1);
      expect(links[0].href).toBe('http://localhost:8080/test');
   });

   it("should return a HalLinks model with the 2 links for the array rel", function() {
      var halLinks = halModel.getLinks('array');
      expect(halLinks.links.length).toBe(2);
      expect(halLinks.getLink('a').href).toBe('http://localhost:8080/test/a');
      expect(halLinks.getLink('b').href).toBe('http://localhost:8080/test/b');
   });
});

describe('HalModel.getLinksAsStore', function() {
   beforeEach(function() {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://rels/test');
   });

   var halModel = Ext.create('TestModel');
   halModel._links = {
      'self': {
         href: 'http://localhost:8080/self'
      },
      'test': {
         href: 'http://localhost:8080/test'
      },
      'array': [
         {
            name: 'a',
            href: 'http://localhost:8080/test/a'
         },
         {
            name: 'b',
            href: 'http://localhost:8080/test/b'
         }
      ]
   };

   it("should return an empty store if the rel is not found", function() {
      expect(halModel.getLinksAsStore('invalid').getTotalCount()).toBe(0);
   });

   it("should return a HalLinks model with the single link for the test rel", function() {
      var linksStore = halModel.getLinksAsStore('test');
      expect(linksStore.getTotalCount()).toBe(1);
      expect(linksStore.getAt(0).get('href')).toBe('http://localhost:8080/test');
   });

   it("should return a HalLinks model with the 2 links for the array rel", function() {
      var linksStore = halModel.getLinksAsStore('array');
      expect(linksStore.getTotalCount()).toBe(2);
      expect(linksStore.getAt(0).get('href')).toBe('http://localhost:8080/test/a');
      expect(linksStore.getAt(1).get('href')).toBe('http://localhost:8080/test/b');
   });
});

describe('HalModel.getEmbeddedAsStore', function() {
   beforeEach(function() {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://rels/test');
   });

   it("should return a HalStore with the proxy set to memory and the data containing the actual data", function() {
      var halModel = Ext.create('TestModel');
      halModel._links = {
         'self': {
            href: 'http://localhost:8080/self'
         }
      };
      halModel._embedded = {
         'test': [
            {
               name: 'A'
            },
            {
               name: 'B'
            },
            {
               name: 'C'
            }
         ]
      };

      var embeddedStore = halModel.getEmbeddedAsStore(TestModel, 'test');

      expect(embeddedStore.proxy.type).toBe('memory');
      expect(embeddedStore.proxy.reader.type).toBe('hal');
      expect(embeddedStore.proxy.writer).toBeTruthy();
      expect(embeddedStore.proxy.writer._writeAllFields).toBe(true);
      expect(embeddedStore.proxy.writer._writeRecordId).toBe(false);
      expect(embeddedStore.load).toBeTruthy();
      expect(embeddedStore.data.length).toBe(3);
      expect(embeddedStore.getData().getAt(0).get('name')).toBe('A');
      expect(embeddedStore.getData().getAt(1).get('name')).toBe('B');
      expect(embeddedStore.getData().getAt(2).get('name')).toBe('C');
   });

   it("if the embedded data is not an array should return a HalStore with the proxy set to memory and the data containing the data converted to an array", function() {
      var halModel = Ext.create('TestModel');
      halModel._links = {
         'self': {
            href: 'http://localhost:8080/self'
         }
      };
      halModel._embedded = {
         'test': {
            name: 'A'
         }
      };

      var embeddedStore = halModel.getEmbeddedAsStore(TestModel, 'test');

      expect(embeddedStore.proxy.type).toBe('memory');
      expect(embeddedStore.proxy.reader.type).toBe('hal');
      expect(embeddedStore.proxy.writer).toBeTruthy();
      expect(embeddedStore.proxy.writer._writeAllFields).toBe(true);
      expect(embeddedStore.proxy.writer._writeRecordId).toBe(false);
      expect(embeddedStore.load).toBeTruthy();
      expect(embeddedStore.data.length).toBe(1);
      expect(embeddedStore.getData().getAt(0).get('name')).toBe('A');
   });
});
