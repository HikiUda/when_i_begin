import { useEffect, useState } from 'react';

export const useValidation = (value, validations) => {
   const [isEmpty, setIsEmpty] = useState(true);
   const [minLengthError, setMinLengthError] = useState(false);
   const [maxLengthError, setMaxLengthError] = useState(false);
   const [isEmail, setIsEmail] = useState(false);
   const [inputValid, setInputValid] = useState(false);

   useEffect(() => {
      for (const validation in validations) {
         switch (validation) {
            case 'minLength':
               value.length < validations[validation]
                  ? setMinLengthError(true)
                  : setMinLengthError(false);
               break;

            case 'maxLength':
               value.length < validations[validation]
                  ? setMaxLengthError(true)
                  : setMaxLengthError(false);
               break;
            case 'isEmail':
               const re =
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
               re.test(String(value).toLowerCase()) ? setIsEmail(true) : setIsEmail(false);
               break;
            case 'isEmpty':
               value ? setIsEmpty(false) : setIsEmpty(true);
               break;
         }
      }
   }, [value]);
   useEffect(
      () => {
         if ((isEmpty || !isEmail || minLengthError, maxLengthError)) {
            setInputValid(false);
         } else {
            setInputValid(true);
         }
      },
      { isEmail, isEmpty, minLengthError, maxLengthError },
   );

   return { isEmpty, minLengthError, maxLengthError, isEmail, inputValid };
};
