import { Routes, Route } from 'react-router-dom';
import ClassroomPage from './components/ClassroomPage';
import AttendancePage from './pages/AttendancePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ClassroomPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
    </Routes>
  );
}

export default App; 