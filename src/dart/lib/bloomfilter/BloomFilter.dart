import 'dart:ffi';
import 'dart:math';
import 'dart:typed_data';

import 'package:fnv/fnv.dart';
import 'package:murmurhash/murmurhash.dart';

class BitCoordinates {
  final int elementIndex;
  final int bitIndex;
  BitCoordinates({
    required this.elementIndex,
    required this.bitIndex,
  });
}

// typedef HashFunctions = func(h1,h2) =>int;

class BloomFilter {
  int size = 0;
  final int maxSize;
  late final int seed;
  late final int numberOfBits;
  late final List<dynamic> hashFunctions;
  late final Int8List bitsArray;

  BloomFilter({
    required this.maxSize,
    maxTolerance = 0.01,
    Uint64? seed,
  }) {
    if (seed == null) {
      this.seed = Random().nextInt(999999999999);
    }

    if (maxSize <= 0) {
      throw Exception(
          "maxSize must be positive number. Actual value: [$maxSize] ");
    }

    if (maxTolerance > 1 || maxTolerance < 0) {
      throw Exception(
          "maxTolerance must be 0 < x < 1. . Actual value: [$maxTolerance]");
    }

    numberOfBits = -(maxSize * log(maxTolerance) / ln2 / ln2).ceil();
    final numberOfHashFunctions = -(log(maxTolerance) / ln2).ceil();
    final numberOfElements = (numberOfBits / bitsArray.elementSizeInBytes).ceil();
    bitsArray = Int8List(numberOfElements);
    hashFunctions = _initiHashFunctions(numberOfHashFunctions);
  }

  BitCoordinates findBitCoordinates(int index) {
    final bitsPerInt = 8 * bitsArray.elementSizeInBytes;
    final elementIndex = (index / bitsPerInt).floor();
    final bitIndex = index % bitsPerInt;
    return BitCoordinates(elementIndex: elementIndex, bitIndex: bitIndex);
  }

  int readBit(int index) {
    final coordinates = findBitCoordinates(index);
    final targetBit =
        bitsArray[coordinates.elementIndex] & (1 << coordinates.bitIndex);
    // return 0 or 1
    return targetBit >> coordinates.bitIndex;
  }

  Int8List writeBit(int index) {
    final coordinates = findBitCoordinates(index);
    bitsArray[coordinates.elementIndex] =
        bitsArray[coordinates.elementIndex] | (1 << coordinates.bitIndex);
    return bitsArray;
  }

  key2Positions(String key, int seed) {
    final hashM = MurmurHash.v3(key, seed);
    final hashF = fnv1_32_s(key);
    return hashFunctions.map((h) => h(hashM, hashF));
  }

  _initiHashFunctions(int numberOfHashFunctions) {
    return List.generate(
        numberOfHashFunctions,
        (index) =>
            (h1, h2) => (h1 + index * h2 + index * index) % numberOfBits);
  }
}
