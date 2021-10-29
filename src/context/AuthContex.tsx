import { createContext, ReactNode, useContext } from 'react'

type SignInCredentialsProps = {
    email: string;
    password: string
}

type AuthContextProps = {
    signIn(credentials: SignInCredentialsProps): Promise<void>
    isAuthenticated: boolean;
}


type ChildrenProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: ChildrenProps) => {

    const isAuthenticated = false;

    async function signIn({ email, password }: SignInCredentialsProps) {
        console.log({email, password})
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useSignIn = () => {
    return useContext(AuthContext)
}