project('ok', 'c')
ok = 'demo'
# Initialize GLFW dependency
glfw_dep = dependency('glfw3')

c = meson.get_compiler('c')
m = c.find_library('m')
freetype2 = dependency('freetype2')
glew = dependency('glew')
gl = dependency('opengl')
# f = files('src/utils.c','src/main.c')
executable(ok, 'src/utils.c','src/main.c',
      dependencies: [glfw_dep, freetype2, m, gl, glew],
)

