import { useState } from 'react';
import useDebounce from '../hook/useDebounce';

const Debounce = () => {
   const [value, setValue] = useState('');
   const debounced = useDebounce(search, 500);

   function onChange(e) {
      setValue(e.target.value);
      debounced(e.target.value);
   }

   function search(query) {
      fetch(`https://jsonplaceholder.typicode.com/todos?query=${query}`)
         .then((response) => response.json())
         .then((json) => {
            console.log(json);
         });
   }
   return (
      <div>
         <input value={value} onChange={onChange} type={'text'} />
      </div>
   );
};

export default Debounce;
