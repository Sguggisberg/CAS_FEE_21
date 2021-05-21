const someText = "some text";
const aNumber = 42.42;
const simpleTemplateLiteral = `a simple Template Literal can include ${someText} as placeholder expression`;
const multiLineTemplateLiteral = `a multi-line Template Literal 
can span multiple lines an can include placeholder expressions such as ${someText + aNumber}`;

function interpolate(strings, placeholders = [], stringOperation = (string) => string) {
  return (
    strings
      .slice(0, -1)
      .map((string, index) => stringOperation(string) + stringOperation(String(placeholders[index])))
      .join("") + stringOperation(strings[strings.length - 1])
  );
}
function upp(strings, ...placeholders) {
  return interpolate(strings, placeholders, (string) => string.toUpperCase());
}

// console.log(interpolate(["hello"]));
// console.log(interpolate(["hello ", " world"], ["nice"]));
// console.log(upp(["hello"]));
// console.log(upp(["hello ", " world"], "someText"));

console.log(upp(["hello world"]));
console.log(upp`hello world ${someText} hello`);
console.log(upp`hello world ${someText} and the number ${aNumber} hello`);
console.log(upp`hello world ${someText + aNumber} hello`);
