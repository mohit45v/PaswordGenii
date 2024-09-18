import { useCallback, useEffect, useState, useRef } from 'react'



function App() {
  const [password, setPassword] = useState(" ");
  const [length, setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [charecter, setCharecter] = useState(false);

  const passwordgernrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (charecter) str += "!@#$%^&*(){}[]~`"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [setPassword, length, number, charecter])

  //useEffect use

  useEffect(() => { passwordgernrator() }, [setCharecter, setNumber, setLength, passwordgernrator])


  //useREF use

  const passref = useRef(null)
  const copyPasstoCB = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passref.current?.select()
    //for range selection
    passref.current?.setSelectionRange(0,99)

  }, [password])




  return (
    <>
      <div className='w-full  max-w-md  mx-auto shadow-md  rounded-lg px-4 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'  >Password Generator</h1>
        <div className='flex shadow rounded-xl overflow-hidden mb'>
          <input type="text"
            placeholder='Password'
            value={password}

            readOnly
            ref={passref}
            className='outline-none w-full py-1 px-3'
          />
          <button className='bg-blue-500 text-white mx-2 rounded-lg p-2 shrink-0' onClick={copyPasstoCB}>Copy</button>
        </div>
        <div className='flex test-sm gap-x-2'>
          <div className='flex  items-center gap-x-1'>
            <input type="range" defaultValue={0}
              min={0}
              max={16}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label >Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={setNumber}
              id='inputnumber'
              onChange={() => { setNumber((prev) => !prev) }}
            />
            <label htmlFor="">Number: </label>
            <input type="checkbox"
              defaultChecked={setCharecter}
              id='inputcharecter'
              onChange={() => { setCharecter((prev) => !prev) }}
            />
            <label htmlFor="">Charecter: </label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
