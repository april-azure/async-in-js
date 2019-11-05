

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