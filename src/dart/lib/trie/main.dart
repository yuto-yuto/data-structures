import 'package:dart/trie/trie.dart';

String check(Trie trie, String str) {
  final node = trie.search(str);

  if (node == null) {
    return "node not found";
  }

  return node.isKeyNode ? "Key node" : "not a key node";
}

void main(List<String> args) {
  final trie = Trie();
  trie.insert("and");
  trie.insert("an");
  trie.insert("answer");
  trie.insert("ankle");
  trie.insert("android");
  trie.insert("an and");

  print("---search---");
  print(check(trie, "an")); // Key node
  print(check(trie, "and")); // Key node
  print(check(trie, "answer")); // Key node
  print(check(trie, "ankle")); // Key node
  print(check(trie, "android")); // Key node
  print(check(trie, "a")); // not a key node

  print("---longest prefix---");
  print(trie.longestPrefix("answering")); // answer
  print(trie.longestPrefix("android")); // android

  print("---startWith---");
  print(trie.startWith("and")); // [and, android]
  print(trie.startWith("unknown")); // []

  print("---remove---");
  print(trie.prune("android")); // true
  print(trie.remove("unknown_word")); // false

  print(trie.longestPrefix("android")); // and
}
