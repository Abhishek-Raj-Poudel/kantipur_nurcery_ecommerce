import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { app } from '../../firebase.config';

export default function index() {
  let auth = getAuth(app);
  let googleProvider = new GoogleAuthProvider();
  const [data, setData] = useState({ email: '', password: '' });

  const handleInput = (e: any) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };
  const handleUserCreation = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleUserSignIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleUserSignInWithGoogle = (e: any) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="bg-slate-300 w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-6">Admin</h1>
      <form action="submit" className="flex flex-col gap-4 w-full items-center">
        <div className="flex flex-col gap-2 w-full items-center">
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => handleInput(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <button onClick={(e) => handleUserCreation(e)}>Sign In</button>
        <h2 className="text-slate-800">Or</h2>
        <button onClick={(e) => handleUserSignIn(e)}>Sign In</button>
      </form>
      <h2 className="mt-4 text-slate-800">You can also use</h2>
      <button
        className="mt-4 w-fit"
        onClick={(e) => handleUserSignInWithGoogle(e)}
      >
        Google
      </button>
    </div>
  );
}
