#include <stdio.h>
#include <stdlib.h>
#include <GL/gl.h>
#include <GL/glu.h>
#include <GL/glut.h>
#include <ft2build.h>
#include FT_FREETYPE_H

// Function to render text using FreeType and OpenGL
void renderText(const char* text, FT_Face face, int x, int y, float scale) {
    glPushMatrix();
    glTranslatef(x, y, 0);
    glScalef(scale, scale, 1.0);

    const char* p;
    for (p = text; *p; p++) {
        if (FT_Load_Char(face, *p, FT_LOAD_RENDER)) {
            continue;
        }

        glTexImage2D(GL_TEXTURE_2D, 0, GL_RED, face->glyph->bitmap.width, face->glyph->bitmap.rows, 0, GL_RED, GL_UNSIGNED_BYTE, face->glyph->bitmap.buffer);

        GLfloat x2 = x + face->glyph->bitmap_left * scale;
        GLfloat y2 = -y - face->glyph->bitmap_top * scale;
        GLfloat w = face->glyph->bitmap.width * scale;
        GLfloat h = face->glyph->bitmap.rows * scale;

        glBegin(GL_QUADS);
        glTexCoord2f(0, 0); glVertex2f(x2, -y2);
        glTexCoord2f(0, 1); glVertex2f(x2, -y2 - h);
        glTexCoord2f(1, 1); glVertex2f(x2 + w, -y2 - h);
        glTexCoord2f(1, 0); glVertex2f(x2 + w, -y2);
        glEnd();

        x += (face->glyph->advance.x >> 6) * scale;
    }

    glPopMatrix();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);

    FT_Library ft;
    if (FT_Init_FreeType(&ft)) {
        fprintf(stderr, "Could not initialize FreeType library\n");
        exit(1);
    }

    FT_Face face;
    if (FT_New_Face(ft, "arial.ttf", 0, &face)) {
        fprintf(stderr, "Could not open font\n");
        exit(1);
    }

    FT_Set_Pixel_Sizes(face, 0, 48);

    glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    const char* text = "Hello, OpenGL!";
    glColor3f(1.0, 1.0, 1.0);
    renderText(text, face, 100, 100, 0.5);

    FT_Done_Face(face);
    FT_Done_FreeType(ft);

    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(800, 600);
    glutCreateWindow("OpenGL Text Rendering");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
