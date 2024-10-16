import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import useHook from './usehook';
import GrandmartsLogo from 'assets/common/Grandmarts.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const {getCategories}=useHook();
    const navigate=useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [categorieslist,setCategorieslist]=useState([])
    const [leaveTimeout, setLeaveTimeout] = useState(null);



    const carts = useSelector((state) => state.cart.carts || []);
    const totalItems = carts.reduce((total, item) => total + item.quantity, 0);


    useEffect(() => {
        // Call getCategories only once when component mounts
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategorieslist(response.categories)
            console.log("categories list is:-",categorieslist)
            console.log("categries",response)
            // Handle the response if needed
        };

        fetchCategories();
    }, []);
    const toggleDropdown = (categoryId) => {
        clearTimeout(leaveTimeout);
        setIsDropdownOpen(isDropdownOpen === categoryId ? null : categoryId);
    };
    const handleMouseEnter = (categoryId) => {
        clearTimeout(leaveTimeout); // Clear any existing timeout
        setIsDropdownOpen(categoryId);
    };

    const handleMouseLeave = () => {
        const timeoutId = setTimeout(() => {
            setIsDropdownOpen(null);
        }, 300); // Adjust delay as needed
        setLeaveTimeout(timeoutId);
    }; 
       const handleproduct=(id)=>{
        navigate(`/subcatagory-productlisting/${id}`)
    }


    return (
 
        <>
        <nav className="bg-white shadow-md">
    <div className="lg:max-w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
            <div className="flex w-[80%] sm:w-[200%] md:w-[100%] gap-10">
                <div className="flex-shrink-0 flex items-center">
                    <Link to='/'>
                        <img
                            className="h-32 w-32 pt-4"
                            src={GrandmartsLogo}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="hidden md:flex sm:space-x-2">
    <div className="hidden md:flex items-center gap-3">
        {categorieslist.slice(0, 5).map((category) => (
            <div
                key={category.id}
                className="relative z-50"
                onMouseEnter={() => toggleDropdown(category.id)}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    className="flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
                >
                    {category.title}
                </button>
                {isDropdownOpen === category.id && category.subCategory && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <ul className="py-1">
                            {category.subCategory.map((subcategory) => (
                                <li key={subcategory.id}>
                                    <span
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleproduct(subcategory.id)}
                                    >
                                        {subcategory.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>
            </div>
            

            {/* The section for notification, cart, and profile */}
            <div className="flex items-center w-full justify-end space-x-4">
                {/* Search Input */}
                <div className="relative hidden 950px:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
                    />
                    <button className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        <FaSearch />
                    </button>
                </div>

                {/* Notification Icon */}
                <div
                    className="relative"
                    onMouseEnter={() => toggleDropdown('notifications')}
                    onMouseLeave={() => toggleDropdown(null)}
                >
                    <button className="text-gray-500 hover:text-gray-700 pt-1">
                        <FaBell size={20} />
                    </button>
                    {isDropdownOpen === 'notifications' && (
                        <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg z-50">
                            <div className="px-4 py-2 text-sm text-gray-700">No new notifications</div>
                        </div>
                    )}
                </div>

                {/* Profile Icon */}
                <div
                    className="relative"
                    onMouseEnter={() => toggleDropdown('account')}
                    onMouseLeave={() => toggleDropdown(null)}
                >
                    <button className="text-gray-500 hover:text-gray-700">
                        <FaUser size={20} />
                    </button>
                    {isDropdownOpen === 'account' && (
                        <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg z-50">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    )}
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className="text-gray-500 hover:text-gray-700">
                    <FaShoppingCart size={20} />
                </Link>

                {/* Cart Count Badge */}
                {totalItems > 0 && (
                    <span className="absolute top-4 right-4 inline-flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">
                        {totalItems}
                    </span>
                )}
            </div>
        </div>
    </div>
</nav>

        </>
    );
};

export default Navbar;



       // <nav className="bg-white shadow-md">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="flex justify-between items-center h-16">
        //             <div className="flex">
        //                 <div className="flex-shrink-0 flex items-center">
        //                     <img
        //                         className="h-8 w-auto"
        //                         src="https://via.placeholder.com/150"
        //                         alt="Logo"
        //                     />
        //                 </div>
        //                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        //                     {/* Men Dropdown */}
        //                     <div
        //                         className="relative"
        //                         onMouseEnter={() => toggleDropdown('men')}
        //                     // onMouseLeave={() => toggleDropdown(null)}
        //                     >
        //                         <button
        //                             className="flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                         >
        //                             Men
        //                         </button>
        //                         {isDropdownOpen === 'men' && (
        //                             <div className="absolute left-0 mt-1 w-100 bg-white rounded-md shadow-lg flex">
        //                                 <div className='flex row justify-between gap-12 pt-10 py-10 px-10'>
        //                                     <div className='flex flex-col w-[100%] ps-10'>
        //                                     <div className='w-max'>
        //                                         <h1 className='pb-5 flex w-100'>
        //                                             <a href="##" className='underline text-xl'>Top Wear</a>
        //                                         </h1>
                                              
        //                                       <ul className='leading-1 text-md pl-0'>
        //                                             <li>Vest</li>
        //                                             <li>Shirts</li>
        //                                             <li>T-Shirts</li>
        //                                             <li>hoodies</li>
        //                                             <li>SweatShirts</li>
        //                                             <li>Traditional</li>
        //                                             <li>Sleep And Lounge</li>
        //                                         </ul>
        //                                       </div>
        //                                     </div>
        //                                     <div className='flex flex-col w-[100%] ps-20'>
        //                                         <div className='w-max'>
        //                                             <h1 className='pb-5 flex w-100'>
        //                                                 <a href="##" className='underline text-xl block max-w-max'>Bottom Wear</a>
        //                                             </h1>

        //                                             <div>
        //                                                 <ul className='leading-1 text-md pl-0'>
        //                                                     <li>Boxers</li>
        //                                                     <li>Shorts</li>
        //                                                     <li>Jeans</li>
        //                                                     <li>Pants</li>
        //                                                     <li>Trousers</li>
        //                                                 </ul>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className='flex-col w-[100%] ps-20'>
        //                                         <div className='w-max'>
        //                                         <h1 className='pb-5'>
        //                                             <a href="##" className='underline text-xl'>Foot Wear</a>
        //                                         </h1>
        //                                         <ul className='leading-1 text-md pl-0'>
        //                                             <li>Casual Shoes</li>
        //                                             <li>Boots</li>
        //                                             <li>Sport Shoes</li>
        //                                             <li>Formal Shoes</li>
        //                                             <li>Peshawari</li>
        //                                             <li>Sandals</li>
        //                                             <li>Sneakers</li>
        //                                             <li>Slippers</li>
        //                                         </ul>
        //                                         </div>
                                             
        //                                     </div>
        //                                     <div className='flex flex-col w-[100%] ps-20'>
        //                                         <div className='w-max'>
        //                                         <h1 className='pb-5'>
        //                                             <a href="##" className='underline text-xl'>Accessories</a>
        //                                         </h1>
        //                                         <ul className='leading-1 text-md pl-0'>
        //                                             <li>Wallets</li>
        //                                             <li>Belts & Key chains</li>
        //                                             <li>Fragrances</li>
        //                                             <li>Eyewear</li>
        //                                             <li>Bags</li>
        //                                             <li>Watches</li>
        //                                         </ul>

        //                                         </div>
                                              
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         )}
        //                     </div>
        //                     {/* Women Dropdown */}
        //                     <div
        //                         className="relative"
        //                         onMouseEnter={() => toggleDropdown('women')}
        //                         onMouseLeave={() => toggleDropdown(null)}
        //                     >
        //                         <button
        //                             className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                         >
        //                             Women
        //                         </button>
        //                         {isDropdownOpen === 'women' && (
        //                             <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg">
        //                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dresses</a>
        //                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tops</a>
        //                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Jewelry</a>
        //                             </div>
        //                         )}
        //                     </div>
        //                     <a
        //                         href="#"
        //                         className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                     >
        //                         Kids
        //                     </a>
        //                     <a
        //                         href="#"
        //                         className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                     >
        //                         Beauty
        //                     </a>
        //                     <a
        //                         href="#"
        //                         className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                     >
        //                         Others
        //                     </a>
        //                     <a
        //                         href="#"
        //                         className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                     >
        //                         New Arrival
        //                     </a>
        //                     <a
        //                         href="#"
        //                         className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700 hover:border-gray-300 hover:text-gray-900"
        //                     >
        //                         Sale
        //                     </a>
        //                 </div>
        //             </div>
        //             <div className="flex items-center">
        //                 <div className="relative mr-4">
        //                     <input
        //                         type="text"
        //                         placeholder="Search..."
        //                         className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
        //                     />
        //                     <button className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
        //                         <FaSearch />
        //                     </button>
        //                 </div>
        //                 <div className="hidden sm:flex sm:items-center sm:ml-6">
        //                     <div
        //                         className="relative"
        //                         onMouseEnter={() => toggleDropdown('notifications')}
        //                         onMouseLeave={() => toggleDropdown(null)}
        //                     >
        //                         <button className="text-gray-500 hover:text-gray-700">
        //                             <FaBell size={20} />
        //                         </button>
        //                         {isDropdownOpen === 'notifications' && (
        //                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        //                                 <div className="px-4 py-2 text-sm text-gray-700">No new notifications</div>
        //                             </div>
        //                         )}
        //                     </div>
        //                     <div
        //                         className="relative"
        //                         onMouseEnter={() => toggleDropdown('account')}
        //                         onMouseLeave={() => toggleDropdown(null)}
        //                     >
        //                         <button className="text-gray-500 hover:text-gray-700 ml-4">
        //                             <FaUser size={20} />
        //                         </button>
        //                         {isDropdownOpen === 'account' && (
        //                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        //                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
        //                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
        //                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
        //                             </div>
        //                         )}
        //                     </div>
        //                     <button className="text-gray-500 hover:text-gray-700 ml-4">
        //                         <FaHeart size={20} />
        //                     </button>
        //                     <button className="text-gray-500 hover:text-gray-700 ml-4">
        //                         <FaShoppingCart size={20} />
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </nav>