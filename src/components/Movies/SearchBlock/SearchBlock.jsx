import { useState } from 'react';
import { SearchBlockStyled } from './SearchBlock.styled';
import { useSearchParams } from 'react-router-dom';

export const SearchBlock = ({ onSubmit }) => {
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState(() => {
    return searchParams.get('query');
  });

  const handleSubmit = e => {
    onSubmit(value.trim());
  };

  return (
    <SearchBlockStyled>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button type="button" onClick={handleSubmit}>
        Search
      </button>
    </SearchBlockStyled>
  );
};
