#include <stdio.h>
#include "proto/example.pb-c.h" 

int main() {
    Myapp__MyMessage my_message = MYAPP__MY_MESSAGE__INIT;
    uint8_t buffer[128];
    unsigned len;

    my_message.name = "John";
    my_message.age = 30;

    len = myapp__my_message__pack(&my_message, buffer);
    printf("Packed message size: %u\n", len);

    Myapp__MyMessage  *unpacked_message = myapp__my_message__unpack(NULL, len, buffer);
    printf("Unpacked message: name=%s, age=%d\n", unpacked_message->name, unpacked_message->age);

    myapp__my_message__free_unpacked(unpacked_message, NULL);

    return 0;
}
