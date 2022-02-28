import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Navigate, useNavigate } from 'react-router-dom'
import Avatar from '../components/AvatarSetting'

function AccountData({ session }) {
  let navigate = useNavigate();
  
  function signout() {
    supabase.auth.signOut()
    const sessioncheck = supabase.auth.session();
    if (!sessioncheck) {navigate("/login")} else { alert('Signout Failed...') }
  }
  
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [statustext, setStatustext] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [website, setWebsite] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, statustext, avatar_url, website`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setStatustext(data.statustext)
        setAvatarUrl(data.avatar_url)
        setWebsite(data.website)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, statustext, avatar_url, website }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        statustext,
        avatar_url,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, statustext, avatar_url: url, website })
        }}
      />
      </div>
      <div>
        <label htmlFor="email">Email (Use this email to login)</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username (should use Nickname)</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="statustext">StatusText(Bio)</label>
        <input
          id="statustext"
          type="text"
          value={statustext || ''}
          onChange={(e) => setStatustext(e.target.value)}
          rows="4"
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, statustext, avatar_url, website })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => signout()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default function Account() {
  // const location = useLocation();
  
  const session = supabase.auth.session();
  
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Navigate to="/login" state="/account" /> : <AccountData key={session.user.id} session={session} />}
    </div>
  )
}
