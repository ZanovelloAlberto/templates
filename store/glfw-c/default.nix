{ pkgs ? import <nixpkgs> { } }:
pkgs.clangStdenv.mkDerivation rec {
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
    swaymsg assign [title=$pname] workspace 4
    start(){
      mesonConfigurePhase
      nodemon -e c,glsl,h,cpp -w ../src --exec "rm ./$1; ninja -C . && ./$1 ; echo build failed..." 
    }

  '';
}
