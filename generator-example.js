/**
 * We need to fetch 3 request by sequence. 
 */

var request1 = new Request('request1.jpg');


fetch(request1)
.then((response1) => {
	console.log('loaded request1 ' + response1);
	var request2 = new Request('request2.jpg');
	return fetch(request2);
})
.then((response2) => {
    console.log('loaded request2 ' + response2);
    var request3 = new Request('request3.jpg');
	return fetch(request3);
})
.then((response3) => {
	console.log('loaded request3 ' + response3);
})
.catch((err) => {
	console.log(err);
});

/**
 * use timeout to simulate 
 */
var doTask = function(taskNo) {
	return new Promise((resolve, reject) => {
		setTimeout((val) => {
			console.log('Task ' + val + ' done.');
			resolve();
		}, 3000, taskNo);
	});
};

var promise = doTask(1)
.then(() => doTask(2))
.then(() => doTask(3));


// var promise = new Promise((resolve, reject) => {
// 	doTask(resolve, 1)();
// }).then((val) => {
// 	console.log(val); 
// 	return new Promise((resolve, reject) => {
// 		doTask(resolve, 2)();
// 	});
// }).then((val) => {
// 	console.log(val); 
// 	return new Promise((resolve, reject) => {
// 		doTask(resolve, 3)();
// 	});
// }).then((val) => {
// 	console.log(val);
// });

/**
 * use generator to achieve above 
 */ 

var doTask2 = function(taskNo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Task ' + taskNo + ' done');
			resolve();
		}, 3000);
	});
};

var doTaskGenerator = function* () {
	yield doTask2(1); 
	yield doTask2(2); 
	yield doTask2(3);
	return 'all task done';
};

// execute the taskGenerator 
var doTaskGen = doTaskGenerator();
doTaskGen.next().value
.then(() => doTaskGen.next().value)
.then(() => doTaskGen.next().value)
.then(() => doTaskGen.next());
// or 
var doTaskGen = doTaskGenerator();
doTaskGen.next().value
.then(() => doTaskGen.next().value
	.then(() => doTaskGen.next().value));


// -> main logic need to control when to continue the doTaskGen

/**
 * use auto-runner 
 */
function run(generator) {
	var g =  generator();

	function next() {
		var res = g.next();
		if(res.done) return; 

		res.value.then(next);
	}

	next();
}

run(doTaskGenerator);

/**
 * auto runner with pass value in next 
 */
var doTask2 = function(taskNo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Task ' + taskNo + ' done');
			resolve(Math.floor(Math.random() * 10) + 1);
		}, 3000);
	});
};

var doTaskGenerator = function* (task1) {
	var task2 = yield doTask2(task1); 
	var task3 = yield doTask2(task2); 
	yield doTask2(task3);
	// backtick literals
	return `${task1}, ${task2}, ${task3} : all tasks done.`;
};

var g = doTaskGenerator(2);

g.next().value
.then((task) => {
	g.next(task).value
	.then((task) => {
		g.next(task).value
		.then(() => 
			console.log(g.next().value));
	})
});

function run(generator, initialTask) {
	var g = generator(initialTask);
	
	function next(taskNo) {
		var res = g.next(taskNo);
		if(res.done) {
			console.log(res.value);
			return;
		}

		res.value.then((v) => {
			next(v);
		});
	}

	next();
}