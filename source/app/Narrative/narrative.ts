 import { ITag } from './tag';

export interface INarrative {
    id: string;
    title: string;
    description: string;
    bodyHtml: string;
    tags: ITag[];
}
