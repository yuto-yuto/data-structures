import 'package:dart/trie/trie.dart';

void main(List<String> args) {
  final trie = Trie();
  trie.insert("and");
  trie.insert("an");

  print(trie.search("an"));
  print(trie.search("and"));
}
