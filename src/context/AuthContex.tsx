import { createContext, ReactNode, useContext, useState } from 'react'
import { api } from '../services/api'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentialsProps = {
    email: string;
    password: string
}

type AuthContextProps = {
    signIn(credentials: SignInCredentialsProps): Promise<void>
    isAuthenticated: boolean;
    user: User;
}


type ChildrenProps = {
    children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: ChildrenProps) => {

    const [user, setUser] = useState<User>()

    const router = useRouter()

    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInCredentialsProps) {
        try {
            const response = await api.post('/sessions', {
                email,
                password
            })

            const { token, refreshToken, permissions, roles } = response.data

            setUser({
                email,
                permissions,
                roles
            })

            setCookie(undefined, 'nextauth-token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })
            setCookie(undefined, 'nextauth-refreshtoken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            router.push('/dashboard')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useSignIn = () => {
    return useContext(AuthContext)
}