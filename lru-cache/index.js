/**
 * @param  {string} key
 * @param  {object} value
 * @param  {pointer} next=null
 * @param  {pointer} prev=null
 *  Cached object class
 */
class Node {
    constructor(key, value, next = null, prev = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}


class LRUCache {

    /**
     * @param  {number} maxKeys=100
     * Initialize cache store with key
     */
    constructor(maxKeys = 100) {
        this.maxKeys = maxKeys;
        this.head = null;
        this.tail = null;
        this.cacheStore = {};
        this.keyCount = 0;
    }


    /**
     * @param  {string} key
     * @param  {object} value
     * Add key:value to cache store
     */
    add(key, value) {
        this.checkLimit(); // Check current size of cache store first

        if (!this.head) {
            this.head = this.tail = new Node(key, value);
        } else {
            const node = new Node(key, value, this.head);
            this.head.prev = node;
            this.head = node;
        }
        this.cacheStore[key] = this.head;
        this.keyCount++;
    }
    /**
     * @param  {string} key
     */
    get(key) {
        if (this.cacheStore[key]) {
            const value = this.cacheStore[key].value;

            this.delete(key);
            this.add(key, value);
            console.log(`Cache hit Key =>${key}`);
            return value;
        }

        console.log(`Cache miss Key => ${key}`);
    }

    checkLimit() {
        if (this.keyCount === this.maxKeys) {
            this.delete(this.tail.key)
        }
    }
    /**
     * @param  {string} key
     * Deletes key from cache store and updates linked list
     */
    delete(key) {
        const node = this.cacheStore[key];

        if (node.prev !== null) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next !== null) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev
        }

        delete this.cacheStore[key];
        this.keyCount--;
    }

    reset() {
        this.head = null;
        this.tail = null;
        this.keyCount = 0;
        this.cacheStore = {};
    }

}

/*
Uncomment to test
let lruCache = new LRUCache(4);
lruCache.add('/1', { data: 'value of /1' });
lruCache.add('/2', { data: 'value of /2' });
lruCache.add('/3', { data: 'value of /3' });
lruCache.get('/4');
lruCache.get('/5');
console.log(lruCache.cacheStore);
*/