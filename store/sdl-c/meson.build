project('simple', 'c')

ok = 'demo'

c = meson.get_compiler('c')
m = c.find_library('m')
# glfw_dep = dependency('glfw3')
# freetype2 = dependency('freetype2')
# glew = dependency('glew')
# gl = dependency('opengl')
# gl = dependency('sdl2')
SDL2 = dependency('SDL2')


executable('wolf', 
    sources : 'src/main.c',
    dependencies: [SDL2]
)

executable('doom', 
    sources : 'src/doom.c',
    dependencies: [SDL2,m]
)
