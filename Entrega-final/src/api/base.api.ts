export abstract class BaseAPIs<T> {
    get(id?: string): Promise<T[] | undefined> {
        throw Error('Method not implemented');
    }
    post(data: T): Promise<T[]> {
        throw Error('Method not implemented');
    }
    put(data: T, id: string): Promise<T[] | undefined> {
        throw Error('Method not implemented');
    }
    delete(id: string): Promise<boolean | string | undefined> {
        throw Error('Method not implemented');
    }
}
