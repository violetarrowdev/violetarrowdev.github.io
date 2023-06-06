// import logo from './logo.svg';
import './App.css';
import Root from './components/Root';
import { Pages } from './components/PagesEnum'
import * as Events from './components/Events';
import { useState } from 'react';
import Projects from './components/Projects'
import Banner from './components/Banner';
// import { useEffect, useState } from 'react'

export function App() {

  const [page, setPage] = useState<Pages>(Pages.Root)

  var switchPage = () => {
    if (page === Pages.Root) {
      setPage(Pages.Projects);
    } else {
      setPage(Pages.Root)
    }
  }

  window.addEventListener(Events.consolesClearedEvent, switchPage)

  if (page === Pages.Root) {
    return (
      <body>
        <header><Banner /></header>
        <Root />
      </body>
    )
  } else {
    return ( 
      <body>
        <header><Banner /></header>
        <Projects />
      </body>
    )
  }
}