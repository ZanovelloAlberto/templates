#include <libwebsockets.h>
#include <string.h>

// static int callback_http(struct lws *wsi, enum lws_callback_reasons reason,
// void *user, void *in, size_t len)
// {
//     switch (reason)
//     {
//         case LWS_CALLBACK_HTTP:
//             lws_serve_http_file(wsi, "index.html", "text/html", NULL, 0);
//             break;
//         default:
//             break;
//     }

//     return 0;
// }

static int callback_websockets(struct lws *wsi,
                               enum lws_callback_reasons reason, void *user,
                               void *in, size_t len) {
  switch (reason) {
  case LWS_CALLBACK_PROTOCOL_INIT:
    break;
  case LWS_CALLBACK_ESTABLISHED:
    printf("WebSocket connection established\n");
    break;
  case LWS_CALLBACK_RECEIVE:
    // Handle received data here (in points to the received data)
    break;
  case LWS_CALLBACK_CLOSED:
    printf("WebSocket connection closed\n");
    break;
  default:
    break;
  }

  return 0;
}

static struct lws_protocols protocols[] = {{
                                               "websocket",
                                               callback_websockets,
                                               0,
                                               0,
                                           },
                                           {NULL, NULL, 0, 0}};

int main() {
  struct lws_context_creation_info info;
  struct lws_context *context;
  const char *iface = NULL;
  int port = 7681;

  memset(&info, 0, sizeof info);

  info.port = port;
  info.iface = iface;
  info.protocols = protocols;

  context = lws_create_context(&info);
  if (!context) {
    fprintf(stderr, "Error creating libwebsocket context\n");
    return -1;
  }

  while (1) {
    lws_service(context, 0);
  }

  lws_context_destroy(context);

  return 0;
}