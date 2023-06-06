// import logo from './logo.svg';
import './App.css';
import { Root, License, Personal, Projects, Banner } from './components/Exports';
import { Page } from './util/Pages'
import * as Constants from './util/Constants';
import { useState } from 'react';

export function App() {

  const [activePage, setActivePage] = useState(Page.Root);
  const [nextPage, setNextPage] = useState(Page.Root);

  var switchPage = () => {
    setActivePage(nextPage);
  }

  var prepareTransition = (ev) => {
    setNextPage(ev.detail.nextPage);
  }

  window.addEventListener(Constants.consolesClearedEvent, switchPage)
  window.addEventListener(Constants.pageTransitionEvent, prepareTransition)

  var pageSelector = () => {
    switch(activePage) {
      case Page.Root:
        return(<Root />);
      case Page.License:
        return(<License />);
      case Page.Projects:
        return(<Projects />);
      case Page.Personal:
        return(<Personal />);
      default:
        console.error("Page selected not found.");
        return;
    }
  }
   
  return (
    <body>
      <header><Banner /></header>
      {pageSelector()}
    </body>
  );
}