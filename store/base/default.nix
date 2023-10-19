{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  inputs = [ ];
  src = ./.;
  buildPhase = ''
  '';
}
