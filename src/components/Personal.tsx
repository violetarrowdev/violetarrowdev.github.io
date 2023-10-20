import { changePage } from '../util/Pages';
import { Console } from './Exports';

export default function Personal() {
    return(
        <div>
            <p><Console fullText="personal/" /></p>

            <ul>
                <li><button type="button" onClick={() => changePage("./about-me")}><Console fullText="> aboutme.txt" /></button></li>
                <li><button type="button" onClick={() => changePage("./picture")} ><Console fullText="> picture.jpg" /></button></li>
                <li><button type="button" onClick={() => changePage("..")} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}