import 'dart:collection';

import 'package:dart/disjoint_sets/disjoint_set_base.dart';
import 'package:dart/disjoint_sets/tree.dart';

class DisjointSet extends DisjointSetBase<Set<Element>> {
  DisjointSet({HashMap<Element, Set<Element>>? initialSet})
      : super(initialSet: initialSet);

  @override
  bool add(Element elem) {
    if (partitionsMap.containsKey(elem)) {
      return false;
    }

    partitionsMap.addAll({
      elem: {elem}
    });
    return true;
  }

  @override
  Set<Element> findPartition(Element elem) {
    if (!partitionsMap.containsKey(elem)) {
      throw Exception("The element is not found. [$elem]");
    }

    return partitionsMap[elem]!;
  }

  /// Returns true if the two objects belong to the same partition.
  @override
  bool areDisjoint(Element elem1, Element elem2) {
    return findPartition(elem1) != findPartition(elem2);
  }

  /// Move all elements in the partition where [elem1] belongs
  /// into another partition where [elem2] belongs to.
  @override
  bool merge(Element elem1, Element elem2) {
    final p1 = findPartition(elem1);
    final p2 = findPartition(elem2);

    if (p1 == p2) {
      return false;
    }

    for (final elem in p1) {
      p2.add(elem);
      partitionsMap[elem] = p2;
    }

    return true;
  }
}
