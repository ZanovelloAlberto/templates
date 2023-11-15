{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ esbuild typescript tree ];
  src = ./.;
  buildPhase = ''
    # mkdir -p $out/web
    tsc --outDir $TMP $src/main.ts -t es5 --strict
    esbuild --bundle --minify $TMP/main.js > $out
    #cp index.html $out/web/index.html
  '';

}
