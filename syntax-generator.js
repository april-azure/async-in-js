

var promise = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'ok');
});

promise.then((value) => {
  console.log(value);
});

// create a promise that resolve on even number and reject others

var promiseGenator = (num) => {
  return new Promise((resolve, reject) => {
    if(num % 2 == 0) {
      setTimeout(resolve, 1000, 'ok');
    } else {
      setTimeout(reject, 1000, 'not even number')
    }
  });
};

var pro1 = promiseGenator(1);
pro1.catch((error) => {
  console.log('promise rejected.');
  console.log(error);
}); 

var pro2 = promiseGenator(2);
pro2.then((value) => {
  console.log('promise resolved');
  console.log(value);
});


/**
 * arrow function 
 * 
 * (args...) => {
 *    return ;
 * }
 */

/**
* generator syntax
*/
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'goodbye';
}

var hwg = helloWorldGenerator(); 
console.log(hwg);

console.log(hwg.next());
// {value: "hello", done: false}

console.log(hwg.next());
// {value: "world", done: false}

console.log(hwg.next());
// {value: "goodbye", done: true}

console.log(hwg.next());
// {value: undefined, done: true}

function* sum() {
  yield 1000 + 2000;
}

/**
 * 
 * @param {number} max 
 */
function* fib(max) {
  var [pre, cur] = [0, 1];

  while(max) {
    yield cur; 
    [pre, cur] = [cur, pre+cur];
    max--;
  }
  return 'end';
}

/**
 * yield* example 
 */

function* gen() {
  yield 1; 
  for(v of gen2()) {
    yield v;
  }
  yield 5; 
  return 'end';
}

function* gen1() {
  yield 1; 
  yield* gen2();
  yield 5;
  return 'end';
}

function* gen2() {
  yield 2;
  yield 3;
  yield 4;
  return; 
}

/**
 * pass value in 'next' parameter 
 */
function* genWithNext(ini) {
  var x = yield (ini * 2);
  var y = yield (x * 4); 
  var z = yield (y * 8);
  return (x + y + z);
}

var g = genWithNext(1);
 
g.next();
// {value: 2, done: false}
 
g.next(); 
// {value: NaN, done: false}

g.next(2); 
// {value: 16, done: false}