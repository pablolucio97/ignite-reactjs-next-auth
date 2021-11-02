import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/apiClient'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

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

export function signOut() {
    destroyCookie(undefined, "nextauth.token");
    destroyCookie(undefined, "nextauth.refreshToken");
    Router.push('/')
}

export const AuthProvider = ({ children }: ChildrenProps) => {

    

    useEffect(() => {

        const { 'nextauth.token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { permissions, roles, email } = response.data

                setUser({ email, roles, permissions })

            }).catch(() => {
                destroyCookie(undefined, 'nextauth.token')
                destroyCookie(undefined, 'nextauth.refreshToken')
            })

            Router.push('/')
        }

    }, [])

    const [user, setUser] = useState<User>()


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

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })
            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            Router.push('/dashboard')

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