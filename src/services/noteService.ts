import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_MY_API}`;

export interface GetNotes {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (searchNote: string, page: number = 1) => {
  const params: Record<string, string | number> = { page };
  if (searchNote.trim() !== '') {
    params.search = searchNote;
  }
  const res = await axios.get<GetNotes>('/notes', { params });
  return res.data;
};

// POST
interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: NewNote) => {
  const res = await axios.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};
