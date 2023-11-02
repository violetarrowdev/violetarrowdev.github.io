import { Banner } from './Exports';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as Constants from '../util/Constants';
import ConsoleManager from '../controller/ConsoleManager'

export default function ConsoleWindow() {

    const navigate = useNavigate();
    const location = useLocation();
    const [nextPage, setNextPage] = useState("/");

    useEffect(() => {
        var switchPage = () => {
            navigate(nextPage, { relative: "path" })
          }
        
          var prepareTransition = (ev: any) => {
            setNextPage(ev.detail.nextPage);
          }

        window.addEventListener(Constants.consolesClearedEvent, switchPage);
        window.addEventListener(Constants.pageTransitionEvent, prepareTransition);

        return () => {
            window.removeEventListener(Constants.consolesClearedEvent, switchPage);
            window.removeEventListener(Constants.pageTransitionEvent, prepareTransition);
        };
    }, [navigate, nextPage])

    useEffect(() => {
        ConsoleManager.getInstance().checkForceClear();
    }, [location.pathname])

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