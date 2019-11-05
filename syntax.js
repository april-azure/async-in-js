
/**
 * promise syntax 
 */
var promise = new Promise(executor);

var promise = new Promise((resolve, reject) => {
  // .. some code

  if(/** if async operation succeed  */ condition ) {
    resolve(value);
  } else {
    reject(error);
  }
})


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