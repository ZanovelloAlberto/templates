{
  description = "An example project using flutter";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
        name = "fluttem";
      in
      rec {
        packages.${name} = packages.default;
        packages.default =
          pkgs.flutter.buildFlutterApplication rec {

            inherit name;
            autoDepsList = true;
            # pubspecLockFile = ./pubspec.lock;
            # available with 'flutter pub deps --json'
            depsListFile = ./.deps.json;
            src = ./.;
            vendorHash = "sha256-Oq1GPjjwCGbI9kBFsrYh0/4wvZGALPRBlBNYXbjJCEk=";
            pubspecLockFile = ./pubspec.lock;
          };

        #  pkgs.clangStdenv.mkDerivation{
        # # outputs = ["lib"];
        # src = ./.;
        # name = "mario";
        #   buildInputs = with pkgs; [
        #     # from pkgs
        #     flutter
        #     clang
        #     # jdk11
        #     #from ./nix/*
        #     # android.platform-tools
        #   ];
        #   buildPhase = ''
        #   mkdir -p $out/bin
        #   export HOME=$out/
        #   flutter build linux --disable-telemetry'';
        #   installPhase = ''
        #   mv build/linux/x64/release/bundle/* $out/
        #   mv $out/fluttem $out/bin/mario
        #   mv $out/lib/* $out/bin/
        #   '';

        #   # ANDROID_HOME = "${android.androidsdk}/libexec/android-sdk";
        #   # JAVA_HOME = pkgs.jdk11;
        #   # ANDROID_AVD_HOME = (toString ./.) + "/.android/avd";
        # };
      });
}
