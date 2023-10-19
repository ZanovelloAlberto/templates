
project('fcft-ex', 'c',
        version: '3.1.6',  # Don't forget to update version in man pages
        license: 'MIT',
        meson_version: '>=0.58.0',
        default_options: [
          # 'c_std=c11',
          'warning_level=1',
          'werror=true',
          # 'b_ndebug=if-release'
  ])
is_debug_build = get_option('buildtype').startswith('debug')

cc = meson.get_compiler('c')

add_project_arguments(
  ['-D_GNU_SOURCE=200809L'] +
  (is_debug_build ? ['-D_DEBUG'] : []) +
  (cc.has_function('memfd_create') ? ['-DMEMFD_CREATE'] : []) +
  (cc.has_argument('-fvisibility=default') ? ['-DFCFT_EXPORT=__attribute__((visibility("default")))'] : ['-DFCFT_EXPORT=']),
  language: 'c')

# libepoll = dependency('epoll-shim', required: false)

libepoll = dependency('epoll-shim', required: false)
utf8proc = dependency('libutf8proc')
wayland_protocols = dependency('wayland-protocols')
wayland_client = dependency('wayland-client')
pixman = dependency('pixman-1')
fcft = dependency('fcft')
tllist = dependency('tllist')

wayland_protocols_datadir = wayland_protocols.get_variable('pkgdatadir')

wscanner = dependency('wayland-scanner', native: true)
wscanner_prog = find_program(
  wscanner.get_variable('wayland_scanner'), native: true)

wl_proto_headers = []
wl_proto_src = []
foreach prot : [
  wayland_protocols_datadir + '/stable/xdg-shell/xdg-shell.xml',
  wayland_protocols_datadir + '/unstable/xdg-decoration/xdg-decoration-unstable-v1.xml',
  #wayland_protocols_datadir + '/unstable/xdg-output/xdg-output-unstable-v1.xml',
  #wayland_protocols_datadir + '/unstable/primary-selection/primary-selection-unstable-v1.xml',
  #wayland_protocols_datadir + '/stable/presentation-time/presentation-time.xml',
  #wayland_protocols_datadir + '/unstable/text-input/text-input-unstable-v3.xml',
  ]

  wl_proto_headers += custom_target(
    prot.underscorify() + '-client-header',
    output: '@BASENAME@.h',
    input: prot,
    command: [wscanner_prog, 'client-header', '@INPUT@', '@OUTPUT@'])

  wl_proto_src += custom_target(
    prot.underscorify() + '-private-code',
    output: '@BASENAME@.c',
    input: prot,
    command: [wscanner_prog, 'private-code', '@INPUT@', '@OUTPUT@'])
endforeach

executable(
  'example',
  'main.c',
  'shm.c', 'shm.h',
  'stride.h',
  wl_proto_src, wl_proto_headers,
  dependencies: [fcft,utf8proc, libepoll, tllist, pixman, wayland_protocols, wayland_client]
)

