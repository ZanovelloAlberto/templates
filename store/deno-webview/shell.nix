{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  # Get dependencies from the main package
  inputsFrom = [ (pkgs.callPackage ./default.nix { }) ];
  # Additional tooling
  buildInputs = with pkgs; [

    xorg.libXi
    xorg.libXcursor
    xorg.libX11.dev
    xorg.libXft
    xorg.libXinerama
    alsa-lib
    libGL
    cargo
    rust-analyzer # LSP Server
    rustfmt # Formatter
    clippy # Linter
  ];
}
