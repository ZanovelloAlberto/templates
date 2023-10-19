{
  description = "";

  inputs =
    {

      nixpkgs.url = "nixpkgs/nixos-23.05";
    };

  outputs = { self, nixpkgs }:
    let


      # System types to support.
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];

      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

    in

    {



      # Provide some binary packages for selected system types.
      packages = forAllSystems
        (system:
          let

            pkgs = import nixpkgs { inherit system; };
          in
          {
            default = pkgs.clangStdenv.mkDerivation {

              name = "ciao";
              inputs = with pkgs;[ clang ];
              src = ./.;
              buildPhase = ''

                mkdir -p $out/bin
                clang  src/main.ll -o $out/bin/ciao
              '';

            };

            # = pkgs.clangStdenv.mkDerivation {

            #   name = "ciao";
            #   inputs = with pkgs;[ clang ];
            #   src = ./.;
            #   buildPhase = ''

            #     mkdir -p $out/bin
            #     clang  src/main.ll -o $out/bin/ciao
              # '';

            # };
          });

      # The default package for 'nix build'. This makes sense if the
      # flake provides only one package or there is a clear "main"
      # package.

      # A NixOS module, if applicable (e.g. if the package provides a system service).


    };
}
