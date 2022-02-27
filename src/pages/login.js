import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function login() {
  const [loading, setLoading] = useState(false)
  const [acid, setAcid, password, setPassword] = useState('')

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in with your email or ID</p>
        <div>
          <input
            className="inputField"
            type="text"
            placeholder="Your mail or ID"
            value={acid}
            onChange={(e) => setAcid(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(acid, password)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Login</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
