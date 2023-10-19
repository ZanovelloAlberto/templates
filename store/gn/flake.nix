{
  description = "Foo Bar";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    # let
    #   supportedSystems = [ "x86_64-linux" ];
    #   forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    # in

    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import <nixpkgs> {
          inherit system;
        };
      in
      {
        default = pkgs.callPackage ./. { };
      });


}   

