{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation rec {
  pname = "ok";
  version = "0.1.1";
  buildInputs = with pkgs;[
    meson
    freetype
    nodePackages.nodemon
    stb
    glew
    glfw
    clang-tools
    clang
    pkg-config
    ninja
  ];
  src = ./.;
  buildPhase = ''
    clang src/*.c -lGL -lGLEW -lglfw -lfreetype -I src -ldl -lm `pkg-config --cflags stb`
  '';
  iStb = "`pkg-config --cflags stb`";
  # title = "ok";
  shellHook = ''
    sway assign [title=${pname}] workspace 3
    start(){
    echo ${buildPhase}
      nodemon -e c,glsl,h --exec "rm a.out; ${buildPhase} ./a.out; echo build failed..." 
    }

  '';
}
