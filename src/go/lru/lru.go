package lru

type LRUCache struct{
	maxSize int
	hashTable map[string]any
	elements any
	elementsTail
}