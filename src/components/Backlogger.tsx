import { changePage, Page } from '../util/Pages';
import { Console } from './Exports';

export default function Backlogger() {
    return (
        <ul>
            <li><button type="button" onClick={() => changePage(Page.Projects)} ><Console fullText="> .." /></button></li>
        </ul>
    )
}