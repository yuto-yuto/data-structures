import 'dart:math';

import 'package:dart/bloomfilter/data_reader.dart';

void main(List<String> args) {
  final reader = NumChecker();

  for (int i = 0; i <= 50; i++) {
    final val = Random().nextInt(numberRange);
    final watch = Stopwatch()..start();
    reader.contains(val);
    watch.stop();
    print("$val: \t${watch.elapsedMicroseconds} μs");
  }
  reader.printFalsePositiveRatio();
}
