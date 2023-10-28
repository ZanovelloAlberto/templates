{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation rec {
  pname = "sample";
  version = "0.1.1";
  client = pkgs.callPackage ./client { };
  webview = pkgs.callPackage ./webview.nix { };
  server = pkgs.callPackage ./server { };
  nativeInputs = [ webview pkgs.deno pkgs.webkitgtk pkgs.pkg-config ];
  src = ./empty;
  
  ''
  script = pkgs.writeShellScript "run" ''
      echo "hi, my name is ''${0}" # escape bash variable
      export PLUGIN_URL="${webview}/lib/";
      ${pkgs.deno}/bin/deno run -Ar --unstable ${server}/src/main.ts ${client}/web
  '';
  buildPhase = ''

    # touch $src/vaffanculo
      '';
  installPhase = ''
    mkdir -p $out/bin/ 
    cp $script $out/bin/run
  '';
}
