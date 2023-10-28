{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  name = "ok";

  src = pkgs.fetchFromGitHub {
    owner = "webview";
    repo = "webview";
    rev = "2ee04ccd0530e3928a872f5d508c114403803e61";
    sha256 = "jG+znHzyK6wV5Mcnz3zyA4chJIsoBvtnI8h2khdtYZc=";
  };
  outputs = [ "out" "dev" ];
  buildInputs = with pkgs; [
    webkitgtk
    pkg-config
    gtk3
  ];
  BUILD_FLAGS = "-DWEBVIEW_GTK -shared -std=c++11 -Wall -Wextra -pedantic -fpic";
  buildPhase = ''
    
    mkdir -p $out/lib;
    g++ $src/webview.cc $BUILD_FLAGS $(pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0) -o $out/lib/libwebview.so
  '';
  installPhase = ''
    # mkdir -p $out/lib
    # touch $out
  '';
}
