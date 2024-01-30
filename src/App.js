import { useCallback, useEffect, useRef, useState } from "react";

function App() {

  let [length, setLength] = useState(6);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);

  })

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="main">

      <div className="container">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <input
          className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          value={password}
          readOnly
          placeholder="Password"
          id="name"
          ref={passwordRef}
        ></input>
        <button className="btn-grad"
          onClick={copyPasswordToClipboard}
        >Copy</button>
        <div className="btn-div btn-grad">
          <input type="range" min={6} max={25} id="length"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length:{length}</label>
          <input type="checkbox" id="numbers"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numbers">Numbers</label>
          <input type="checkbox" id="specialChar"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="specialChar">Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;