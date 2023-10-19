{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  nativeBuildInputs = with pkgs;[
    meson
    ninja
  ];
  src = ./.;
  buldPhase = ''
    ninja
  '';
  installPhase = ''
    mkdir -p $out/bin/
    mv myexe $out/bin/sample
  '';
}
