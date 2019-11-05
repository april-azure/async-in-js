class BasicPromise {
  constructor(executor) {
    this.stats = 'Pending';
    this.msg = '';
    executor(()=> resolve, () => reject);
    return this;
  }

  resolve(value) {
    this.status = 'Fulfilled';
    this.msg = value;
  }

  reject(error) {
    this.status = 'Rejected';
    this.msg = error;
  }
}