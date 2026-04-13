import type React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (nextSearchNote: string) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <input
      className={css.input}
      defaultValue={search}
      onChange={handleChange}
      type="text"
      placeholder="Search notes"
    />
  );
}
