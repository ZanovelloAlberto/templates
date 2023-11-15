{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[
    webkitgtk
    pkg-config
    glib-networking
    gtk3
  ];
  src = ./.;
  buildPhase = ''
  '';
  shellHook = ''
  GIO_MODULE_DIR="${pkgs.glib-networking}/lib/gio/modules/";
  '';
}
