import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="h-full w-full flex flex-col">
        {/* Navigation links */}
        <div className="p-4">
          <div className="flex space-x-2">
            <Link to="/home" className="text-blue-600">Home</Link>
            <Link to="/employee-list" className="text-blue-600">Add Employee</Link>
          </div>
        </div>

        {/* Admin details with dropdown and logout */}
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <div className="text-lg font-semibold">Admin Name</div>
          <div className="relative">
            <button onClick={toggleDropdown} className="px-4 py-2 bg-blue-600 text-white rounded">
              {isDropdownOpen ? 'Close' : 'Logout'}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-grow p-4">
          {/* Other content */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;





// <Box sx={{ flexGrow: 1 }}>
//   <AppBar position="static">
//     <Toolbar>
//       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//         Employee Management System
//       </Typography>
//       <Button color="inherit" onClick={() => navigate('/')}>Employees</Button>
//       <Button color="inherit" onClick={() => navigate('/add-employee')}>Add Employee</Button>
//       <Button color="inherit" onClick={handleLogout}>Logout</Button>
//     </Toolbar>
//   </AppBar>
//   <Box sx={{ p: 3 }}>
//     <Outlet />
//   </Box>
// </Box>