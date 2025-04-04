import { Routes, Route } from 'react-router-dom';
import ClassroomPage from './components/ClassroomPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClassroomPage />} />
    </Routes>
  );
}

export default App;