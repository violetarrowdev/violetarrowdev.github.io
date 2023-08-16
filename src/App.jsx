// import logo from './logo.svg';
import './App.css';
import { Root, Personal, Projects, Banner, Backlogger, RedditFetcher, AboutMe, Picture } from './components/Exports';
import { Page } from './util/Pages'
import * as Constants from './util/Constants';
import { useState } from 'react';

// TODO: Convert this back to .tsx (requires some custom event class jank)

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
      case Page.Projects:
        return(<Projects />);
      case Page.Personal:
        return(<Personal />);
      case Page.Backlogger:
        return(<Backlogger />);
      case Page.RedditFetcher:
        return(<RedditFetcher />);
      case Page.AboutMe:
        return(<AboutMe />);
      case Page.Picture:
        return(<Picture />);
      default:
        console.error("Page selected not found.");
        return;
    }
  }
   
  return (
    <body>
      <div className="console">
        <header><Banner /></header>
        <div className="page">
          {pageSelector()}
        </div>
      </div>
    </body>
  );
}