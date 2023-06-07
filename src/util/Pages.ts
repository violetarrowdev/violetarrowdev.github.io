import * as Constants from './Constants';

export enum Page {
    Root,
    Projects,
    Personal,
    Misc,
    License,
    Backlogger,
    RedditFetcher,
    AboutMe
}

export function changePage(pg: Page) {
    window.dispatchEvent(new CustomEvent(Constants.pageTransitionEvent, {
        detail: {
            nextPage: pg
        }
    }));
};