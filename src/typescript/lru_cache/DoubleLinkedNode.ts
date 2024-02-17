export class DoubleLinkedNode<T> {
    constructor(
        public key: string,
        public value: T,
        public previous: DoubleLinkedNode<T> | undefined = undefined,
        public next: DoubleLinkedNode<T> | undefined = undefined,
    ) { }
}
