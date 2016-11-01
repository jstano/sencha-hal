Ext.syncRequire(['Ext.ux.hal.rels.HalCurieRegister']);

describe('HalCurieRegister tests', function () {
   beforeEach(function() {
      Ext.ux.hal.rels.HalCurieRegister.curies = [];
   });

   it("should be able to register a curie and get it out", function () {
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://localhost:8080/test');

      var registeredCurie = Ext.ux.hal.rels.HalCurieRegister.getRegisteredCurie('test');

      expect(registeredCurie.name).toBe('test');
      expect(registeredCurie.href).toBe('http://localhost:8080/test');
      expect(registeredCurie.templated).toBe(true);
   });

   it("attempting to register a curie a second time with a different href should throw an exception", function () {
      Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://localhost:8080/test');

      var registerCurie = function() {
         Ext.ux.hal.rels.HalCurieRegister.registerCurie('test', 'http://localhost:8080/test2');
      };

      expect(registerCurie).toThrow();
   });

   it("should be able to register multiple curies", function () {
      Ext.ux.hal.rels.HalCurieRegister.registerCuries({'test': 'http://localhost:8080/test'});

      var registeredCurie = Ext.ux.hal.rels.HalCurieRegister.getRegisteredCurie('test');

      expect(registeredCurie.name).toBe('test');
      expect(registeredCurie.href).toBe('http://localhost:8080/test');
      expect(registeredCurie.templated).toBe(true);
   });
});
