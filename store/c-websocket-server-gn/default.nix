{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[
    gn
    ninja
    pkg-config

        inotify-tools
    libwebsockets
    clang-tools
  ];
  gnFlags = [ ];
  ninjaFlags = [ ];
  src = ./.;
  installPhase = ''
    mkdir -p $out/bin
    mv hello $out/bin/hello
    mv libhello_shared.so $out/bin/
  '';

   shellHook = ''
  
    build() {
      echo transplile...
      tsc --outDir $bdir client/client.ts -t es5 --strict
      echo buildling...
      esbuild --bundle --minify $bdir/client/client.js > $bdir/index.js
      echo done
    }
    run() {
        export o=$(nix-build web)
        deno run -A --unstable api/main.ts $o 
    }
    sigint_handler()
    {   
      kill $PID
    }
    trap sigint_handler SIGINT
    
    start() {
      export th=$PWD
      cd server
      gnConfigurePhase
      while true; do
      #export o=$(nix-build web)
      ninja -C . 
      ./main &
      #sleep(1)
      PID=$!
      inotifywait -e modify -r $th/server/src $th/client #-e move -e create -e delete -e attrib 
      kill $PID
    done
    }
  '';
}
