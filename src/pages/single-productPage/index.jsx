import React, { useEffect, useState } from 'react';
import useHook from './usehook';
import { useNavigate, useParams } from 'react-router-dom';
import AuthModal from 'component/auth';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import toastr from 'toastr';
const ProductPage = () => {
    const { getproductid } = useHook();
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [product, setproduct] = useState({});
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const fetchproduct = async () => {
        try {
            const response = await getproductid(id)
            setproduct(response)
            const parsedProduct = {
                ...response,
                color: JSON.parse(response.color) // Convert JSON string to array
            };
            setproduct(parsedProduct);
            console.log("product resposne is", response)
        } catch (error) {
            console.error("error fetching single product", error)
        }
    }
    useEffect(() => {
        fetchproduct()
    }, [])

    const handleSizeSelect = (size) => {
        setSelectedSize(size); // Update selected size
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color); // Update selected color
    };







    // const handleAddToCart = () => {
    //     // const userId = localStorage.getItem('userId');
    //     // if (userId) {
    //     //     console.log('Adding to cart', { product, size: selectedSize, color: selectedColor });
    //     // } else {
    //     //     setShowAuthModal(true);
    //     // }
    //     navigate('/cart')


    //     const cartItem = {
    //         product,
    //         size: selectedSize,
    //         color: selectedColor
    //     };
    //     dispatch(addtocart(cartItem));
    //     navigate('/cart');
    // };
    const handleAddToCart = () => {
        if (product.Sizes && product.Sizes.length > 0 && !selectedSize) {
            toastr.error("Please select a size.");
            return;
        }

        if (product.color && product.color.length > 0 && !selectedColor) {
            toastr.error("Please select a color.");
            return;
        }
        const userId = localStorage.getItem('GrandMarts_userId');
        if (userId) {
            const cartItem = {
                product,
                size: selectedSize,
                color: selectedColor
            };
            // Log the data being saved to the store
            console.log('Adding to cart with data:', cartItem);
            dispatch(addToCart(cartItem));
            navigate('/cart');
        } else {
            setShowAuthModal(true);
        }




    };

    const handleAuthModalClose = () => {
        setShowAuthModal(false);
    };
    return (
        <>
            <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-8">
                <div className="flex flex-col md:flex-row">
                    {/* Product Images */}
                    <div className="md:w-1/2 flex flex-col space-y-4 mb-8 md:mb-0">
                        <img
                            src={`${process.env.REACT_APP_BASE_MEDIA_URL}${product.image1}`}
                            alt="Product image"
                            className="w-full h-64 md:h-auto rounded-lg shadow-md object-cover"
                        />
                        <div className="flex space-x-4 overflow-x-auto md:overflow-hidden">
                            {product.image2 && (
                                <img
                                    src={`${process.env.REACT_APP_BASE_MEDIA_URL}${product.image2}`}
                                    alt={`image 2`}
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-sm object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                />
                            )}
                            {product.image3 && (
                                <img
                                    src={`${process.env.REACT_APP_BASE_MEDIA_URL}${product.image3}`}
                                    alt={`image 3`}
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-sm object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                />
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 md:pl-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{product.productName}</h1>
                        Rs {product.finalPrice > 0 ? product.finalPrice : product.basePrice}
                        {product.discountType === "percentage" && (
                            <span className="text-sm text-red-500"> (Discount: {product.discount}%)</span>
                        )}
                        <p className="text-sm md:text-sm font-semibold text-gray-700 mb-4"><span className='text-sm text-red-600'>stock:  </span>{product.stock}</p>

                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                        {/* Size Selection */}
                        {product.Sizes && product.Sizes.length > 0 && (
                            <div className="mb-6">
                                <p className="text-lg font-semibold text-gray-700 mb-2">Select Size:</p>
                                <div className="flex space-x-4">
                                    {product.Sizes.map((sizeObj) => (
                                        <button
                                            key={sizeObj.id} // Use a unique key for each button, ideally from the data
                                            onClick={() => handleSizeSelect(sizeObj)}
                                            className={`py-2 px-4 rounded-lg border-2 ${selectedSize?.id === sizeObj.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'
                                                }`}
                                        >
                                            {sizeObj.size} {/* Display the size value */}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* Color Selection */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-700 mb-2">Select Color:</p>
                            <div className="flex space-x-4">
                                {product.color?.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleColorSelect(color)}
                                        className={`w-10 h-10 rounded-full flex justify-center items-center border-2 ${selectedColor === color ? 'border-blue-600' : 'border-gray-300'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    >
                                        {selectedColor === color && (
                                            <svg className="w-6 h-6  text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleAddToCart(product)}
                            className="bg-blue-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>




            {/* Login Modal */}
            <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} />
        </>
    );
};

export default ProductPage;
