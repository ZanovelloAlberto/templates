{ pkgs ? import <nixpkgs> { } }:
pkgs.clangStdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  inputs = with pkgs; [
    clang-tools
  ];
  mesonBuildType = "release";

  nativeBuildInputs = with pkgs;[
    meson
    wayland-protocols
    pkg-config
    cmake
    wayland
    fcft
    tllist
    pixman
    ninja
    graphene
    utf8proc
    freetype


  ];
  # installPhase = ''
  #   ls build 
  # '';
  installPhase = ''
  echo $PWD
   ls

    mkdir -p $out/bin/
    mv example $out/bin/
    # install -Dm755 $src $out
  '';
  src = ./.;
}
