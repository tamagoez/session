import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Navigate, useNavigate } from 'react-router-dom'

function MainApp({ session }) {
  const user = supabase.auth.user();
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    getUsername()
  }, [session])
  
  async function getUsername() {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

        if (error && status !== 406) {
          throw error
        }
      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      console.log('loaded')
    }
  }
  
  
  return (
    <div>
      <div>
        <h2>Hello, {username}!</h2>
         <button
            className="button block"
            onClick={() => navigate('/account')}
          >Account Settings</button>
      </div>
      <div>
        <p className="description">This service is now on making!<br />Please pardon me that release is late.</p>
      </div>
    </div>
  )
  
}



export default function Dashboard() {
  const session = supabase.auth.session();
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Navigate to="/login" state="/dashboard" /> : <MainApp key={session.user.id} session={session} />}
    </div>
  )
}
