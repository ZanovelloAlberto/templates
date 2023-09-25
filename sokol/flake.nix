{
  description = "An example project using flutter";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
        name = "fluttem";
        r = pkgs.stdenv.mkDerivation {
          name = "loll";
          buildInputs = with pkgs;[
            xorg.libXi
            xorg.libXcursor
            xorg.libX11.dev
            xorg.libXft
            xorg.libXinerama
            alsa-lib
            libGL
            hello
          ];
        };
      in
      rec {
        packages.default = r;
        mkShell.default = r;
      });
}
    

