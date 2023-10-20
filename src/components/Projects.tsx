import { Console } from './Exports';
import { changePage } from '../util/Pages';

export default function Projects() {
    
    return (
        <div>
            <p>
            <Console fullText="projects/" />
            </p>
            <ul>
                <li><button type="button" onClick={() => changePage("./backlogger")} ><Console fullText="> backlogger_api.txt" /></button></li>
                <li><button type="button" onClick={() => changePage("./reddit-fetcher")} ><Console fullText="> redditfetcher.txt" /></button></li>
                <li><button type="button" onClick={() => changePage("..")} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}