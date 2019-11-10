
// suppose 
var x = 1;

function f(m) {
  return m * 2;
}

// what should be ?
f(x + 5)

// call by sharing example 
var modify1 = function(arr) {
	arr.push(1);
}

var modify2 = function(arr) {
	arr = [1];
}

var arr1 = [];
var arr2 = [];

modify1(arr1);
// [1]
modify2(arr2);
// []

// NOTE: 
// js is call by sharing
// caller provide callee the 'access to the object', not the reference itself. 
// so, reference reassignment will not work, but object modification is ok. 



// simple thunk 
var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}



/**
 * simple thunk example with promise 
 */
var doTaskThunk = function(taskNo) {
	return function(callback) {
		return new Promise((resolve, reject) => {
			setTimeout((val) => {
				console.log('Task ' + val + ' done.');
				resolve();
			}, 3000, taskNo);
		}).then(callback);	
	}
};

doTaskThunk(1)(function(){
	doTaskThunk(2)(function(){
		doTaskThunk(3)(null);
	})
})



// thunk with generator 
var doTask2Thunk = function(taskNo) {
	return function(callback) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('Task ' + taskNo + ' done');
				resolve();
			}, 3000);
		}).then(callback);		
	}
};

var doTaskGenerator = function* () {
	yield doTask2Thunk(1); 
	yield doTask2Thunk(2); 
	yield doTask2Thunk(3);
	return 'all task done';
};

// execute the taskGenerator 
var doTaskGen = doTaskGenerator();
doTaskGen.next().value(function(){
	doTaskGen.next().value(function() {
		doTaskGen.next().value(null);
	})
});


// to make it run by itself we would like to have something like 
// however, it cannot guarantee that the steps before are finished. 
// var g = doTaskGenerator(); 
// var res = g.next();
// while(!res.done) {
// 	console.log(res);
// 	var res = g.next(); 
// }



// generator runner example
function run(generator) {
	
	let g = generator(); 

	function next() {
		var res = g.next(); 
		if(res.done) return;

		res.value(next);
	} 

	next(); 
}

run(doTaskGenerator);


