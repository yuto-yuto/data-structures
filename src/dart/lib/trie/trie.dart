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

  /// remove doesn't remove the leaf node that was removed this function.
  bool remove(String s) {
    final foundNode = search(s);
    if (foundNode == null || !foundNode.isKeyNode) {
      return false;
    }

    foundNode.isKeyNode = false;
    return true;
  }

  bool prune(String s) {
    final (deleted, _) = _prune(root, s);

    return deleted;
  }

  (bool, bool) _prune(TrieNode node, String s) {
    if (s.isEmpty) {
      final deleted = node.isKeyNode;
      node.isKeyNode = false;

      return (deleted, node.children.isEmpty);
    }

    final child = node.children[s.codeUnitAt(0)];
    if (child != null) {
      final (deleted, shouldPrune) = _prune(child, s.substring(0));
      if (deleted && shouldPrune) {
        node.children[s.codeUnitAt(0)] = null;
        if (node.isKeyNode || node.children.isNotEmpty) {
          return (deleted, false);
        }
        return (false, false); // key not found
      }
    }

    return (false, false);
  }

  String? longestPrefix(String s) {
    return _longestPrefix(root, s, "");
  }

  String? _longestPrefix(TrieNode node, String s, prefix) {
    if (s.isEmpty) {
      if (node.isKeyNode) {
        return prefix;
      }

      return null; // key not found
    }

    final c = s.codeUnitAt(0);
    final child = node.children[c];
    if (child == null) {
      if (node.isKeyNode) {
        return prefix;
      }

      return null; // key not found
    }

    final result = _longestPrefix(child, s.substring(0), prefix + c);
    if (result != null) {
      return result;
    } else if (node.isKeyNode) {
      return prefix;
    }

    return null; // key not found
  }
}
