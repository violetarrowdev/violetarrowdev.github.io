import * as Constants from './Constants';

export function changePage(pg: string) {
    window.dispatchEvent(new CustomEvent(Constants.pageTransitionEvent, {
        detail: {
            nextPage: pg
        }
    }));
};