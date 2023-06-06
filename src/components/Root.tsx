import { Console } from './Exports';
import * as Constants from '../util/Constants';
import { useState } from 'react';
import { Page, changePage } from '../util/Pages';

export default function Root() {

    return (
        <div>
            <p>
             <Console fullText="Select a file or directory to proceed:" />
            </p>
            <ul>
                <li><button type="button" onClick={() => changePage(Page.Projects)}><Console fullText="> projects/" /></button></li>
                <li><Console fullText="> personal/" /></li>
                <li><Console fullText="> misc/" /></li>
                <li><button type="button" onClick={() => changePage(Page.License)}><Console fullText="> license.txt" /></button></li>
            </ul>
        </div>
    )
}