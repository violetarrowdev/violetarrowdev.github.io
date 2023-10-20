import { Banner } from './Exports';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as Constants from '../util/Constants';

export default function ConsoleWindow() {

    const navigate = useNavigate();
    const [nextPage, setNextPage] = useState("/");

    useEffect(() => {
        var switchPage = () => {
            navigate(nextPage, { relative: "path" })
          }
        
          var prepareTransition = (ev: any) => {
            setNextPage(ev.detail.nextPage);
          }

        window.addEventListener(Constants.consolesClearedEvent, switchPage)
        window.addEventListener(Constants.pageTransitionEvent, prepareTransition)
    }, [navigate, nextPage])

    return (
        <body>
            <div className="console">
                <header><Banner /></header>
                <div className="page">
                    <Outlet />
                </div>
            </div>
        </body>
    )
}