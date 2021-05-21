const myObj = {myProp: 42};

myObj.myProp = 17;

const container = myObj;

container.myProp = 33;

console.log('myObj.myProp: ', myObj.myProp);
// A: 42
// B: 17
// C: 33
// D: Error
// E: undefined

const myObj2 = {myProp: 42};

myObj2.myProp = 17;

function changeMyProp(theObj) {
  theObj.myProp = 33;
}

changeMyProp(myObj2);

console.log('myObj2.myProp: ', myObj2.myProp);
// A: 42
// B: 17
// C: 33
// D: Error
// E: undefined

const myObj3 = {myProp: 42};

myObj3.myProp = 17;

container3 = changeMyProp;

container3(myObj3);

console.log('myObj3.myProp: ', myObj3.myProp);
// A: 42
// B: 17
// C: 33
// D: Error
// E: undefined

const myObj4 = {myProp: 42};

myObj4.myProp = 17;

function hof(theFunction, arg) {
  theFunction(arg);
}

hof(changeMyProp, myObj4);

console.log('myObj4.myProp: ', myObj4.myProp);
// A: 42
// B: 17
// C: 33
// D: Error
// E: undefined

const myObj5 = {myProp: 42};

myObj5.myProp = 17;

myObj5.changeMyProp = () => { this.myProp = 33; };

myObj5.changeMyProp();

console.log('myObj5.myProp: ', myObj5.myProp);
// A: 42
// B: 17
// C: 33
// D: Error
// E: undefined

const myObj6 = {myProp: 42};

myObj6.myProp = 17;

myObj6.changeMyProp = function () {
  this.myProp = 33;
};

myObj6.changeMyProp();

console.log('myObj6.myProp: ', myObj6.myProp);
// A: 42
// B: 17
// C: 33
// D: Error
// E: undefined

function makeObj(val) {
  let _prop = val;
  const incProp = () => ++_prop;
  return {incProp};
}

const myObj7 = makeObj(42);

myObj7.incProp();

myObj7._prop = 17;

console.log('myObj7.myProp: ', myObj7.incProp());
// A: 42
// B: 44
// C: 17
// D: 18
// E: Error

const myObj8 = makeObj(42);
console.log('myObj8.myProp: ', myObj8.incProp(), ', myObj7.myProp: ', myObj7.incProp());
// A: myObj8.myProp: 43, myObj7.myProp: 45
// B: myObj8.myProp: 45, myObj7.myProp: 46
// C: Error
