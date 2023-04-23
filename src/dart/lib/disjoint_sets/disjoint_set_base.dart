import 'dart:collection';

import 'package:dart/disjoint_sets/tree.dart';

abstract class DisjointSetBase<T> {
  HashMap<Element, T> partitionsMap = HashMap();

  DisjointSetBase({HashMap<Element, T>? initialSet}) {
    if (initialSet != null) {
      partitionsMap = initialSet;
    }
  }

  /// Add the specified element to the Disjoint set
  bool add(Element elem);

  /// Find the partition to which the specified element belongs.
  T findPartition(Element elem);

  /// Return true if the two objects belong to the same partition.
  /// Otherwise false.
  bool areDisjoint(Element elem1, Element elem2);

  /// Merge the two elements into one group.
  bool merge(Element elem1, Element elem2);

  /// Show all elements in this Disjoint set.
  void show() {
    for (final key in partitionsMap.keys) {
      print("$key: ${partitionsMap[key]}");
    }
  }
}
