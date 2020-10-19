import { Image } from './image';
import { Comment } from './comment';
import { Collection } from './collection';

export interface Article {
  id: number;
  title: string;
  description: string;
  author: string;
  images: Image[];
  comments: Comment[];
  collection_id: Collection;
}

