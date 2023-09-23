import 'dart:io';

import 'package:flutter/material.dart';

import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:yaml/yaml.dart';

// import 'package:markdown/markdown.dart' as md;

const CONFIG_PATH = "/home/alberto/.config/flu/config.yaml";
void main() async {
  var fileFound = false;
  // DesktopWindow.setFullScreen(true);
  print("lets GO");
  var text = await File(CONFIG_PATH).readAsString().onError(
    (error, stackTrace) {
      print("file: $CONFIG_PATH not foud");
      exit(9);
    },
  );

  var yaml = loadYaml(text);
  print(yaml.toString());

  // try {
  //   var a = File(CONFIG_PATH);
  // } catch (e) {
  //   print("file: $CONFIG_PATH not found");
  //   exit(1);
  // }

  // print(await a.readAsLines());

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // return const Text("viao");
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
          // This is the theme of your application.
          //
          // TRY THIS: Try running your application with "flutter run". You'll see
          // the application has a blue toolbar. Then, without quitting the app,
          // try changing the seedColor in the colorScheme below to Colors.green
          // and then invoke "hot reload" (save your changes or press the "hot
          // reload" button in a Flutter-supported IDE, or press "r" if you used
          // the command line to start the app).
          //
          // Notice that the counter didn't reset back to zero; the application
          // state is not lost during the reload. To reset the state, use hot
          // restart instead.
          //
          // This works for code too, not just values: Most code changes can be
          // tested with just a hot reload.
          // colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          // useMaterial3: true,
          ),
      home: const MarkdownBody(data: '# Flutter Demo Home Page'),
    );
  }
}
