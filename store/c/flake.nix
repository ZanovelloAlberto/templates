{
  description = "An over-engineered Hello World in C";

  # Nixpkgs / NixOS version to use.

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:



    # A Nixpkgs overlay.
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        der =
          pkgs.stdenv.mkDerivation {
            name = "ok";
            buildInputs = with pkgs;[
              clang-tools
              clang
            ];
          };
      in
      {
        packages = rec {
          hello = pkgs.hello;
          default = hello;
        };
        devShells.default = der;
      }
    );
}
