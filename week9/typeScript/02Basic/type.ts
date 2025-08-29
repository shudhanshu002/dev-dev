type Use = {
    name: string
    email: string
    isActive: boolean
}

function createUser(user: Use):Use {
    return {name: "",email: "", isActive: true};
}

createUser({name: "", email: "",isActive:true});

type User = {
    readonly _id: string
    name: string
    email: string
    isActive: boolean
    creaditDetail?: number
}

let myUser: User = {
    _id: "111",
    name: "h",
    email: "sudha",
    isActive: true
    
}

type cardNumber = {
    cardNumber: string
}

type cardDate = {
    cardDate: string
}

type cardDetails = cardNumber & cardDate & {
    cvv: number
}

export {}