function addTwo(num: number) {
    return num + 2
}

addTwo(78);

function getUpper(val: string) {
    return val.toUpperCase();
}

getUpper("sudh");

function signUpUser(name: string,email: string,isPaid: boolean) {}

let loginUser = (name: string, email: string, isPaid: boolean = false) => {}


const getHello = (s:string):string => {
    return ""
}

const heros = ["thoe", "spiderman", "ironman"];

heros.map((hero):string=> {
    return "";
})


function greet(name ?: string): void {
    if(name) {
        console.log("hello, "+name);
    } else {
        console.log("hello, stranger");
    }
}

greet();
greet("Sudhanshu");

export {}