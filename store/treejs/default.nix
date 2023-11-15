{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[nodejs esbuild typescript ];
  src = ./.;
  buildPhase = ''
    # mkdir -p $out/web
    tsc --outDir $TMP $src/main.ts -t es5 --strict
    esbuild --bundle --minify $TMP/main.js > $out
    #cp index.html $out/web/index.html
  '';

  shellHook = ''
   export TMP=build
  start () {
    tsc --outDir $TMP web/main.ts -t es5 --strict
    esbuild --bundle --minify $TMP/main.js > public/main.js
  }
  '';

}
