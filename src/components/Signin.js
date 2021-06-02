import React, { useEffect, useRef } from 'react'
import { auth } from '../firebase';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import './Signin.css'
const Signin = () => {
    useEffect(() => {
        
        return null;
    }, [])
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth, '', '');
    const signUp = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    }
    const signIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <div className="signin">
            <form action="">
                <h1>Sign in</h1>
                <input ref={emailRef} type="email" />
                <input ref={passwordRef} type="password" />
                <button onClick={signIn}>Sign in </button>
                <h6>Not yet register? <span onClick={signUp} className="signin__link">Sign up</span></h6>
            </form>
        </div>
    )
}

export default Signin
