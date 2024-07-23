import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
	const passwordRef=useRef();
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&*+-{}";

		for (let i = 0; i < length; i++) {
			let charIndex = Math.floor(Math.random() * str.length);
			pass += str.charAt(charIndex);
		}
		setPassword(pass);
	}, [length, numberAllowed, charAllowed]);
	const copyPasswordToClipboard=useCallback(()=>{
		passwordRef.current?.select()
		passwordRef.current?.setSelectionRange(0,9)

		window.navigator.clipboard.writeText(password)

		
	},[password])

	// passwordGenerator()
	useEffect (()=>{
		passwordGenerator()
 
	},[length,numberAllowed,charAllowed,passwordGenerator])

	return (
		<>
			<div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-500'>
				<h1 className='text-white text-center text-2xl mb-4 my-3'>
					Password Generator
				</h1>
				<div className='flex shadow rounded-lg overflow-hidden mb-8'>
					<input
						type='text'
						value={password}
						className='outline-none w-full py-2 px-4 text-gray-700'
						placeholder='Password'
						readOnly
						ref={passwordRef}
						
					/>
					<button 
					onClick={copyPasswordToClipboard}
					className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
						Copy
					</button>
				</div>
				<div className='flex text-sm gap-x-2'>
					<div className='flex items-center gap-x-1'>
						<input
							type='range'
							min={6}
							max={100}
							value={length}
							className='cursor-pointer'
							onChange={(e) => {
								setLength(e.target.value);
							}}
						/>
						<label>Length: {length}</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={numberAllowed}
							id='numberInput'
							onChange={() => {
							    setNumberAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor='numberInput'>Numbers</label>
					</div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
				</div>
			</div>
		</>
	);
}

export default App;
