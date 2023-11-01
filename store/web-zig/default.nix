{ pkgs }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ zig_0_11 inotify-tools ];
  src = ./.;
  shellHook = ''
    
    build() {
      # echo transplile...
      # tsc --outDir $bdir client/client.ts -t es5 --strict
      echo buildling...
      # zig build
      # esbuild --bundle --minify $bdir/client/client.js > $bdir/index.js
      echo done
    }
    run() {
        # export o=$(nix-build web)
        # deno run -A --unstable api/main.ts $o 
        zig build run
    }
    sigint_handler()
    {   
      kill $PID
    }
    trap sigint_handler SIGINT

    start() {
      
      echo starting...
      while true; do
        #export o=$(nix-build web)
        # build
        zig build 
        mv zig-out/lib/main.wasm src/
        ./zig-out/bin/web-zig & 
        #sdl
        #sleep(1)
        PID=$!
        echo $PID
        inotifywait -e modify -r web src #-e move -e create -e delete -e attrib 
        kill $PID
      done
  }

  '';
  buildPhase = ''
  '';
}
