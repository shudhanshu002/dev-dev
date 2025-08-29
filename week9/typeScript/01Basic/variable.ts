let greetings: string = "Hello sir";  // variable declaration

console.log(greetings);


// number
let userId: number = 33456;

// boolean
let isLogged: boolean = false;

let hero: string; // here specify it ts will not type infer and hero will any datatype so specify to be on safe side

function getHero() {
    return "thor";
}

hero = getHero();

export {}