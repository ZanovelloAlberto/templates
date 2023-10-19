{ pkgs ? import <nixpkgs> { } }:
pkgs.clangStdenv.mkDerivation {
  pname = "pample";
  version = "0.1.1";
  buildInputs = with pkgs;[ sokol glfw3 ];
  src = ./.;
  SOKOL_INC = "${pkgs.sokol}/include/sokol";
  buildPhase = ''
    echo ${pkgs.sokol}
    mkdir -p $out/bin
    clang src/main.c -o $out/bin/r -I $SOKOL_INC -I $SOKOL_INC/util -lGL -ldl -lm -lglfw
  '';
}
