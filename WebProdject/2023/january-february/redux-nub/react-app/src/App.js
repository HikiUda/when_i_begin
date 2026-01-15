import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from './asyncAction/customers';
import { addCashAction, getCashAction } from './store/cashReducer';
import { addCustomerAction, removeCustomerAction } from './store/customersReducer';

function App() {
   const dispatch = useDispatch();
   const cash = useSelector((state) => state.cash.cash);
   const customers = useSelector((state) => state.customers.customers);
   function addCash(c) {
      dispatch(addCashAction(c));
   }
   function getCash(c) {
      dispatch(getCashAction(c));
   }

   function addCustomer(name) {
      const id = Date.now();
      dispatch(addCustomerAction({ name, id }));
   }
   function removeCustomer(id) {
      dispatch(removeCustomerAction(id));
   }
   return (
      <div className="App">
         <div>{cash}</div>
         <div>
            <button onClick={() => addCash(Number(prompt()))}>add</button>
            <button onClick={() => getCash(Number(prompt()))}>get</button>
            <button onClick={() => addCustomer(prompt())}>add_c</button>
            <button onClick={() => dispatch(fetchCustomers())}>get customers from db</button>
         </div>
         <div>
            {customers.length > 0 ? (
               <ul>
                  {customers.map((customer) => {
                     return (
                        <li onClick={() => removeCustomer(customer.id)} key={customer.id}>
                           {customer.name}
                        </li>
                     );
                  })}
               </ul>
            ) : (
               <div>We have no customers</div>
            )}
         </div>
      </div>
   );
}

export default App;
