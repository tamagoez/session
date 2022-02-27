import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Toppage from './pages/toppage';
import Signup from './pages/signup';
import Account from './pages/Account'

// https://zenn.dev/kenara/articles/3677b9a899cfb9
// https://reffect.co.jp/react/react-router-6
import NotFound from './components/404'
 
class App extends React.Component {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  if (!session) {
   render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Toppage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />;
        </Routes>
      </BrowserRouter>
    );
   };
  } else {
   render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Account key={session.user.id} session={session} />} />
          <Route path="/login" element={<Account key={session.user.id} session={session} />} />
          <Route path="/signup" element={<Account key={session.user.id} session={session} />} />
          <Route path="*" element={<NotFound />} />;
        </Routes>
      </BrowserRouter>
    );
   };
 };
}

export default App;
