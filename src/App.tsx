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
          <Console fullText="testing!" useFlasher={false} />
        </p>
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
