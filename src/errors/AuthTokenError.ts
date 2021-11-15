export class AuthTokenAError extends Error{
    constructor(){
        super('Error with authentication token')
    }
}