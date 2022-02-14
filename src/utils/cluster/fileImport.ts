let done = false;
let queue: any[] = [];
let pending: any[] = [];
export class Channel {
  constructor() {
    done = false;
    /** @type {T[]} */
    queue = [];
    /** @type {{resolve(value:IteratorResult<T, void>):void, reject(error:any):void}[]} */
    pending = [];
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  /**
   * @returns {Promise<IteratorResult<T, void>>}
   */
  async next() {
    // const { done, queue, pending }:any = this
    if (done) {
      return { done, value: undefined };
    } else if (queue.length > 0) {
      const value = queue[queue.length - 1];
      queue.pop();
      return { done, value };
    } else {
      return await new Promise((resolve, reject) => {
        pending.unshift({ resolve, reject });
      });
    }
  }

  /**
   * @param {T} value
   */
  send(value: any) {
    // const { done, pending, queue }:any = this
    if (done) {
      throw Error('Channel is closed');
    } else if (pending.length) {
      const promise = pending[pending.length - 1];
      pending.pop();
      promise.resolve({ done, value });
    } else {
      queue.unshift(value);
    }
  }

  /**
   * @param {Error|void} error
   */
  close(error: any) {
    if (done) {
      throw Error('Channel is already closed');
    } else {
      done = true;
      for (const promise of pending) {
        if (error) {
          promise.reject(error);
        } else {
          promise.resolve({ done: true, value: undefined });
        }
      }
      pending.length = 0;
    }
  }
}
