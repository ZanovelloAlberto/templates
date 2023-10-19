{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    nuenv.url = "github:DeterminateSystems/nuenv";
  };

  outputs = { self, nixpkgs, nuenv }:
    let
      overlays = [ nuenv.overlays.default ];
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f {
        inherit system;
        pkgs = import nixpkgs { inherit overlays system; };
      });
    in
    {
      packages = forAllSystems ({ pkgs, system }:
        let

          rand = pkgs.nuenv.writeScriptBin {
            name = "run-me";
            script = ''
              def blue [msg: string] { $"(ansi blue)($msg)(ansi reset)" }
              blue "Hello world"
            '';
          };
        in
        {
          default = pkgs.nuenv.mkDerivation {
            name = "hello";
            src = ./.;
            inherit system;
            # This script is Nushell, not Bash
            packages = with pkgs; [ hello rand ];
            build = ''
              hello --greeting $"($env.MESSAGE)" | save hello.txt
              let out = $"($env.out)/share"
              mkdir $out
              cp hello.txt $out
            '';
            MESSAGE = "My custom Nuenv derivation!";
          };
        });
    };
}
