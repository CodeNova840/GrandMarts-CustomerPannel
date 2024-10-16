import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import useHook from './usehook';
import { IoMdClose } from "react-icons/io";


const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const {loginUser,RegisterUser}=useHook();

    const handleLoginSubmit = async (formData) => {
        try {
            const userData = {
                email: formData.email,
                password: formData.password
            };
          const response= await loginUser(userData); // Ensure loginUser is defined or imported
          const { user, token } = response;
            // Store user ID and token in local storage
            localStorage.setItem('name',user.firstName+" "+user.lastName);
            localStorage.setItem('email',user.email);
            localStorage.setItem('phoneNumber',user.phoneNumber);
            localStorage.setItem('name',user.firstName+user.lastName);
        localStorage.setItem('GrandMarts_userId', user.id);
        localStorage.setItem('GrandMarts_token', token);
            toastr.success("User Login Successfully");
            onClose();
        } catch (error) {
            console.error('Error during login:', error);
            toastr.error("Error Occurred. Try Again Later");
        }
    };

    const handleRegisterSubmit = async (formData) => {
        try {
            const registerData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dob: formData.dateOfBirth,
                phoneNumber: formData.phoneNumber,
                country: formData.country,
                address: formData.address,
                email: formData.email,
                password: formData.password
            };
            await RegisterUser(registerData); // Ensure RegisterUser is defined or imported
            toastr.success("User Registered Successfully");
            onClose();
        } catch (error) {
            console.error('Error during registration:', error);
            toastr.error("Error Occurred. Try Again Later");
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
                    <div className="flex justify-between">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`px-4 py-2 ${activeTab === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab('register')}
                            className={`px-4 py-2 ${activeTab === 'register' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                        >
                            Register
                        </button>
                    </div>
                    <div className="mt-4">
                        {activeTab === 'login' ? (
                            <LoginForm onSubmit={handleLoginSubmit} />
                        ) : (
                            <RegisterForm  onSubmit={handleRegisterSubmit} />
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                    <IoMdClose/>
                    </button>
                </div>
            </div>
        ) : null
    );
};

export default AuthModal;
