# {
#   description = "An example project using flutter";

#   inputs = {
#     flake-utils.url = "github:numtide/flake-utils";
#     nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
#   };

#   outputs = { self, nixpkgs, flake-utils, ... }:
#     flake-utils.lib.eachDefaultSystem (system:
#       let
#         pkgs = import nixpkgs {
#           inherit system;
#         };
#         name = "fluttem";
#         r = pkgs.stdenv.mkDerivation {
#           name = "loll";

#           buildInputs = with pkgs;[
#             xorg.libXi
#             xorg.libXcursor
#             xorg.libX11.dev
#             xorg.libXft
#             xorg.libXrandr
#             xorg.libXinerama
#             alsa-lib
#             libGL
#             hello
#             cargo
#           ];
#         };
#       in
#       rec {
#         packages.default = r;
#         mkShell.default = r;
#       });
# }
{
  description = "Foo Bar";
  inputs = {
    # nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };
  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      pkgsFor = nixpkgs.legacyPackages;
    in
    {
      packages = forAllSystems (system: {
        default = pkgsFor.${system}.callPackage ./. { };
      });

      devShells = forAllSystems
        (system: {
          default = pkgsFor.${system}.callPackage ./shell.nix { };
        });
    };
}   

