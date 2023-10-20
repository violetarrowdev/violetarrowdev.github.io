import { Console } from './Exports';
import { changePage } from '../util/Pages';

export default function Root() {

    return (
        <div>
            <p>
             <Console fullText="hey there, traveler. select a file or directory to proceed:" />
            </p>
            <ul>
                <li><button type="button" onClick={() => changePage("./projects")}><Console fullText="> projects/" /></button></li>
                <li><button type="button" onClick={() => changePage("./personal")}><Console fullText="> personal/" /></button></li>
            </ul>
        </div>
    )
}