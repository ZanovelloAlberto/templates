const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    const features = std.Target.x86.Feature;

    var disabled_features = std.Target.Cpu.Feature.Set.empty;
    var enabled_features = std.Target.Cpu.Feature.Set.empty;

    disabled_features.addFeature(@enumToInt(features.mmx));
    disabled_features.addFeature(@enumToInt(features.sse));
    disabled_features.addFeature(@enumToInt(features.sse2));
    disabled_features.addFeature(@enumToInt(features.avx));
    disabled_features.addFeature(@enumToInt(features.avx2));
    enabled_features.addFeature(@enumToInt(features.soft_float));

    const target = b.standardTargetOptions(.{ .whitelist = null, .default_target = .{
        .cpu_arch = std.Target.Cpu.Arch.i386,
        .os_tag = std.Target.Os.Tag.freestanding,
        .abi = std.Target.Abi.none,
        .cpu_features_sub = disabled_features,
        .cpu_features_add = enabled_features,
    } });

    const mode = b.standardReleaseOptions();

    const kernel = b.addExecutable("kernel.elf", "src/main.zig");
    kernel.setTarget(target);
    kernel.setBuildMode(mode);
    kernel.setLinkerScriptPath(.{ .path = "src/linker.ld" });
    kernel.code_model = .kernel;
    kernel.install();

    const kernel_step = b.step("kernel", "Build the kernel");
    kernel_step.dependOn(&kernel.install_step.?.step);

    const iso_dir = b.fmt("{s}/iso_root", .{b.cache_root});
    const kernel_path = b.getInstallPath(kernel.install_step.?.dest_dir, kernel.out_filename);
    const iso_path = b.fmt("{s}/disk.iso", .{b.exe_dir});

    const iso_cmd_str = &[_][]const u8{
        "/bin/sh", "-c", std.mem.concat(
            b.allocator,
            u8,
            &[_][]const u8{
                "mkdir -p ",
                iso_dir,
                " && ",
                "cp ",
                kernel_path,
                " ",
                iso_dir,
                " && ",
                "cp src/grub.cfg ",
                iso_dir,
                " && ",
                "grub-mkrescue -o ",
                iso_path,
                " ",
                iso_dir,
            },
        ) catch unreachable,
    };

    const iso_cmd = b.addSystemCommand(iso_cmd_str);
    iso_cmd.step.dependOn(kernel_step);

    const iso_step = b.step("iso", "Build an ISO image");
    iso_step.dependOn(&iso_cmd.step);
    b.default_step.dependOn(iso_step);

    const run_cmd_str = &[_][]const u8{
        // "qemu-system-i386", "-cdrom", iso_path,
        "qemu-system-x86_64", "-cdrom",        iso_path,
        "-debugcon",          "stdio",         "-vga",
        "virtio",             "-m",            "4G",
        "-machine",           "q35,accel=kvm", "-no-reboot",
        "-no-shutdown",
    };

    const run_cmd = b.addSystemCommand(run_cmd_str);
    run_cmd.step.dependOn(b.getInstallStep());

    const run_step = b.step("run", "Run the kernel");
    run_step.dependOn(&run_cmd.step); // const run_cmd = exe.run();
}
