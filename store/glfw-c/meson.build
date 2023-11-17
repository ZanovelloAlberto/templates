project('ok', 'cpp')
ok = 'demo'
# Initialize GLFW dependency
glfw_dep = dependency('glfw3')

c = meson.get_compiler('cpp')
m = c.find_library('m')
freetype2 = dependency('freetype2')
glew = dependency('glew')
gl = dependency('opengl')


#executable(ok, 'src/utils.c','src/main.c',
#      dependencies: [glfw_dep, freetype2, m, gl, glew],
#)

# just render triangle
executable('due', 'src/due.cpp',
      dependencies: [glfw_dep, freetype2, m, gl, glew],
)

executable('tre', 'src/tre.cpp',
      dependencies: [glfw_dep, freetype2, m, gl, glew],
)
