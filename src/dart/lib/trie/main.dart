import 'package:dart/trie/trie.dart';

void main(List<String> args) {
  final trie = Trie();
  trie.insert("and");
  trie.insert("an");
  trie.insert("answer");
  trie.insert("ankle");
  trie.insert("android");

  print("---search---");
  print(trie.search("an") != null);
  print(trie.search("and") != null);

  print("---longest prefix---");
  print(trie.longestPrefix("answer"));
  print(trie.longestPrefix("android"));

  print("---remove---");
  print(trie.remove("android"));
  print(trie.longestPrefix("android"));
}
