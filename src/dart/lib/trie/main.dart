import 'package:dart/trie/trie.dart';

void main(List<String> args) {
  final trie = Trie();
  trie.insert("and");
  trie.insert("an");
  trie.insert("answer");
  trie.insert("ankle");
  trie.insert("android");

  print("---search---");
  print(trie.search("an") != null); // true
  print(trie.search("and") != null); // true
  print(trie.search("answer") != null); // true
  print(trie.search("ankle") != null); // true
  print(trie.search("android") != null); // true

  print("---longest prefix---");
  print(trie.longestPrefix("answering")); // answer
  print(trie.longestPrefix("android")); // android

  print("---remove---");
  print(trie.remove("android")); // true

  print(trie.longestPrefix("android")); // and
}
