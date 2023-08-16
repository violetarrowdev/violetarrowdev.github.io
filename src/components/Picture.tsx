import { changePage, Page } from '../util/Pages';
import { Console, Asciinator } from './Exports'

export default function Picture() {
    return(
        <div>
            <Asciinator imageRef="/images/test.jpg" />
            <ul>
                <li><button type="button" onClick={() => changePage(Page.Personal)} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}