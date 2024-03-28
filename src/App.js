import { Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Account from './pages/account';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/disk'} element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
