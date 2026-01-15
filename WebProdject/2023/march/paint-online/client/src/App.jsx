import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/app.scss';
import Session from './components/Session';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/:id" element={<Session />} />

            <Route path="*" element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
