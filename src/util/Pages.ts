import * as Constants from './Constants';

export enum Page {
    Root = "ROOTPAGE",
    Projects = "PROJECTSPAGE",
    Personal = "PERSONALPAGE",
    Misc = "MISCPAGE",
    License = "LICENSEPAGE"
}

export function changePage(pg: Page) {
    window.dispatchEvent(new CustomEvent(Constants.pageTransitionEvent, {
        detail: {
            nextPage: pg
        }
    }));
};