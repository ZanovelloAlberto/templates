#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

int main()
{
    if (!glfwInit())
        return 1;

    GLFWmonitor *fullscreen_monitor = NULL; // Windowed
    GLFWwindow *share = NULL;
    GLFWwindow *window =
        glfwCreateWindow(1920, 1080, "ok", fullscreen_monitor, share);
    // glfwSetFramebufferSizeCallback(window, &framebuffer_size_callback);
    if (!window)
    {
        glfwTerminate();
        return 1;
    }

    // open gl context
    glfwMakeContextCurrent(window);

    // just after init glew
    if (glewInit() != GLEW_OK)
        printf("not good");

    // messing up
    float postions[6] = {
        -0.5,
        -0.5,
        0,
        0.5,
        0.5,
        -0.5};
    unsigned int buffer;
    glGenBuffers(1, &buffer);
    glBindBuffer(GL_ARRAY_BUFFER, buffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(postions), postions, GL_STATIC_DRAW);
        glEnableVertexAttribArray(0);
        glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, sizeof(float) * 2, 0);
    while (!glfwWindowShouldClose(window))
    {
        glClear(GL_COLOR_BUFFER_BIT);
        glColor3f(1, 1, 1);
        glDrawArrays(GL_TRIANGLES, 0, 3);
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    return 0;
}
