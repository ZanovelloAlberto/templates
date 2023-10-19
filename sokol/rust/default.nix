{ pkgs ? import <nixpkgs> { } }:
let manifest = (pkgs.lib.importTOML ./Cargo.toml).package;
in
pkgs.rustPlatform.buildRustPackage rec {
  pname = manifest.name;
  version = manifest.version;
  cargoLock = {
    lockFile = ./Cargo.lock;
    outputHashes = {
      "sokol-0.1.0" = "sha256-KWi+u9drlakTSuK50mo25fVBQpEqwWD07FvIZ0RvQ40=";
    };
  };
  checkFlags = [
    # reason for disabling test
    # "-O"
  ];
  src = pkgs.lib.cleanSource ./.;
  buildInputs = with pkgs; [
    xorg.libXi
    xorg.libXcursor
    xorg.libX11.dev
    xorg.libXft
    xorg.libXinerama
    alsa-lib
    libGL
  ];
}
