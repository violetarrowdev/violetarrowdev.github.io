import { changePage, Page } from '../util/Pages';
import { Console } from './Exports';

export default function Backlogger() {
    return (
        <div>
            <p><Console textInterval={10} swipeInterval={2} fullText="designed as a skeletal backend for an android app i've been working on, i used this API as an excuse to try my hand at working with golang. 
            backlogger (working title) is a way of organizing your backlog for movies, shows, anime, games, books, comics, and any other kind of media you can think of, 
            all in one place, with plenty of organizational tools to make it easy to find your next thing to get through. the compartmentalization of backlog tracking apps 
            by medium has always driven me insane, so i figured it'd be worth it to start working on a better alternative!" /></p>
            <p><Console textInterval={10} swipeInterval={2} fullText="while the app itself is still pretty early in development (i've never worked on an android app before so i'm learning from scratch), the API, 
            while barebones, sketches out a general outline of the structure of the app. each media entry can be input manually or, potentially, autofilled via 
            whatever free database API is available for that medium based on the title. you can organize your media into lists, and lists can include more than one type of 
            media (e.g. creating a list of shows, books, and movies set in the same universe). the api supports a somewhat basic session token system, though it would 
            need to be build upon to be properly secure if i were to build it out further to support cloud sync for the app." /></p>
            <p><Console textInterval={10} swipeInterval={2} fullText="you can check out the API " />
            <a href="https://github.com/violetarrowdev/medialogger-rest-api" target="_blank" rel="noopener noreferrer">
                <Console textInterval={10} swipeInterval={2} noDelay={true} fullText="here" /></a>
            <Console textInterval={10} swipeInterval={2} noDelay={true} fullText=". when the app is finished, i'll add a section with more details on this site! stay tuned." /></p>
            <ul>
                <li><button type="button" onClick={() => changePage(Page.Projects)} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}