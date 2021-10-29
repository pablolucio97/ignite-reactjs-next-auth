import { useSignIn } from '../context/AuthContex'

export default function Dashboard() {

    const {isAuthenticated, user} = useSignIn()

    return (
        <>
            <h1>Dashboard</h1>
            {isAuthenticated && <p>Hello {user?.email}</p>}
        </>
    )
}