import { useState, useEffect } from 'react';
import { FiTrash } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import backendURL from '../constant';
import SubNavbar from './shared/SubNavbar';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileno: '',
    designation: '',
    gender: '',
    course: '',
    profile: null,
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      searchEmployees(searchQuery); // Search employees when query changes
    } else {
      fetchEmployees(); // Fetch all employees if no search query
    }
  }, [searchQuery]);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/employee/get-all-employee`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
    }
  };

  const searchEmployees = async (query) => {
    try {
      const response = await axios.get(`${backendURL}/api/employee/search?name=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data.data);
    } catch (error) {
      toast.error('Failed to search employees');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${backendURL}/api/employee/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        toast.error('Failed to delete employee');
      }
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const isEmpty = Object.values(formData).some(
  //     (value) => value === '' || value === null
  //   );

  //   if (isEmpty) {
  //     toast.error('Please fill out all fields');
  //     return;
  //   }

  //   const formDataObj = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     formDataObj.append(key, value);
  //   });

  //   try {
  //     let response;
  //     if (editingEmployee) {
  //       response = await axios.put(`${backendURL}/api/employee/update/${editingEmployee._id}`, formDataObj, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       toast.success('Employee updated successfully');
  //     } else {
  //       await axios.post(`${backendURL}/api/employee/create`, formDataObj, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       toast.success('Employee created successfully');
  //     }
  //     setShowModal(false);
  //     fetchEmployees();
  //     setFormData({
  //       name: '',
  //       email: '',
  //       mobileno: '',
  //       designation: '',
  //       gender: '',
  //       course: '',
  //       profile: null,
  //     });
  //     setEditingEmployee(null);
  //   } catch (error) {
  //     toast.error('Failed to create/update employee');
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some(
      (value) => value === '' || value === null
    );

    if (isEmpty) {
      toast.error('Please fill out all fields');
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      let apiCallPromise;
      if (editingEmployee) {
        apiCallPromise = axios.put(`${backendURL}/api/employee/update/${editingEmployee._id}`, formDataObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        apiCallPromise = axios.post(`${backendURL}/api/employee/create`, formDataObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Use toast.promise to track the promise state
      await toast.promise(apiCallPromise, {
        loading: editingEmployee ? 'Updating employee...' : 'Creating employee...',
        success: editingEmployee
          ? 'Employee updated successfully!'
          : 'Employee created successfully!',
        error: editingEmployee
          ? 'Failed to update employee!'
          : 'Failed to create employee!',
      });

      setShowModal(false);
      fetchEmployees();
      setFormData({
        name: '',
        email: '',
        mobileno: '',
        designation: '',
        gender: '',
        course: '',
        profile: '',
      });
      setEditingEmployee(null);
    } catch (error) {
      toast.error('An error occurred while creating/updating the employee');
    }
  };

  const handleEditClick = (employee) => {
    setShowModal(true);
    setFormData({
      name: employee.name,
      email: employee.email,
      mobileno: employee.mobileno,
      designation: employee.designation,
      gender: employee.gender,
      course: employee.course,
      profile: employee.profile,
    });
    setEditingEmployee(employee);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <SubNavbar />

      <div className="w-full flex justify-between items-center p-5">
        <div className="flex items-center space-x-1 border border-gray-500 p-2 rounded-md">
          <input
            type="text"
            placeholder="Search Employee Name"
            className="focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <HiMiniMagnifyingGlass className="cursor-pointer" />
        </div>
        <div
          className="bg-blue-600 text-white p-2 rounded-md cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Create Employee
        </div>
      </div>

      <div className="p-5">
        <h4 className="font-semibold mb-3">Employee List</h4>

        <div>
          <div className="grid grid-cols-[0.2fr_1fr_0.9fr_1.4fr_1fr_1fr_0.5fr_1fr_1fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 text-center">
            <b>No</b>
            <b>Image</b>
            <b>Name</b>
            <b>Email</b>
            <b>Mobile No</b>
            <b>Designation</b>
            <b>Gender</b>
            <b>Course</b>
            <b>Create Date</b>
            <b>Action</b>
          </div>

          {employees.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.2fr_1fr_1fr_1fr_1fr_1fr_0.5fr_1fr_1fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 text-center">
              <p>{index + 1}</p>
              <img
                src={item?.profile}
                alt=""
                className="w-12 h-12 mx-auto my-auto object-cover rounded-full"
              />
              <p>{item?.name || 'Karan Kumbhare'}</p>
              <p>{item?.email || 'karankumbhare90@gmail.com'}</p>
              <p>{item?.mobileno || '+91 6352305924'}</p>
              <p>{item?.designation || 'MERN Stack Developer'}</p>
              <p>{item?.gender || 'Male'}</p>
              <p>{item?.course || 'BE'}</p>
              <p>{new Date(item?.createdAt).toLocaleDateString("hi-IN") || ''}</p>
              <div className="flex justify-center items-center space-x-5">
                <HiOutlinePencil
                  className="text-blue-500 cursor-pointer"
                  size={18}
                  onClick={() => handleEditClick(item)}
                />
                <span> | </span>
                <FiTrash
                  className="text-red-500 cursor-pointer"
                  size={18}
                  onClick={() => handleDelete(item?._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="min-h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md w-[400px]">
            <h3 className="font-bold text-lg mb-4">{editingEmployee ? 'Edit Employee' : 'Create Employee'}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Mobile No:</label>
                <input
                  type="text"
                  name="mobileno"
                  value={formData.mobileno}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="">Select Option</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="">Select Option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Course:</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="">Select Option</option>
                  <option value="BE">BE</option>
                  <option value="ME">ME</option>
                  <option value="BCA">BCA</option>
                  <option value="BSC">BSC</option>
                  <option value="MSC">MSC</option>
                  <option value="MCA">MCA</option>
                  <option value="B Com">B Com</option>
                  <option value="M Com">M Com</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Profile Picture:</label>
                <input
                  type="file"
                  name="profile"
                  // value={formData.profile}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded-md"
                  onClick={() => {
                    setShowModal(false);
                    setEditingEmployee(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  {editingEmployee ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;