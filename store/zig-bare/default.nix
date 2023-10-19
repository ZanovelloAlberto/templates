{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ xorriso qemu zig_0_9 zls ];
  src = ./.;
  buldPhase = ''
  '';
}
