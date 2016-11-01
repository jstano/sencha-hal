Ext.syncRequire(['Ext.ux.hal.HalLinkModel']);

describe('HalLinkModel tests', function() {
   it("should be able to create a HalLinkModel object and set the properties", function() {
      var halLinkModel = new Ext.ux.hal.HalLinkModel();
      halLinkModel.set('name', 'NAME');
      halLinkModel.set('title', 'TITLE');
      halLinkModel.set('href', 'http://localhost:8080/{id}/{name}');
      halLinkModel.set('hreflang', 'HREFLANG');
      halLinkModel.set('profile', 'PROFILE');
      halLinkModel.set('type', 'TYPE');
      halLinkModel.set('deprecation', 'DEPRECATION');
      halLinkModel.set('templated', true);

      expect(halLinkModel.get('name')).toBe('NAME');
      expect(halLinkModel.get('title')).toBe('TITLE');
      expect(halLinkModel.get('href')).toBe('http://localhost:8080/{id}/{name}');
      expect(halLinkModel.get('hreflang')).toBe('HREFLANG');
      expect(halLinkModel.get('profile')).toBe('PROFILE');
      expect(halLinkModel.get('type')).toBe('TYPE');
      expect(halLinkModel.get('deprecation')).toBe('DEPRECATION');
      expect(halLinkModel.get('templated')).toBe(true);
   });

   it("should be able to call expand on the link", function() {
      var halLinkModel = new Ext.ux.hal.HalLinkModel();
      halLinkModel.set('href', 'http://localhost:8080/{id}/{name}');

      expect(halLinkModel.expand({id: 1, name: 'abc'})).toBe('http://localhost:8080/1/abc');
   });
});
