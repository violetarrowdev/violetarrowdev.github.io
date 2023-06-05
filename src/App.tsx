// import logo from './logo.svg';
import './App.css';
import Console from './components/Console'
// import { useEffect, useState } from 'react'

function App() {

  return (
    <div>
      <header><Banner /></header>
      <body>
        <p>
          <Console fullText="Select a file or directory to proceed:" />
        </p>
        <ul>
          <li><Console fullText="> projects/" /></li>
          <li><Console fullText="> personal/" /></li>
          <li><Console fullText="> misc/" /></li>
          <li><Console fullText="> license.txt" /></li>
        </ul>
      </body>
    </div>
  );
}

function Banner() {
  return (
    <div className="banner">
      <h1>&gt; <Console fullText="VIOLET ARROW" useFlasher={true} /></h1>
    </div>
  )
}

export default App;
