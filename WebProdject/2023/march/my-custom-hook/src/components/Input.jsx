import useInput from '../hook/useInput';

const Input = () => {
   const username = useInput('');
   const password = useInput('');
   return (
      <div>
         <input {...username} type={'text'} />
         <input {...password} type={'text'} />
         <button onClick={() => console.log(username.value, password.value)}>Click</button>
      </div>
   );
};

export default Input;
