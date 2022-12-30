import 'dart:math';

import 'package:dart/bloomfilter/DataReader.dart';

void main(List<String> args) {
  final reader = NumChecker();

  for (int i = 0; i <= 1000; i++) {
    final val = Random().nextInt(numberRange);
    final watch = Stopwatch()..start();
    reader.contains(val);
    watch.stop();
    print("$val: \t${watch.elapsedMicroseconds} μs");
  }
}
