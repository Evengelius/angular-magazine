import { Article } from './article';

export interface Collection {
    id: number;
    name: string;
    articles: Article[]
}
