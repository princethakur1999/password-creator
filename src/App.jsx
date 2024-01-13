import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numbersPresent, setNumbersPresent] = useState(false);
  const [charactersPresent, setCharactersPresent] = useState(false);
  const [password, setPassword] = useState('');

  let passwordRef = useRef();


  function copyPassword() {

    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);

  }


  let passwordGenerate = useCallback(() => {

    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersPresent) {

      str += "123567890";
    }

    if (charactersPresent) {

      str += "@#%!_:;+-*/|?";
    }

    for (let i = 1; i <= length; i++) {

      let random = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(random);
    }

    setPassword(pass);

  }, [length, numbersPresent, charactersPresent, setPassword]);


  useEffect(() => {

    passwordGenerate();

  }, [length, numbersPresent, charactersPresent, setPassword]);


  return (

    <div className='app bg-rose-600 p-8 flex flex-col justify-evenly'>

      <h2 className='text-white font-bold text-2xl text-center mb-4'>Password Creator</h2>

      <div className='my-6 flex justify-center items-center'>
        <input
          className='bg-white text-black p-2 outline-none'
          type="text"
          readOnly
          value={password}
          ref={passwordRef}
        />

        <button className='bg-blue-900 text-white p-2' onClick={copyPassword}>
          Copy
        </button>
      </div>


      <div className='w-[100%] py-10 flex gap-2  justify-evenly md:justify-center flex-col md:flex-row'>

        <div className='flex gap-2 text-white flex-col md:flex-row'>
          <input type="range" id="length" max={20} value={length} onChange={(e) => setLength(e.target.value)} />
          <label htmlFor="length">Length  {length}</label>
        </div>

        <div className='flex gap-2 text-white'>
          <input type="checkbox" id='numbers' onChange={() => setNumbersPresent(prev => !prev)} />
          <label htmlFor="numbers">Numbers</label>
        </div>

        <div className='flex gap-2 text-white'>
          <input type="checkbox" id='characters' onChange={() => setCharactersPresent(prev => !prev)} />
          <label htmlFor="characters">Characters</label>
        </div>

      </div>

      <button onClick={passwordGenerate} className='bg-white w-[150px] mx-auto px-4 py-2 text-xl text-blue-600 font-bold rounded-full my-6 border-none hover:bg-blue-900 hover:text-white transition-all duration-75'>New</button>

    </div>
  )
}

export default App
