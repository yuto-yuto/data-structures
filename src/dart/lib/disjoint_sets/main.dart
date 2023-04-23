import 'dart:collection';
import 'dart:math';

import 'package:dart/disjoint_sets/disjoint_set.dart';
import 'package:dart/disjoint_sets/disjoint_set_base.dart';
import 'package:dart/disjoint_sets/tree.dart';
import 'package:dart/disjoint_sets/tree_disjoint_set.dart';

void main(List<String> args) {
  print("---- Normal Disjoint Set ----");
  final naiveDisjointSet = NaiveDisjointSet();
  run(naiveDisjointSet);

  print("");
  print("---- Tree Disjoint Set ----");
  final treeDisjointSet = TreeDisJointSet();
  run(treeDisjointSet);
  final p = treeDisjointSet.findPartition(1);
  print(p.root);
  print(p.root);

  print("--- merge two times ---");
  print(treeDisjointSet.areDisjoint(1, 4)); // false
  print(treeDisjointSet.merge(5, 4)); // true
  print(treeDisjointSet.areDisjoint(1, 5)); // false
  print(treeDisjointSet.merge(2, 4)); // true

  treeDisjointSet.show();

  print("--- Merge items if the combination appears two times in a row ---");
  run2();
}

void run(DisjointSetBase disjointSet) {
  disjointSet.add(1);
  disjointSet.add(1);
  disjointSet.add(2);
  disjointSet.add(4);
  disjointSet.add(5);
  disjointSet.add(6);
  disjointSet.add(7);

  print("---current disjoint set---");
  disjointSet.show();

  print(disjointSet.findPartition(1)); // {1}
  print(disjointSet.findPartition(4)); // {4}

  print(disjointSet.areDisjoint(1, 4)); // true
  print(disjointSet.merge(1, 4)); // true
  print(disjointSet.areDisjoint(1, 4)); // false

  print("---current disjoint set---");
  disjointSet.show();
}

void run2() {
  final seed1 = DateTime.now().millisecond;
  final seed2 = DateTime.now().second;
  final seed3 = DateTime.now().microsecond;
  final random1 = Random(seed1);
  final random2 = Random(seed2);
  final random3 = Random(seed3);

  final numberOfItems = 20;
  final initialSet = HashMap<int, Tree>.fromIterable(
    List.generate(20, (index) => index),
    key: (element) => element,
    value: (element) => Tree(element),
  );
  final disjointSet = TreeDisJointSet(initialSet: initialSet);

  bool canMerge(List<int> lastValue, int item1, int item2) =>
      lastValue.contains(item1) &&
      lastValue.contains(item2) &&
      disjointSet.areDisjoint(item1, item2);

  List<int> lastValue = [];
  for (var i = 0; i < 300; i++) {
    final item1 = random1.nextInt(numberOfItems);
    final item2 = random2.nextInt(numberOfItems);
    final item3 = random3.nextInt(numberOfItems);

    if (canMerge(lastValue, item1, item2)) {
      disjointSet.merge(item1, item2);
    }
    if (canMerge(lastValue, item1, item3)) {
      disjointSet.merge(item1, item3);
    }
    if (canMerge(lastValue, item2, item2)) {
      disjointSet.merge(item2, item3);
    }

    lastValue = [item1, item2, item3];
    // print(lastValue);
  }

  disjointSet.show();
}
