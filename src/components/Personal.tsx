import { changePage, Page } from '../util/Pages';
import { Console } from './Exports';

export default function Personal() {
    return(
        <div>
            <p><Console fullText="personal/" /></p>

            <ul>
                <li><button type="button" onClick={() => changePage(Page.AboutMe)}><Console fullText="> aboutme.txt" /></button></li>
                <li><button type="button" onClick={() => changePage(Page.Picture)} ><Console fullText="> picture.jpg" /></button></li>
                <li><button type="button" onClick={() => changePage(Page.Root)} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}