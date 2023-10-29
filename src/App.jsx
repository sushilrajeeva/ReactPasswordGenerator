import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  //Initially I want my password length to be 8, this is the minimum length of the password
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charecterAllowed, setCharecterAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // useRef Hook
  const passwordRef = useRef(null)

  // Logic for my password generator

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let specialChars = "!@#$%^&*()_-+={}[]|:;<>,.?/~`";

    if(numberAllowed){
      console.log(`User has selected numbers: ${numberAllowed}`);
      str += nums
      console.log(str);
    }

    if(charecterAllowed){
      console.log(`User has selected charecters: ${charecterAllowed}`);
      str += specialChars
      console.log(str);
    }

    //Logic to get random Index
    for (let index = 0; index < length; index++) {
      
      // +1 to ignore the condition when random is 0 and floor to get int value
      const charIndex = Math.floor((Math.random() * str.length + 1))

      //Populating random char in pass
      pass += str.charAt(charIndex)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charecterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    // to give effect of highlighting selected test that has been copied
    passwordRef.current?.select()
    //copy to clipboard -> this is done using react as it directly gives us option to access window methods
    window.navigator.clipboard.writeText(password)
  }, [password])

  // using useEffect

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charecterAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>

        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input 
            type="text"
            value = {password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button 
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
              // copying the password to passwordRef using useRef hook
              onClick={copyPasswordToClipboard}
              >Copy</button>

        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range"
              min={8} 
              max={100}
              value={length}
              className='cursor-pointer'
              id='rangeInput'
              onChange={(event)=>{setLength(event.target.value)}} />
              <label htmlFor='rangeInput'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id = "numberInput"
              onChange={()=>{
                setNumberAllowed(prevState => !prevState)
              }} />
              <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">

            <input 
              type="checkbox" 
              id="charecterInput" 
              defaultChecked = {charecterAllowed}
              onChange={() => {
                setCharecterAllowed(prevState => !prevState)
              }}/>
              <label htmlFor="charecterInput">Charecters</label>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
