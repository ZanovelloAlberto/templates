{ pkgs ? import <nixpkgs> { } }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  #o = pkgs.callPackage ./web { };
  bdir = "_build";

  buildInputs = with pkgs; [
    deno
    nodejs
    esbuild
    typescript
    nodejs
    inotify-tools
  ];
  shellHook = ''
    bproto() {
      npm i 
      protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./example.proto 
    }
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
      
      while true; do
      #export o=$(nix-build web)
      build
      deno run -A --unstable server/main.ts $bdir/index.js &
      #sleep(1)
      PID=$!
      inotifywait -e modify -r server client #-e move -e create -e delete -e attrib 
      kill $PID
    done
    }
  '';


  src = ./.;
  buildPhase = ''
  '';
}
