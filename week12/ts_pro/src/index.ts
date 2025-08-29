interface User {
    name: string;
    age: number;
}

function sumOfAges(user1 : User , user2: User) {
    return user1.age+user2.age;
}

const result = sumOfAges({
    name: "ha",
    age: 23
}, {
    name: "rmaa",
    age: 34
});
console.log(result);