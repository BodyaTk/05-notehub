export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  title: string;
  content: string;
  tag: NoteTag;
  id: string;
  createdAt: string;
  updatedAt: string;
}
