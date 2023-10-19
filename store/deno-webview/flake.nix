{
  description = "Foo Bar";
  inputs = {
    deno2nix.url = "github:SnO2WMaN/deno2nix";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
  };
  outputs = { self, nixpkgs, deno2nix }:
    let
      supportedSystems = [ "x86_64-linux" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      # pkgsFor = nixpkgs.legacyPackages;
    in
    {

      devShells = forAllSystems
        (system:
          let
            # inherit (pkgs) deno2nix;
            pkgs = import nixpkgs {
              inherit system;
              overlays = [
                # devshell.overlay
                deno2nix.overlays.default
              ];
            };
            webview = pkgs.stdenv.mkDerivation {
              name = "ok";

              src = pkgs.fetchFromGitHub {
                owner = "webview";
                repo = "webview";
                rev = "2ee04ccd0530e3928a872f5d508c114403803e61";
                sha256 = "jG+znHzyK6wV5Mcnz3zyA4chJIsoBvtnI8h2khdtYZc=";
              };
              outputs = [ "out" "dev" ];
              buildInputs = [
                pkgs.webkitgtk
                pkgs.pkg-config
                pkgs.gtk3
              ];
              buildPhase = ''
                mkdir -p $out/lib;
                # echo "culo" > $out/bin/ok
                c++ $src/webview.cc -DWEBVIEW_GTK -shared -std=c++11 -Wall -Wextra -pedantic -fpic $(pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0) -o $out/lib/libwebview.so
              '';
              installPhase = ''
                # mkdir -p $out/lib
                # touch $out
              '';
            };
            cabbo =
              pkgs.stdenv.mkDerivation {

                name = "pop";
                buildInputs = with pkgs;[
                  (pkgs.callPackage ./. { })
                  # packages.cefault
                  webview
                  deno 


                ];
                src = ./.;

                PLUGIN_URL = "${webview}/lib/";
                shellHook = ''
                  # $(pckages.defat)
                  vr 

                '';
              };
          in
          {
            default = cabbo;
          }





          # packages.${system}.default = pkgs.callPackage ./. { };
          # mkShell.${system}.default =
          #   let
          #   in
          #   pkgs.mkShell { };
        );
    };



}   

