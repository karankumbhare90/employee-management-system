import { Link, useNavigate } from 'react-router-dom'

const SubNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='p-5'>
            <div className="h-full w-full flex items-center justify-between shadow-md p-4">
                {/* Navigation links */}
                <div className="flex space-x-4 items-center">
                    <Link to="/dashboard" className="text-blue-600 hover:text-gray-500">Home</Link>
                    <Link to="/employee-list" className="text-blue-600 hover:text-gray-500">Employee List</Link>
                </div>

                {/* Admin details with dropdown and logout */}
                <div className="flex space-x-2 justify-between items-center">
                    <span className="font-semibold">Admin</span>
                    <span className='text-gray-500'> | </span>
                    <button
                        onClick={handleLogout}
                        className="w-full text-blue-600 font-semibold hover:text-red-500"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    )
}

export default SubNavbar