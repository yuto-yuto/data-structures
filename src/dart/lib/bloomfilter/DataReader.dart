import 'dart:io';
import 'dart:math';

import 'package:dart/bloomfilter/BloomFilter.dart';

const numberRange = 10000;

class SlowStorage {
  final Set<int> _numbers =
      List.generate(1000, (index) => Random().nextInt(numberRange)).toSet();

  Iterable<int> get numbers => _numbers.toList();
  int get length => _numbers.length;

  bool insert(int num) {
    // sleep(Duration(seconds: 1));
    return _numbers.add(num);
  }

  bool remove(int num) {
    sleep(Duration(seconds: 1));
    return _numbers.remove(num);
  }

  bool contains(int num) {
    sleep(Duration(seconds: 1));
    return _numbers.contains(num);
  }
}

class NumChecker {
  late final BloomFilter _bloomFilter;
  final _slowStorage = SlowStorage();

  NumChecker() {
    final size = 2 * _slowStorage.length;
    _bloomFilter = BloomFilter(maxSize: size, maxTolerance: 0.01);
    print(_slowStorage.numbers.join(","));

    for (final num in _slowStorage.numbers) {
      _bloomFilter.insert(num.toString());
    }
  }

  bool contains(int num) {
    if (_bloomFilter.contains(num.toString())) {
      final actual = _slowStorage.contains(num);
      if (!actual) {
        print("FALSE POSITIVE!!! Value: $num");
      }
      return actual;
    }
    return false;
  }
}
