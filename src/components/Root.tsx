import { Console } from './Exports';
import { Page, changePage } from '../util/Pages';

export default function Root() {

    return (
        <div>
            <p>
             <Console fullText="hey there, traveler. select a file or directory to proceed:" />
            </p>
            <ul>
                <li><button type="button" onClick={() => changePage(Page.Projects)}><Console fullText="> projects/" /></button></li>
                <li><button type="button" onClick={() => changePage(Page.Personal)}><Console fullText="> personal/" /></button></li>
                <li><button type="button" onClick={() => changePage(Page.License)}><Console fullText="> license.txt" /></button></li>
            </ul>
        </div>
    )
}