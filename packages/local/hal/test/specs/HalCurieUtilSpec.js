Ext.syncRequire(['Ext.ux.hal.rels.HalCurieUtil']);

describe('HalCurieUtil.findCurie', function () {
   it("should return null if the curies list is null", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.findCurie(null, 'test')).toBeNull();
   });

   it("should return null if a curie with the specified name is not found", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.findCurie([{name: 'a'}, {name: 'b'}], 'test')).toBeNull();
   });

   it("should return the correct curie if a curie with the specified name is found", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.findCurie([{name: 'a'}, {name: 'b'}], 'a').name).toBe('a');
   });
});

describe('HalCurieUtil.expandRel', function () {
   var curies = [
      {name: 'a', href: 'http://rels.test.com/a'},
      {name: 'b', href: 'http://rels.test.com/b/{rel}', templated: true}
   ];

   it("should return the prop if it does not contain a colon", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.expandRel(curies, 'a')).toBe('a');
   });

   it("should return the prop if it has a colon in the string", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.expandRel(curies, 'test:a')).toBe('test:a');
   });

   it("should return the href if the curie is found", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.expandRel(curies, 'a:test')).toBe('http://rels.test.com/a');
   });

   it("should return the href if the curie is found", function () {
      expect(Ext.ux.hal.rels.HalCurieUtil.expandRel(curies, 'b:test')).toBe('http://rels.test.com/b/test');
   });
});
