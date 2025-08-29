interface User12 {
    readonly dbId: number
    email: string
    userId: number
    googleId?: string
    startTrail: () => string        
}

const dt: User12 = {dbId: 22, email:"fsds",userId:33,
    startTrail: () => {
        return "trail st"
    }
};
