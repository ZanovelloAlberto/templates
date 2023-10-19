{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "res";
  version = "0.4.4";
  # nimBinOnly = true;

  src = ./.;
  buldPhase = ''
  mkdir -p $out/bin
  echo vaffa > $out/bin/res
  '';

  # meta = with pkgs.lib; {
  #   description = "Language Server Protocol implementation for Nim";
  #   homepage = "https://github.com/PMunch/nimlsp";
  #   license = licenses.mit;
  #   platforms = nim.meta.platforms;
  #   maintainers = [ maintainers.marsam ];
  # };
}