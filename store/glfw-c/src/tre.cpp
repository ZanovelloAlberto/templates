#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>
const char *vertexShaderSource = R"(
    #version 330 core
    layout (location = 0) in vec3 aPos;
    void main() {
        gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
    }
)";

// Fragment Shader source
const char *fragmentShaderSource = R"(
    #version 330 core
    out vec4 FragColor;
    void main() {
        FragColor = vec4(1.0, 0.5, 0.2, 1.0);
    }
)";

static GLint compile_shader(GLint type, const char *source)
{
    GLint id = glCreateShader(type);
    glShaderSource(id, 1, &source, nullptr);
    glCompileShader(id);
    GLint result;
    glGetShaderiv(id, GL_COMPILE_STATUS, &result);
    if (result == GL_FALSE)
    {
        GLint lenght;
        glGetShaderiv(id, GL_INFO_LOG_LENGTH, &lenght);
        char *message = (char *)alloca(lenght * sizeof(char));
        glGetShaderInfoLog(id, lenght, &lenght, message);
        std::cout << "failed to compile " << (type == GL_VERTEX_SHADER ? "vetex" : "fragment") << " shader" << std::endl;
        std::cout << message << std::endl;
        free(message);
        return 0;
    }
    return id;
}
static GLint create_shader()
{
    GLint program = glCreateProgram();
    GLint vs = compile_shader(GL_VERTEX_SHADER, vertexShaderSource);
    GLint fs = compile_shader(GL_FRAGMENT_SHADER, fragmentShaderSource);

    glAttachShader(program, vs);
    glAttachShader(program, fs);
    glLinkProgram(program);
    glValidateProgram(program);

    glDeleteShader(vs);
    glDeleteShader(fs);

    return program;
}

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
    printf("%s", glGetString(GL_VERSION));

    // just after init glew
    if (glewInit() != GLEW_OK)
        printf("not good");

    {
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

        GLint s = create_shader();
        glUseProgram(s);
    }

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
