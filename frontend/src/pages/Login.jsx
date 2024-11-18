import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaRegCircleUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import axios from 'axios';
import backendURL from '../constant';
import InputField from '../components/shared/InputField';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/admin/login`, credentials);

      console.log(response.data.token)
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="h-full w-screen flex items-center justify-center">
      <form className="flex flex-col space-y-4 items-center justify-center p-8 rounded shadow-custom" onSubmit={handleSubmit}>
        {/* Logo */}
        <h3 className="text-3xl font-semibold mb-3">Admin Login</h3>
        <InputField
          id="username"
          type={"text"}
          labelText="Username"
          icon={FaRegCircleUser} value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          isFocused={isUsernameFocused}
          setIsFocused={setIsUsernameFocused}
        />

        {/* Password Field */}
        <div className={`input-parent ${isPasswordFocused ? 'border-blue-600 border-2' : 'border-gray-500'}`}>
          <MdLockOutline fontSize={18} className={`${isPasswordFocused ? 'text-blue-600' : 'text-gray-500'}`} />
          <div className={`input-child`}>
            <label
              htmlFor="password"
              className={`input-label
                ${isPasswordFocused ? '-top-6 -left-1 bg-white text-sm text-blue-600' : 'text-gray-500'}
                ${credentials.password && '-top-6 -left-1 bg-white'}`}
            >
              Password
            </label>
            <input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              className="input"
            />
            <div className={`absolute right-2  top-1/2 transform -translate-y-1/2 cursor-pointer ${isPasswordFocused && credentials.password ? 'text-blue-600' : 'text-gray-500'}`}>
              {isPasswordVisible ? <LuEye onClick={togglePassword} /> : <LuEyeOff onClick={togglePassword} />}
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
