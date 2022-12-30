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

typedef HashFunction = int Function(int h1, int h2);

class BloomFilter {
  int size = 0;
  final int maxSize;
  late final int seed;
  late final int numberOfBits;
  late final List<HashFunction> hashFunctions;
  late final Int8List bitsArray;
  final bitsPerElement = 8;

  BloomFilter({
    required this.maxSize,
    maxTolerance = 0.01,
    Uint64? seed,
  }) {
    if (seed == null) {
      this.seed = Random().nextInt(pow(2, 32).toInt());
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
    final numberOfElements =
        (numberOfBits / bitsPerElement).ceil();
    bitsArray = Int8List(numberOfElements);
    hashFunctions = _initiHashFunctions(numberOfHashFunctions);
  }

  BitCoordinates findBitCoordinates(int index) {
    final bitsPerElement = 8 * bitsArray.elementSizeInBytes;
    final elementIndex = (index / bitsPerElement).floor();
    final bitIndex = index % bitsPerElement;
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

  bool contains(String key, {List<int>? positions}) {
    positions ??= _key2Positions(seed, key);
    return positions.every((element) => readBit(element) != 0);
  }

  void insert(String key) {
    final positions = _key2Positions(seed, key);
    if (contains(key, positions: positions)) {
      return;
    }

    size++;
    for (var element in positions) {
      writeBit(element);
    }
  }

  List<int> _key2Positions(int seed, String key) {
    final hashM = MurmurHash.v3(key, seed);
    final hashF = fnv1_32_s(key);
    return hashFunctions.map((h) => h(hashM, hashF)).toList();
  }

  List<HashFunction> _initiHashFunctions(int numberOfHashFunctions) {
    return List.generate(
      numberOfHashFunctions,
      (int index) => ((int h1, int h2) =>
          (h1 + index * h2 + index * index) % numberOfBits),
    );
  }
}
