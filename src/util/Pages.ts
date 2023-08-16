import * as Constants from './Constants';

export enum Page {
    Root,
    Projects,
    Personal,
    Backlogger,
    RedditFetcher,
    AboutMe,
    Picture // temp
}

export function changePage(pg: Page) {
    window.dispatchEvent(new CustomEvent(Constants.pageTransitionEvent, {
        detail: {
            nextPage: pg
        }
    }));
};