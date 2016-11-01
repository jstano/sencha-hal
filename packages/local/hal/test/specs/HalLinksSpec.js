Ext.syncRequire(['Ext.ux.hal.HalLinks']);

describe('HalLinks tests', function() {
   it("creating a HalLinks object with a null links list should throw an exception", function() {
      var halLinksCreator = function() {
         new Ext.ux.hal.HalLinks();
      };

      expect(halLinksCreator).toThrow();
   });

   it("should be able to create a HalLinks object", function() {
      var halLinks = new Ext.ux.hal.HalLinks([{name: 'a'}, {name: 'b'}]);

      expect(halLinks).not.toBeNull();
   });

   it("should be able to get links by name and the link should have an expand method", function() {
      var halLinks = new Ext.ux.hal.HalLinks([{name: 'a'}, {name: 'b'}]);

      expect(halLinks.getLink('a')).not.toBeNull();
      expect(halLinks.getLink('a').expand).not.toBeNull();
   });

   it("should get null from getLinks if a link with the specified name isn't found", function() {
      var halLinks = new Ext.ux.hal.HalLinks([{name: 'a'}, {name: 'b'}]);

      expect(halLinks.getLink('c')).toBeNull();
   });

   it("should be able to call expand on the returned link", function() {
      var halLinks = new Ext.ux.hal.HalLinks([{name: 'a', href: 'http://localhost:8080/{id}/{name}'}]);

      expect(halLinks.getLink('a').expand({id: 1, name: 'abc'})).toBe('http://localhost:8080/1/abc');
   });
});
