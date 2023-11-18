{ pkgs ? import <nixpkgs> { } }:
pkgs.clangStdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  inputs = with pkgs; [
    pkg-config
    clang-tools
  ];
  nativeBuildInputs = with pkgs;[
    meson
    ninja
    SDL
    SDL2
  ];
  src = ./.;
  buldPhase = ''

    # ninja
  '';
  installPhase = ''
    mkdir -p $out/bin/
    mv myexe $out/bin/sample
  '';
  shellHook = ''
      start(){
      mesonConfigurePhase
      ninjaBuildPhase
    }
  '';
}
