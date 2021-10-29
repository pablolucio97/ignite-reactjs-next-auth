import { FormEvent, useState } from 'react'
import styles from '../styles/home.module.scss'
import {useSignIn} from '../context/AuthContex'

export default function Home() {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const {signIn} = useSignIn()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newUser = {
      email,
      password
    }

    signIn(newUser)

  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <input
        placeholder="email"
        type="email"
        className={styles.input}
        value={email}
        onChange={(e) => { setEmail(e.target.value) }}
      />
      <input
        placeholder="password"
        type="password"
        className={styles.input}
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
      />
      <button
        className={styles.registerButton}
        type="submit">Register</button
      >
    </form>
  )
}
