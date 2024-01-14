import 'dart:collection';

class TrieNode {
  bool isKeyNode = false;
  final HashMap<String, TrieNode> children = HashMap();
}
