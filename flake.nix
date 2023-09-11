{
  description = "A collection of flake templates";
  inputs = {
    temps.url = "github:Nixos/templates";
    monomer.url = "github:ZanovelloAlberto/nommer";
  };

  outputs = { self, temps, monomer }: {

    templates = {
      sc = temps.templates.simpleContainer;
      # simpleContainer = {
      #   path = "github:Nixos/templateys/simple-container";
      #   description = "A NixOS container running apache-httpd";
      # };
      monomer = monomer.defaultTemplate;
      c = {
        path = ./c;
        description = "lll";
      };
    };

    defaultTemplate = self.templates.trivial;

  };
}
