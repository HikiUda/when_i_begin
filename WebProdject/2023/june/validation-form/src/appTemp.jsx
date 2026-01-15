import './App.css';
import { useEffect, useState } from 'react';

function App() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailDirty, setEmailDirty] = useState(false);
   const [passwordDirty, setPasswordDirty] = useState(false);
   const [emailError, setEmailError] = useState('Емейл не может быть пустым...');
   const [passwordError, setPasswordError] = useState('Пароль не может быть пустым...');
   const [formValid, setFormValid] = useState(false);

   useEffect(() => {
      if (emailError || passwordError) {
         setFormValid(false);
      } else {
         setFormValid(true);
      }
   }, [emailError, passwordError]);

   function emailHandler(e) {
      setEmail(e.target.value);
      const re =
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(e.target.value).toLowerCase())) {
         setEmailError('Некорректный емейл');
      } else {
         setEmailError('');
      }
   }

   const passwordHandler = (e) => {
      let value = e.target.value;
      setPassword(value);
      if (value.length < 3 || value.length > 8) {
         setPasswordError('Пароль должен быть диленее 3 и меньше 8');
         if (!value) {
            setPasswordError('Пароль не может быть пустым...');
         }
      } else {
         setPasswordError('');
      }
   };

   const blurHandler = (e) => {
      switch (e.target.name) {
         case 'email':
            setEmailDirty(true);
            break;
         case 'password':
            setPasswordDirty(true);
            break;
      }
   };

   return (
      <div className="app">
         <form>
            <h1>Регистрация</h1>
            {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <input
               value={email}
               onChange={(e) => emailHandler(e)}
               onBlur={(e) => blurHandler(e)}
               name="email"
               type="email"
               placeholder="Enter your email..."
            />
            {passwordDirty && passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            <input
               value={password}
               onChange={(e) => passwordHandler(e)}
               onBlur={(e) => blurHandler(e)}
               name="password"
               type="password"
               placeholder="Enter your password..."
            />
            <button disabled={!formValid} type="submit">
               Registration
            </button>
         </form>
      </div>
   );
}

export default App;
