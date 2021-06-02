import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import Signin from './components/Signin';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      

      {loading?<p>loading...</p>:user ? <Home /> : <Signin />}

    </div>
  );
}

export default App;
