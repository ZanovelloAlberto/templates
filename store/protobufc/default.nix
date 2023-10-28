{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs; [
    protobufc
  ];
  src = ./.;
  buildPhase = ''

     protoc-c --c_out=. proto/example.proto
     gcc main.c proto/example.pb-c.c -I . -lprotobuf-c 
  '';
  installPhase = ''
    mkdir -p $out/bin
    # touch $out/bin/ok
    mv a.out $out/bin/example
  '';
}
