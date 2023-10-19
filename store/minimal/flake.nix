{
  description = "ok base bro";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:

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
          default = der;
        };
        devShells.default = der;
      }
    );
}
