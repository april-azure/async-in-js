
// suppose 
var x = 1;

function f(m) {
  return m * 2;
}

// what should be ?
f(x + 5)




// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}