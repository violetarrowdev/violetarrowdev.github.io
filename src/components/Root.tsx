import Banner from './Banner';
import Console from './Console';
import * as Events from './Events';
import { Pages } from './PagesEnum';
import { useState } from 'react';

export default function Root() {

    var clearPage = () => {
        window.dispatchEvent(new Event(Events.pageTransitionEvent));
    };

    return (
        <div>
            <p>
             <Console fullText="Select a file or directory to proceed:" />
            </p>
            <ul>
                <li><button type="button" onClick={clearPage}><Console fullText="> projects/" /></button></li>
                <li><Console fullText="> personal/" /></li>
                <li><Console fullText="> misc/" /></li>
                <li><Console fullText="> license.txt" /></li>
            </ul>
        </div>
    )
}