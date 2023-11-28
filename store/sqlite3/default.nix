let
  unstable = import (fetchTarball https://nixos.org/channels/nixos-unstable/nixexprs.tar.xz) { };
in
{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ sqlite ];
  src = ./.;
  buildPhase = ''
  '';
}
