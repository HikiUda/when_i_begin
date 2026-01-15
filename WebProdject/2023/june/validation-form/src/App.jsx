import './App.css';

import { useInput } from './hooks/useInput';

function App() {
   const password = useInput('', { isEmpty: true, minLength: 4, maxLengthError: 8 });
   const email = useInput('', { isEmpty: true, isEmail: true });

   return (
      <div className="app">
         <form>
            <h1>Регистрация</h1>
            {email.isDirty && email.isEmpty && (
               <div style={{ color: 'red' }}>{'emailError empty'}</div>
            )}
            {email.isDirty && !email.isEmail && (
               <div style={{ color: 'red' }}>{'emailError is not email'}</div>
            )}
            <input
               value={email.value}
               onChange={email.onChange}
               onBlur={email.onBlur}
               name="email"
               type="email"
               placeholder="Enter your email..."
            />
            {password.isDirty && password.isEmpty && (
               <div style={{ color: 'red' }}>{'passwordError empty'}</div>
            )}
            {password.isDirty && password.minLengthError && (
               <div style={{ color: 'red' }}>{'passwordError minLength'}</div>
            )}
            {password.isDirty && password.maxLengthError && (
               <div style={{ color: 'red' }}>{'passwordError maxLength'}</div>
            )}
            <input
               value={password.value}
               onChange={password.onChange}
               onBlur={password.onBlur}
               name="password"
               type="password"
               placeholder="Enter your password..."
            />
            <button disabled={email.inputValid && password.inputValid} type="submit">
               Registration
            </button>
         </form>
      </div>
   );
}

export default App;
