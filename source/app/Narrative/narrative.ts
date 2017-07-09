export interface INarrative {
    id: string;
    title: string;
    description: string;
    bodyHtml: string;
    tags: String[];
}

export class Narrative implements INarrative {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public bodyHtml: string,
        public tags: string[]
    ) { }
}
