#include "utils.h"
// #include <ft2build.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
// #include FT_FREETYPE_H
// #include <GL/glew.h>
#include <GLFW/glfw3.h>
#define STB_IMAGE_IMPLEMENTATION
#include "matrix.h"
#include <stb/stb_image.h>

// struct context {
//   unsigned int shader_program;
//   unsigned int vao;
//   GLFWwindow *window;
//   unsigned int uniform_transform;
// };

#define redColor 1, 0, 0

#define yellow() glColor3f(0, 0, 1)

typedef struct point {
  GLfloat x;
  GLfloat y;
  GLfloat z;
} Point;

void DrawPoint(GLfloat s, GLfloat red, GLfloat green, GLfloat blue, GLfloat x,
               GLfloat y) {
  glPointSize(s);
  glBegin(GL_POINTS);
  glColor3f(red, green, blue);
  glVertex2f(x, y);
  glEnd();
}
void drawTriangle() {

  glBegin(GL_QUADS);
  // Front face
  glColor3f(1.0f, 0.0f, 0.0f);    // Red
  glVertex3f(-0.5f, -0.5f, 0.5f); // Bottom left
  glVertex3f(0.5f, -0.5f, 0.5f);  // Bottom right
  glVertex3f(0.5f, 0.5f, 0.5f);   // Top right
  glVertex3f(-0.5f, 0.5f, 0.5f);  // Top left

  // Back face
  glColor3f(0.0f, 1.0f, 0.0f);     // Green
  glVertex3f(-0.5f, -0.5f, -0.5f); // Bottom right
  glVertex3f(0.5f, -0.5f, -0.5f);  // Bottom left
  glVertex3f(0.5f, 0.5f, -0.5f);   // Top left
  glVertex3f(-0.5f, 0.5f, -0.5f);  // Top right

  // Left face
  glColor3f(1, 1, 1);              // Blue
  glVertex3f(-0.5f, -0.5f, -0.5f); // Bottom left
  glVertex3f(-0.5f, -0.5f, 0.5f);  // Bottom right
  glVertex3f(-0.5f, 0.5f, 0.5f);   // Top right
  glVertex3f(-0.5f, 0.5f, -0.5f);  // Top left

  // Right face
  glColor3f(1.0f, 1.0f, 0.0f);    // Yellow
  glVertex3f(0.5f, -0.5f, -0.5f); // Bottom right
  glVertex3f(0.5f, -0.5f, 0.5f);  // Bottom left
  glVertex3f(0.5f, 0.5f, 0.5f);   // Top left
  glVertex3f(0.5f, 0.5f, -0.5f);  // Top right

  // Top face
  glColor3f(1.0f, 0.3f, 0.3f);    // Magenta
  glVertex3f(-0.5f, 0.5f, 0.5f);  // Bottom left
  glVertex3f(0.5f, 0.5f, 0.5f);   // Bottom right
  glVertex3f(0.5f, 0.5f, -0.5f);  // Top right
  glVertex3f(-0.5f, 0.5f, -0.5f); // Top left

  // Bottom face
  glColor3f(0.3f, 0.3f, 0.3f);     // Cyan
  glVertex3f(-0.5f, -0.5f, -0.5f); // Bottom left
  glVertex3f(0.5f, -0.5f, -0.5f);  // Bottom right
  glVertex3f(0.5f, -0.5f, 0.5f);   // Top right
  glVertex3f(-0.5f, -0.5f, 0.5f);  // Top left
  glEnd();
}

int main() {
  if (!glfwInit())
    return 1;

  GLFWmonitor *fullscreen_monitor = NULL; // Windowed
  GLFWwindow *share = NULL;
  GLFWwindow *window =
      glfwCreateWindow(1920, 1080, "ok", fullscreen_monitor, share);
  // glfwSetFramebufferSizeCallback(window, &framebuffer_size_callback);
  if (!window) {
    glfwTerminate();
    return 1;
  }
  glfwMakeContextCurrent(window);

  while (!glfwWindowShouldClose(window)) {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    glEnable(GL_DEPTH_TEST);

    // Apply transformations
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    // Define rotation parameters
    float time = glfwGetTime();
    float angle = time * 5.0f; // Adjust speed of rotation
    float rotation_axis_x = cos(angle);
    float rotation_axis_y = cos(angle);

    // Apply rotation
    glRotatef(angle, rotation_axis_x, rotation_axis_y, 0.0f);
    drawTriangle();

    glfwSwapBuffers(window);
    glfwPollEvents();
  }

  return 0;
}
