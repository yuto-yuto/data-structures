import 'dart:collection';

import 'package:dart/disjoint_sets/disjoint_set_base.dart';
import 'package:dart/disjoint_sets/tree.dart';

class TreeDisJointSet extends DisjointSetBase<Tree> {
  TreeDisJointSet({HashMap<Element, Tree>? initialSet})
      : super(initialSet: initialSet);

  @override
  bool add(Element elem) {
    if (partitionsMap.containsKey(elem)) {
      return false;
    }

    partitionsMap.addAll({
      elem: Tree(elem),
    });
    return true;
  }

  @override
  Tree findPartition(Element elem) {
    if (!partitionsMap.containsKey(elem)) {
      throw Exception("The element is not found. [$elem]");
    }

    var current = partitionsMap[elem]!;
    if (current.root != elem) {
      // Go to the root of the Tree
      current = findPartition(current.root);
    }

    return current;
  }

  @override
  bool areDisjoint(Element elem1, Element elem2) {
    return findPartition(elem1) != findPartition(elem2);
  }

  @override
  bool merge(Element elem1, Element elem2) {
    final p1 = findPartition(elem1);
    var p2 = findPartition(elem2);

    if (p1.root == p2.root) {
      return false;
    }

    if (p1.rank >= p2.rank) {
      p2.root = p1.root;
      p1.rank += p2.rank;
    } else {
      p1.root = p2.root;
      p2.rank += p1.rank;
    }

    return true;
  }

  // intermidiate implementation
  // @override
  // bool merge(Element elem1, Element elem2) {
  //   final p1 = findPartition(elem1);
  //   var p2 = findPartition(elem2);

  //   if (p1.root == p2.root) {
  //     return false;
  //   }

  //   partitionsMap[p1.root] = p2;

  //   return true;
  // }
}
