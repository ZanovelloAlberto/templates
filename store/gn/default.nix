{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  nativeBuildInputs = with pkgs;[
    gn
    ninja
    pkg-config
  ];
  gnFlags = [ ];
  ninjaFlags = [ ];
  src = ./.;
  installPhase = ''
    mkdir -p $out/bin
    mv hello $out/bin/hello
    mv libhello_shared.so $out/bin/
  '';
}
