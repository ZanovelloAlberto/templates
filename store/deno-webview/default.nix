{ pkgs ? import <nixpkgs> { } }:
let

  denoEnv = import ./npkg/denop.nix pkgs;
  #   webview = pkgs.stdenv.mkDerivation {
  #   name = "ok";

  #   src = pkgs.fetchFromGitHub {
  #     owner = "webview";
  #     repo = "webview";
  #     rev = "2ee04ccd0530e3928a872f5d508c114403803e61";
  #     sha256 = "jG+znHzyK6wV5Mcnz3zyA4chJIsoBvtnI8h2khdtYZc=";
  #   };
  #   outputs = [ "out" "dev" ];
  #   buildInputs = with pkgs; [
  #     webkitgtk
  #     pkg-config
  #     gtk3
  #   ];
  #   buildPhase = ''
  #     mkdir -p $out/lib;
  #     # echo "culo" > $out/bin/ok
  #     cpp $src/webview.cc -DWEBVIEW_GTK -shared -std=c++11 -Wall -Wextra -pedantic -fpic $(pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0) -o $out/lib/libwebview.so
  #   '';
  #   installPhase = ''
  #     # mkdir -p $out/lib
  #     # touch $out
  #   '';
  # };

in
# pkgs.stdenv.mkDerivation {
  #   pname = "res";
  #   version = "0.4.4";
  #   buildInputs = with pkgs;[ webview deno ];
  #   PLUGIN_URL = "${webview}/lib/";
  #   src = ./.;
  #   # XDG_CACHE_HOME = /tmp/deno;
  #   # postUnpack = "deno cache $sourceRoot/cli.ts";
  #   # installPhase = "mkdir -p $out/bin && install -t $out/bin vr";
  #   buildPhase = ''
  #         export DENO_DIR="/tmp/deno2nix"


  #     # touch $out
  #        mkdir -p $out/bin
  #       # echo "$PLUGIN_URL" > $out
  #       # touch $out

  #     deno compile --cached-only --output $out/bin/out src/web.ts

  #     # echo vaffa > $out/bin/res
  #   '';

  #   installPhase = ''
  #     # mkdir -p $out/lib
  #     # touch $out
  #   '';
  # }

  # pkgs.deno2nix.mkExecutable {
  #   pname = "deno-api-dynamic-form";
  #   version = "0.0.0";
  #   src = ./.;
  #   lockfile = ./lock.json;
  #   config = "";
  #   output = "yes";
  #   entrypoint = "./src/web.ts";
  #   importMap = "./import_map.json";
  #   additionalDenoFlags = "--allow-net --allow-env --allow-read";
  #   # PLUGIN_URL = "${webview}/lib/";
  # }

  # let

  # in
denoEnv.buildDenoBinary {
  pname = "velociraptor";
  version = "1.2.0";
  lockfile = ./deno.lock;
  depSha256 = "sha256-OaGnwVkIKXiU9UxafPZ06NYj7julG1m75XqxSnlRgyY=";
  denoOpts = "-A --unstable";

  src = ./.;
  entrypoint = "src/web.ts";
  binname = "vr";
}
