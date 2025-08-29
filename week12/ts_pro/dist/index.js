"use strict";
function sumOfAges(user1, user2) {
    return user1.age + user2.age;
}
const result = sumOfAges({
    name: "ha",
    age: 23
}, {
    name: "rmaa",
    age: 34
});
console.log(result);
