import React, { useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search = () => {
   const [delaySearch, setDelaySearch] = useState('');
   const dispatch = useDispatch();
   const { searchValue } = useSelector((state: any) => state.filter);

   const inputRef = useRef<HTMLInputElement>(null);

   const clickCross = () => {
      handleChangeSearch('');
      inputRef.current?.focus();
   };

   const handleChangeSearch = (str: string) => {
      setDelaySearch(str);
      debounceSearch(str);
   };

   const debounceSearch = useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str));
      }, 250),
      [],
   );

   return (
      <div className={styles.container}>
         <input
            ref={inputRef}
            onChange={(event) => handleChangeSearch(event.target.value)}
            value={delaySearch}
            className={styles.root}
            placeholder="Поиск"
         />
         {searchValue && (
            <div onClick={clickCross}>
               <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                     {' '}
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z"
                        fill="#000000"></path>{' '}
                  </g>
               </svg>
            </div>
         )}
      </div>
   );
};

export default Search;
