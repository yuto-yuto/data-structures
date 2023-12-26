import 'package:dart/trie/trie_node.dart';

class Trie {
  TrieNode root = TrieNode.empty();

  TrieNode? search(String s) {
    if (s.isEmpty) {
      return null;
    }

    TrieNode result = root;
    for (int i = 0; i < s.length; i++) {
      final child = result.children[s[i].codeUnitAt(0)];
      if (child == null) {
        return null;
      }

      result = child;
    }

    return result;
  }

  void insert(String s) {
    if (s.isEmpty) {
      return;
    }

    TrieNode currentNode = root;
    for (int i = 0; i < s.length; i++) {
      final c = s[i];

      final child = currentNode.children[c.codeUnitAt(0)];
      if (child == null) {
        addNewBranch(s);

        return;
      }

      currentNode = child;
    }

    currentNode.isKeyNode = true;
  }

  void addNewBranch(String s) {
    if (s.isEmpty) {
      root.isKeyNode = true;

      return;
    }

    TrieNode currentNode = root;
    for (int i = 0; i < s.length; i++) {
      final newNode = TrieNode.empty();
      currentNode.children[s.codeUnitAt(i)] = newNode;
      currentNode = newNode;
    }

    currentNode.isKeyNode = true;
  }
}
