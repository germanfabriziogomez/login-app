interface iUserSchema {
    name: string,
    lastname:string,
    email:string,
    password:string,
    recoveryToken?:string
}

export {iUserSchema}