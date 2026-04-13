import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { useState } from 'react';

import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [searchNote, setSearchNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', searchNote, currentPage],
    queryFn: () => fetchNotes(searchNote, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearchNote = (newSearchNote: string) => {
    setSearchNote(newSearchNote);
    setCurrentPage(1);
  };
  const handleSearch = useDebouncedCallback(handleSearchNote, 300);

  const totalPage = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={searchNote} onChange={handleSearch} />
          {isSuccess && totalPage > 1 && (
            <Pagination
              totalPages={totalPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {isLoading && <p>LOADING......</p>}
        {data && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <NoteForm closeClick={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
