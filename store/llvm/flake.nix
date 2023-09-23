{
  description = "An over-engineered Hello World in C";

  # Nixpkgs / NixOS version to use.
  inputs =
    {

      nixpkgs.url = "nixpkgs/nixos-21.05";
    };

  outputs = { self, nixpkgs }:
    let


      # System types to support.
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      # Nixpkgs instantiated for supported system types.
      # nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; overlays = [ self.overlay ]; });

    in

    {

      # A Nixpkgs overlay.
      # overlay = final: prev: {

      #   hello = with final; clangStdenv.mkDerivation rec {
      #     pname = "hello";
      #     inherit version;

      #     src = ./.;

      #     nativeBuildInputs = [ ];
      #   };

      # };

      # Provide some binary packages for selected system types.
      packages = forAllSystems
        (system:
          let

            pkgs = import nixpkgs { inherit system; };
          in
          {
            default = pkgs.clangStdenv.mkDerivation {

              name = "ciao";

            };
            # inherit (nixpkgsFor.${system}) hello;
          });

      # The default package for 'nix build'. This makes sense if the
      # flake provides only one package or there is a clear "main"
      # package.

      # A NixOS module, if applicable (e.g. if the package provides a system service).


    };
}
