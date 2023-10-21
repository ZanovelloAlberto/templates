{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ esbuild typescript ];
  src = ./.;
  buildPhase = ''
    mkdir -p $out/web
    mkdir -p $out/build 
    touch coglione-dimmerda
    tsc # $src/src/index.ts # --outDir $out/build 
    esbuild --bundle --minify $out/build/index.js $out/result.js
    cp index.html $out/web/index.html
  '';
}
