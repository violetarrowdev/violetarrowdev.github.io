import Banner from './Banner';
import Console from './Console';
import * as Events from './Events';

export default function Projects() {

    var clearPage = () => {
        window.dispatchEvent(new Event(Events.pageTransitionEvent));
    };
    
    return (
        <div>
            <p>
            <Console fullText="projects/" />
            </p>
            <ul>
                <li><button type="button" onClick={clearPage} ><Console fullText="> .." /></button></li>
                <li><Console fullText="> backlogger.txt" /></li>
                <li><Console fullText="> redditfetcher.txt" /></li>
            </ul>
        </div>
    )
}