import { changePage } from '../util/Pages';
import { Console, Asciinator } from './Exports'

export default function Picture() {
    return(
        <div>
            <Asciinator imageRef="/images/test.jpg" />
            <ul>
                <li><button type="button" onClick={() => changePage("/personal/")} ><Console fullText="> .." /></button></li>
            </ul>
        </div>
    )
}