import { LRUCache } from "./LruCache";

function run() {
    const cache = new LRUCache(5)

    cache.set("one", 1)
    cache.set("two", 2)
    cache.set("three", 3)
    cache.showCaches()
    // --------------------------------
    // prev: N/A            self: (three, 3)
    // prev: (three, 3)     self: (two, 2)
    // prev: (two, 2)       self: (one, 1)

    cache.set("one", 11)
    cache.set("four", 4)
    cache.set("five", 5)
    cache.showCaches()
    // --------------------------------
    // prev: N/A            self: (five, 5)
    // prev: (five, 5)      self: (four, 4)
    // prev: (four, 4)      self: (one, 1)
    // prev: (one, 11)      self: (three, 3)
    // prev: (three, 3)     self: (two, 2)

    console.log(cache.get("three"))   // 3
    console.log(cache.get("two"))     // 2
    console.log(cache.get("unknown")) // undefined
}

run();