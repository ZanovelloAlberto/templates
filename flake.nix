{
  description = "A collection of flake templates";
  inputs = {
    temps.url = "github:Nixos/templates";
    nommer.url = "github:ZanovelloAlberto/nommer";
  };

  outputs = { self, temps, nommer, nixpkgs }: {

    templates =
      let

        filterDir = name: value: value == "directory";
        due = nixpkgs.lib.filterAttrs filterDir (builtins.readDir ./store);

        toFormat = name: value:
          let
            base = "${self}/store/${name}";
          in
          {
            path = builtins.toPath base;
            description = ""; #builtins.readFile builtins.toPath (base + "/descripton");
          };
        final = builtins.mapAttrs toFormat due;
      in
      final //
      {
        sc = temps.templates.simpleContainer;
        nommer = {
          path = nommer.outPath;
          description = "";
        };

        sokol = {
          c = { path = ./sokol/clang; };
          rust = { path = ./sokol/rust; };
          nim = { path = ./sokol/nim; };
          path = ./sokol;
        };

      };

    # defaultTemplate = self.templates.sc;

  };
}
