{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "iso";
  version = "0.1.1";
  inputs = with pkgs;[
    gnumake
    xorriso
    # qemu
  ];
  src = ./.;
  buldPhase = ''
    make barebones.iso
  '';

  installPhase = ''
    mv barebones.iso $out
  '';

}
