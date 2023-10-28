{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ esbuild typescript tree ];
  src = ./.;
  buildPhase = ''
  mkdir -p $out/web
    tsc --outDir $TMP $src/src/index.ts -t es5 --strict
    esbuild --bundle --minify $TMP/index.js > $out/web/index.js
    cp index.html $out/web/index.html
  '';
  bbuildPhase = ''
  tsc $src/src/index.ts --outDir $out/build
  '';
}
