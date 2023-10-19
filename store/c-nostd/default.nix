{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  # inputs = with pkgs;[ clang-tools ];
  buildInputs = with pkgs;[ clang ];
  src = ./.;
  FLAGS = ''
    -nostdlib
    -pedantic
    -O2
    -Wall
    -nostdlib
    -fno-unwind-tables
    -fno-asynchronous-unwind-tables
    -fdata-sections
    -fno-builtin
    -fno-stack-protector
  '';
  buildPhase = ''
    mkdir -p $out/bin
    # touch $out/bin/pp
    clang src/main.c src/stub.S -o $out/bin/sample $FLAGS 
  '';
}
