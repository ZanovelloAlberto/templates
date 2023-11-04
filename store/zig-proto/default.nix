{ pkgs }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[
    zls
    zig_0_11
  ];
  src = ./.;
  buildPhase = ''
    zig build get-proto
    zig build run
  '';
}
