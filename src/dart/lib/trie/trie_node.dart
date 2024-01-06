import 'dart:collection';

const alphabets = ["abcdefghijklmnopqrstuvwxyz"];

class TrieNode {
  bool isKeyNode;
  final HashMap<String, TrieNode?> children = HashMap();

  // TrieNode._(String key, int charIndex) : isKeyNode = charIndex >= key.length {
  //   if (charIndex < key.length) {
  //     final char = key.codeUnitAt(charIndex);
  //     children[char] = TrieNode._(key, charIndex + 1);
  //   }
  // }

  // TrieNode.withKey(String key) {
  //   TrieNode._(key, 0);
  // }

  TrieNode.empty() : isKeyNode = false;

  TrieNode? findNode(String key) {
    return _findNode(key, 0);
  }

  TrieNode? _findNode(String key, int charIndex) {
    if (charIndex > key.length) {
      return null;
    }

    if (charIndex == key.length) {
      return this;
    }

    final char = key.codeUnitAt(charIndex);
    if (children.containsKey(char)) {
      return children[char]!._findNode(key, charIndex + 1);
    }

    return null;
  }
}
