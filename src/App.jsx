import './App.css'
import {useState} from "react";
import ProgramCode from "./components/ProgramCode.jsx";
import UnderTheHood from "./components/under-the-hood/UnderTheHood.jsx";
import {ingestProgram} from "./run.js";
import Console from "./components/under-the-hood/console/Console.jsx";
import Header from "./components/Header.jsx";

const program = `document.querySelector('#myButton')
.addEventListener('click', function one() {
    console.log('Clicked 1')
    Promise.resolve().then(() => {
        console.log('Microtask 1')
    })
})

document.querySelector('#myButton')
.addEventListener('click', function two() {
    console.log('Clicked 2')
    Promise.resolve().then(() => {
        console.log('Microtask 2')
    })
})

document.querySelector('#myButton').click()
`

function App() {
    const [code, setCode] = useState(program)

    function handleRun() {
        ingestProgram(code)
    }

    return <>
        <Header onRun={handleRun}/>
        <div className="wrapper">
            <div className="code-and-dom">
                <ProgramCode code={code} onChange={setCode}/>
                <Console/>
            </div>
            <UnderTheHood/>
        </div>
    </>
}

export default App

