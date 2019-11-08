var doTask2 = function(taskNo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Task ' + taskNo + ' done');
			resolve();
		}, 3000);
	});
};

var doTaskGenerator = async function () {
	await doTask2(1); 
	await doTask2(2); 
	await doTask2(3);
	return 'all task done';
};

// execute  
var doTaskGen = doTaskGenerator();



