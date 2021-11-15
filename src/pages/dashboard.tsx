import { useEffect } from 'react'
import { useSignIn } from '../context/AuthContex'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {

    const {isAuthenticated, user} = useSignIn()

    useEffect(() => {
        api.get('/me').then(response => console.log(response))
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            {isAuthenticated && <p>Hello {user?.email}</p>}
        </>
    )
}

export const getServerSideProps = withSSRAuth( async (ctx) => {

    const apiClient = setupAPIClient(ctx)
    const response = await api.get('/me')
    console.log(response.data)

    return{
        props:{

        }
    }
})