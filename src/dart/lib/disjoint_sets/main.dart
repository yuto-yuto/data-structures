import 'package:dart/disjoint_sets/disjoint_set.dart';
import 'package:dart/disjoint_sets/disjoint_set_base.dart';
import 'package:dart/disjoint_sets/tree_disjoint_set.dart';

void main(List<String> args) {
  print("---- Normal Disjoint Set ----");
  final disjointSet = DisjointSet();
  run(disjointSet);

  print("");
  print("---- Tree Disjoint Set ----");
  final treeDisjointSet = TreeDisJointSet();
  run(treeDisjointSet);
  final p = treeDisjointSet.findPartition(1);
  print(p.root);
  print(p.root);
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
