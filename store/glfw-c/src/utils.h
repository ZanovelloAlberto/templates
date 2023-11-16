#include <GL/glew.h>
#include <stdio.h>
#include <stdlib.h>

void compile_shader_from_file(char *path, GLuint shader);
void link_shader_program(unsigned int program);
void read_file(char *path, char *buffer, size_t max_size);
void render_text(const char *text, float x, float y, float sx, float sy);
void ttinit();
