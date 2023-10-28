{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "server-deno";
  version = "0.1.1";
  buildInputs = with pkgs;[ ];
  src = ./.;
  installPhase = ''
    mkdir -p $out
    echo sono io
    cp -r $src/src $out/
  '';
}
