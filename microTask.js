

setTimeout(()=> {
  console.log(1);
}, 0);

new Promise((resolve, reject) => {
 resolve();
 console.log(2); 
}).then(() => {
  console.log(3);
})

console.log(4);