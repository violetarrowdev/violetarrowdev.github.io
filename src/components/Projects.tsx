import { Console } from './Exports';
import { Page, changePage } from '../util/Pages';

export default function Projects() {
    
    return (
        <div>
            <p>
            <Console fullText="projects/" />
            </p>
            <ul>
                <li><button type="button" onClick={() => changePage(Page.Root)} ><Console fullText="> .." /></button></li>
                <li><button type="button" onClick={() => changePage(Page.Projects)} ><Console fullText="> backlogger.txt" /></button></li>
                <li><button type="button" onClick={() => changePage(Page.Projects)} ><Console fullText="> redditfetcher.txt" /></button></li>
            </ul>
        </div>
    )
}