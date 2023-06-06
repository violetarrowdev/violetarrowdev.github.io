import { Console } from './Exports'
import { Page, changePage } from '../util/Pages';

export default function License() {

    return(
        <div>
            <p><Console textInterval={5} swipeInterval={2} fullText="MIT License" /></p>

            <p><Console textInterval={5} swipeInterval={2} fullText="Copyright (c) Meta Platforms, Inc. and affiliates." /></p>
            
            <p><Console textInterval={5} swipeInterval={2} fullText='Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:' /></p>
            
            <p><Console textInterval={5} swipeInterval={2} fullText='The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.' /></p>
            
            <p><Console textInterval={5} swipeInterval={2} fullText='THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.' /></p>

            <ul>
                <li><button type="button" onClick={() => changePage(Page.Root)} ><Console fullText="> .." /></button></li>
            </ul>

        </div>
    )
}