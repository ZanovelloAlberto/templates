
#include <GL/glew.h>
#include <ft2build.h>
#include <stdio.h>
#include <stdlib.h>
#include FT_FREETYPE_H
#include "utils.h"

FT_Library ft;
FT_Face face;
void ttinit() {

  // Initialize FreeType library
  if (FT_Init_FreeType(&ft)) {
    fprintf(stderr, "Error: Could not initialize FreeType library\n");
    return;
  }

  // Load font face
  if (FT_New_Face(
          ft,
          // "/home/alberto/.nix-profile/share/fonts/truetype/NerdFonts/"
          // "JetBrainsMonoNLNerdFontPropo-Bold.ttf",
          "/home/alberto/.nix-profile/share/fonts/truetype/NerdFonts/"
          "M+CodeLatXNerdFontPropo-SemiBold.ttf",
          // "./ok.ttf",
          0, &face)) {
    fprintf(stderr, "Error: Could not load font\n");
    return;
  }

  if (FT_Load_Char(face, 'c', FT_LOAD_RENDER)) {
    printf("rott");
  }
}

void render_text(const char *text, float x, float y, float sx, float sy) {

  // Set font size
  // FT_Set_Pixel_Sizes(face, 0, 48);

  // Disable byte-alignment restriction
  // glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
  FT_GlyphSlot g = face->glyph;

  if (FT_Load_Char(face, 'X', FT_LOAD_RENDER)) {
    fprintf(stderr, "Error: Failed to load Glyph\n");
  }
  GLuint tex;
  glActiveTexture(GL_TEXTURE0);
  glGenTextures(1, &tex);
  glBindTexture(GL_TEXTURE_2D, tex);
  // glUniform1i(uniform_tex, 0);
      glTexImage2D(
      GL_TEXTURE_2D,
      0,
      GL_RED,
      g->bitmap.width,
      g->bitmap.rows,
      0,
      GL_RED,
      GL_UNSIGNED_BYTE,
      g->bitmap.buffer
    );
}

void read_file(char *path, char *buffer, size_t max_size) {
  FILE *file = fopen(path, "r");

  size_t i = 0;
  while (i < max_size) {
    char ch = fgetc(file);
    if (ch <= 0)
      break;
    buffer[i++] = ch;
  }
  buffer[i++] = '\0';
  fclose(file);
}

void compile_shader_from_file(char *path, GLuint shader) {
  char *buffer = malloc(0x1000);
  read_file(path, buffer, 0x1000);

  const char *source = buffer;
  glShaderSource(shader, 1, &source, NULL);
  glCompileShader(shader);

  int status;
  glGetShaderiv(shader, GL_COMPILE_STATUS, &status);
  if (!status) {
    char *info_buffer = malloc(0x1000);
    glGetShaderInfoLog(shader, 0x1000, NULL, info_buffer);
    printf("Error compiling shader: %s\nThe shader was:\n%s", info_buffer,
           buffer);
  }

  free(buffer);
}

void link_shader_program(unsigned int program) {
  glLinkProgram(program);

  int status;
  glGetProgramiv(program, GL_LINK_STATUS, &status);
  if (!status) {
    char *info_buffer = malloc(0x1000);
    glGetProgramInfoLog(program, 0x1000, NULL, info_buffer);
    printf("Error linking shader program: %s\n", info_buffer);
  }
}
