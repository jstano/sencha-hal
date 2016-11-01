Ext.syncRequire(['Ext.ux.hal.reader.HalReader', 'Ext.ux.hal.schema.HalSchema', 'Ext.ux.hal.proxy.HalProxy']);

describe('HalReader.convertModel', function () {
   it("should not add _links or _embedded if the passed in object is not a model", function () {
      var record = {};
      Ext.ux.hal.reader.HalReader.convertModel(record);

      expect(record._links).toBeUndefined();
      expect(record._embedded).toBeUndefined();
   });

   it("should not add _links or _embedded if the passed in object is a model but does not have a data object in it", function () {
      var record = {isModel: true};
      Ext.ux.hal.reader.HalReader.convertModel(record);

      expect(record._links).toBeUndefined();
      expect(record._embedded).toBeUndefined();
   });

   it("should not add _links or _embedded if the passed in object is a model but the data object has no _links in it", function () {
      var record = {isModel: true, data: {}};
      Ext.ux.hal.reader.HalReader.convertModel(record);

      expect(record._links).toBeUndefined();
      expect(record._embedded).toBeUndefined();
   });

   it("should add _links and _embedded if the passed in object is a model and has _links and _embedded in the data object", function () {
      var record = {
         isModel: true,
         data: {
            _links: {
               'curies': [
                  {
                     "href": "http://rels.test.com/test/{rel}",
                     "name": "test",
                     "templated": true
                  }
               ],
               'self': {
                  href: 'http://localhost:8080/self'
               },
               'test:a': {
                  href: 'http://localhost:8080/test/a'
               },
               'test:b': {
                  href: 'http://localhost:8080/test/b'
               }
            },
            _embedded: {
               'test:a': {
                  name: 'a'
               },
               'test:b': {
                  name: 'b'
               }
            }
         }
      };
      Ext.ux.hal.reader.HalReader.convertModel(record);

      expect(record._links['self'].href).toBe('http://localhost:8080/self');
      expect(record.id).toBe('http://localhost:8080/self');
      expect(record.phantom).toBe(false);
      expect(record._links['http://rels.test.com/test/a'].href).toBe('http://localhost:8080/test/a');
      expect(record._links['http://rels.test.com/test/b'].href).toBe('http://localhost:8080/test/b');
      expect(record._embedded['http://rels.test.com/test/a'].name).toBe('a');
      expect(record._embedded['http://rels.test.com/test/b'].name).toBe('b');
      expect(record.data._embedded).toBeUndefined();
      expect(record.data._links).toBeUndefined();
   });

   it("if the existing record has _embedded but the data does not have, then the _embedded should be deleted", function () {
      var record = {
         isModel: true,
         _embedded: {},
         data: {
            _links: {
               'curies': [
                  {
                     "href": "http://rels.test.com/test/{rel}",
                     "name": "test",
                     "templated": true
                  }
               ],
               'self': {
                  href: 'http://localhost:8080/self'
               },
               'test:a': {
                  href: 'http://localhost:8080/test/a'
               },
               'test:b': {
                  href: 'http://localhost:8080/test/b'
               }
            }
         }
      };
      Ext.ux.hal.reader.HalReader.convertModel(record);

      expect(record._embedded).toBeUndefined();
   });
});

describe('HalReader', function () {
   it("should be able to read multiple records", function () {
      var data = [
         {
            isModel: true,
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
                     href: 'http://localhost:8080/self/a'
                  },
                  'test:a': {
                     href: 'http://localhost:8080/test/a'
                  },
                  'test:b': {
                     href: 'http://localhost:8080/test/b'
                  }
               },
               _embedded: {
                  'test:a': {
                     name: 'a'
                  },
                  'test:b': {
                     name: 'b'
                  }
               }
            }
         },
         {
            isModel: true,
            data: {
               name: 'b',
               _links: {
                  'curies': [
                     {
                        "href": "http://rels.test.com/test/{rel}",
                        "name": "test",
                        "templated": true
                     }
                  ],
                  'self': {
                     href: 'http://localhost:8080/self/b'
                  },
                  'test:a': {
                     href: 'http://localhost:8080/test/a'
                  },
                  'test:b': {
                     href: 'http://localhost:8080/test/b'
                  }
               },
               _embedded: {
                  'test:a': {
                     name: 'a'
                  },
                  'test:b': {
                     name: 'b'
                  }
               }
            }
         }
      ];

      var halReader = Ext.create('Ext.ux.hal.reader.HalReader', {
         model: 'Ext.ux.hal.HalModel'
      });
      var records = halReader.readRecords(data).records;

      expect(halReader).not.toBeNull();
      expect(records[0]._links['self'].href).toBe('http://localhost:8080/self/a');
      expect(records[0].id).toBe('http://localhost:8080/self/a');
      expect(records[0].phantom).toBe(false);
      expect(records[0]._links['http://rels.test.com/test/a'].href).toBe('http://localhost:8080/test/a');
      expect(records[0]._links['http://rels.test.com/test/b'].href).toBe('http://localhost:8080/test/b');
      expect(records[0]._embedded['http://rels.test.com/test/a'].name).toBe('a');
      expect(records[0]._embedded['http://rels.test.com/test/b'].name).toBe('b');
      expect(records[0].data._embedded).toBeUndefined();
      expect(records[0].data._links).toBeUndefined();

      expect(records[1]._links['self'].href).toBe('http://localhost:8080/self/b');
      expect(records[1].id).toBe('http://localhost:8080/self/b');
      expect(records[1].phantom).toBe(false);
      expect(records[1]._links['http://rels.test.com/test/a'].href).toBe('http://localhost:8080/test/a');
      expect(records[1]._links['http://rels.test.com/test/b'].href).toBe('http://localhost:8080/test/b');
      expect(records[1]._embedded['http://rels.test.com/test/a'].name).toBe('a');
      expect(records[1]._embedded['http://rels.test.com/test/b'].name).toBe('b');
      expect(records[1].data._embedded).toBeUndefined();
      expect(records[1].data._links).toBeUndefined();
   });
});
