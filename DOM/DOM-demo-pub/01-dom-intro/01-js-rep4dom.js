// *** Important JS Basics for DOM Handling ***

// **
// ** Variables can hold objects
// **
const demoObj = {name: 'theDemoObj', hidden: false};

// **
// ** Object properties can be queried
// **
console.log('name of demoObj is: ', demoObj.name); // output: "name of demoObj is:  theDemoObj"
console.log('demoObj: ', demoObj); // output: "demoObj:  { name: 'theDemoObj', hidden: false }"

// **
// ** Object properties can be changed
// **
demoObj.hidden = true;
console.log('demoObj: ', demoObj); // output: "demoObj:  { name: 'theDemoObj', hidden: true }"

// **
// ** Variables to non-primitive values are "just" references
// ** Different variables can reference the same object
// **
const anotherVarReferencingDemoObject = demoObj;
console.log('anotherVarReferencingDemoObject: ', anotherVarReferencingDemoObject);
/// output: "anotherVarReferencingDemoObject:  { name: 'theDemoObj', hidden: true }"

// **
// ** Functions are 'first class citizens'
// ** i.e. functions are runnable objects stored in variables
// **
function demoFn1() {
  console.log('executed demoFn1');
}

console.log(demoFn1.name); // output: "demoFn1"
demoFn1(); // output: "executed demoFn1"

const anotherVariablePointingTodDemoFn1 = demoFn1;
anotherVariablePointingTodDemoFn1();
// round brackets after a variable indicate that the function
// pointed to in the variable should be executed
// output: "executed demoFn1"

const myNotAFunctionDemoVar = 'hello';
/// next line will cause an error if uncommented
//myNotAFunctionDemoVar(); // Error TypeError: myNotAFunctionDemoVar is not a function

/// Arrow function syntax: Also arrow functions get a name assigned on initial definition
const demoFn2 = () => console.log('executed demoFn2');
console.log(demoFn2.name); //output: "demoFn2"
demoFn2(); // output: executed demoFn2

// **
// ** Higher order functions (HOF) take one or more functions as parameters
// **
function demoHOF(fnToCall) {
  console.log('started execution demoHOF');
  fnToCall();
  console.log('finished execution demoHOF');
}

demoHOF(demoFn1); // output: "started ..." /n "executed demoFn1" /n "finished ..."

// **
// ** Objects can hold functions as values of properties (methods)
// ** These can then be called as methods <obj>.method
// **
const reactiveObject1 = {doIt: () => console.log('doing it 1')};
reactiveObject1.doIt(); // output: "doing it 1"

const reactiveObject2 = {doIt: function() { this.handler && this.handler();}};
console.log('CHECKPOINT 1a');
reactiveObject2.doIt(); // no output because this.handler === undefined
console.log('CHECKPOINT 1b');

reactiveObject2.handler = () => {console.log('handling it 2');};
reactiveObject2.doIt(); // output: "handling it 2"

// **
// ** Functions (methods) using "this" (context) to reference
// ** the object called ("object before the dot")
// ** must not be arrow functions
// **
const reactiveObject2b = {doIt: () => this.handler && this.handler()};
reactiveObject2b.handler = () => {console.log('handling it 2b');};
console.log('CHECKPOINT 2a');
reactiveObject2b.doIt(); // no output because this.handler === undefined (this = global object)
console.log('CHECKPOINT 2b');

// **
// ** Functions (including handler functions) can be closures.
// ** Closures reference variables from their "birth environment".
// ** These variables are kept alive together with the referencing closures.
// **
function setHandler(rObj, message, step = 1) {
  let counter = 0;
  rObj.handler = () => {
    counter += step;
    console.log('CLOSURE:', counter, message);
  };
}

setHandler(reactiveObject2, 'handling it 2a');

reactiveObject2.doIt(); // output: "CLOSURE: 1 handling it 2a"
reactiveObject2.doIt(); // output: "CLOSURE: 2 handling it 2a"

// **
// ** Closure-functions created by the same enclosing function
// ** are independent of each other (do not share closure-variables)
// ** Closure variables also include arguments to enclosing functions
// **
const reactiveObject2c = {doIt: function() { this.handler && this.handler();}};
setHandler(reactiveObject2c, 'handling it 2cccc', 10);
reactiveObject2c.doIt(); // output: "CLOSURE: 10 handling it 2cccc"
reactiveObject2c.doIt(); // output: "CLOSURE: 20 handling it 2cccc"

