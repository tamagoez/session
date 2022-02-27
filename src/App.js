import React,{ useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Toppage from './pages/toppage';

// https://zenn.dev/kenara/articles/3677b9a899cfb9
// https://reffect.co.jp/react/react-router-6
import NotFound from './components/404';
 
export default function App() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);
 
  render(){
   return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Toppage />} />
         <Route path="/login" element={<Login />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
     </BrowserRouter>
   );
 };
};
