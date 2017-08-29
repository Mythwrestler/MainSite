export interface INarrative {
    guidId: string;
    title: string;
    description: string;
    bodyHtml: string;
    keywords: String[];
}

export class Narrative implements INarrative {
    constructor(
        public guidId: string,
        public title: string,
        public description: string,
        public bodyHtml: string,
        public keywords: string[]
    ) { }
}
