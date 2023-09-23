{
  description = "A collection of flake templates";
  inputs = {
    temps.url = "github:Nixos/templates";
    nommer.url = "github:ZanovelloAlberto/nommer";
  };

  outputs = { self, temps, nommer}: {

    templates = {
      sc = temps.templates.simpleContainer;
      # simpleContainer = {
      #   path = "github:Nixos/templateys/simple-container";
      #   description = "A NixOS container running apache-httpd";
      # };
      # nommer = nommer.templates.default;
      c = {
        path = ./c;
        description = "lll";
      };
    };

    defaultTemplate = self.templates.trivial;

  };
}
