typedef Element = int;

class Tree {
  Element root;
  int rank;
  Tree(this.root, {this.rank = 1});

  @override
  String toString() {
    return "{ root: $root, rank: $rank }";
  }
}
