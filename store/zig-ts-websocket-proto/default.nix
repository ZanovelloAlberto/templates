{ pkgs }:
pkgs.stdenv.mkDerivation {
  pname = "sample";
  version = "0.1.1";
  buildInputs = with pkgs;[ esbuild  typescript nodejs esbuild zls zig_0_11 inotify-tools ];
  src = ./.;
  shellHook = ''
    
    build() {
      tsc --outDir out web/main.ts -t es5 --strict
      esbuild --bundle --minify out/main.js > zig-out/out.js
      zig build 
      export outjs=$PWD/zig-out/out.js
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

    buildProto() {
      echo unipmeneted

    }

    startProto() {
      echo unipmeneted
    }

    start() {
      
      echo starting...
      while true; do
        #export o=$(nix-build web)
        tsc --outDir out web/main.ts -t es5 --strict
        esbuild --bundle --minify out/main.js > zig-out/out.js
        zig build 
        export outjs=$PWD/zig-out/out.js
        
        
        echo $outjs

        ./zig-out/bin/web-zig $outjs &
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
