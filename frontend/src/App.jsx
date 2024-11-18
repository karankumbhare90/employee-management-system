import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import EmployeeList from './components/EmployeeList';
import PublicRoute from './components/PublicRoute';
import './App.css';
import Navbar from './components/shared/Navbar';
import Home from './components/Home';

function App() {

  const token = localStorage.getItem('token');

  return (
    <div className="h-screen w-screen">
      <Router>
        <Toaster position="top-center" />
        <Navbar />
        <div style={{ height: 'calc(100vh - 56px)' }}>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

            {/* Private Routes */}
            {
              token && (
                <>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="employee-list" element={<EmployeeList />} />
                </>
              )
            }

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