reactiveObject2.doIt(); // output: "CLOSURE: 3 handling it 2a"

// **
// ** Factory functions can create objects
// **
function createReactiveObject(name) {
  return {
    name,
    handlers: [],
    addHandler: function(handler) {this.handlers.push(handler);},
    doIt: function() {
      for (const handler of this.handlers) {
        handler();
      }
    },
  };
}

const reactiveObject3 = createReactiveObject('rObj3');
reactiveObject3.addHandler(() => console.log('handler3.1'));
reactiveObject3.addHandler(() => console.log('handler3.2'));
reactiveObject3.doIt(); //output: "handler3.1" /n "handler3.2"

// **
// ** Constructor functions used to be the standard way to create objects in JS
// ** Constructor functions are capitalized and must be called with new
// **
function ReactiveObject(name) {
  this.name = name;
  this.handlers = [];
  this.addHandler = function(handler) {this.handlers.push(handler);};
  this.doIt = function() {
    for (const handler of this.handlers) {
      handler();
    }
  };
}

const reactiveObject4 = new ReactiveObject('rObj4');
console.log(typeof reactiveObject4); // output: object
console.log(reactiveObject4.constructor.name); // output: ReactiveObject
console.log(reactiveObject4 instanceof ReactiveObject); // output: true
reactiveObject4.addHandler(() => console.log('handler4.1'));
reactiveObject4.addHandler(() => console.log('handler4.2'));
reactiveObject4.doIt(); //output: "handler4.1" /n "handler4.2"

// **
// ** ES6 introduced the class construct as the new way for creating new objects in JS
// **
class Reactor {
  name;
  handlers = [];

  constructor(name) {
    this.name = name;
  }

  addHandler(handler) {this.handlers.push(handler);};

  doIt() {
    for (const handler of this.handlers) {
      handler();
    }
  };
}

const reactorObj1 = new Reactor('reactor1');
console.log(typeof reactorObj1); // output: object
console.log(reactorObj1.constructor.name); // output: Reactor
console.log(reactorObj1 instanceof Reactor); // output: true
console.log(reactorObj1); // output: Reactor { name: 'reactor1', handlers: [] }
reactorObj1.addHandler(() => console.log('handler5.1'));
reactorObj1.addHandler(() => console.log('handler5.2'));
reactorObj1.doIt(); //output: "handler5.1" /n "handler5.2"

// **
// ** setTimeout schedules a function for future execution
// ** Execution can start only after main tread is idle
// **
console.log('CHECKPOINT 3a');
setTimeout(() => reactorObj1.doIt(), 1000); // Output (later): "handler5.1" /n "handler5.2"
console.log('CHECKPOINT 3b');

/// Attention: setTimeout first argument must be a function (not a method relying on 'this')
/// The following block generates an error when uncommented
//  TypeError: this.handlers is not iterable
//
// setTimeout(() => console.log('CHECKPOINT 4a'), 1000);
// setTimeout(reactorObj1.doIt, 1000); // error because this.handler === undefined => not iterable
// setTimeout(() => console.log('CHECKPOINT 4b'), 1000);

// Attention: The following block will cause an error
// as reactorObj1.doIt() evaluates to undefined
// which is then scheduled for execution
// Error: Callback must be a function. Received undefined
//
// console.log('CHECKPOINT 5a');
// setTimeout(reactorObj1.doIt(), 1000);
// console.log('CHECKPOINT 5b');

// **
// ** ES6 class definitions support definition of setters (and getters)
// ** Created objects can react to setting (and getting) of values
// **
class ReactiveElement {
  name;
  _hidden = false;
  handlers = [];

  constructor(name) {
    this.name = name;
  }

  set hidden(shouldBeHidden) {
    this._hidden = shouldBeHidden;
    console.log(`Element ${this.name} is now ${(this._hidden) ? 'hidden' : 'visible'}`);
  }

  addHandler(handler) {this.handlers.push(handler);};

  doIt() {
    for (const handler of this.handlers) {
      handler();
    }
  };
}

const rElement = new ReactiveElement('BUTTON');

rElement.addHandler(() => console.log('you clicked me'));
rElement.doIt(); // output: you clicked me

rElement.hidden = true;  // output: Element BUTTON is now hidden
rElement.hidden = false; // output: Element BUTTON is now visible
