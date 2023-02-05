const list = ["Hello", "world", "!"];
const sublist = ["world", "!"];

if (sublist.every(substring => list.includes(substring))) {
  console.log("The list contains the sublist");
} else {
  console.log("The list does not contain the sublist");
}
