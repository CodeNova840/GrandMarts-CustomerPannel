import React, { useEffect, useState } from 'react'
import useHook from './usehook'
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
const TopTrending = () => {
    const { getCategories, getproductlistbyid } = useHook();
const navigate=useNavigate()

    const [categorylist, setCategorylist] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [productlist, setproductlist] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0); // Total number of pages

    const fetchCategory = async () => {
        try {
            const response = await getCategories();
            const categories = response.categories.map(category => ({
                ...category,
                subCategories: category.subCategory || []
            }));
            setCategorylist(categories);
            // Set the first category as the selected one by default
            if (response.categories.length > 0) {
                setSelectedCategory(response.categories[0].id);
                console.log("respoooososo", response.categories[0])
                setSelectedSubCategory(response.subCategory?.[0]?.id || null);
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error("Error fetching the categories", error)
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [])
    // Custom Arrow Components
    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
                <FaArrowRight size={24} className="text-gray-500 hover:text-gray-700" />
            </div>
        );
    };

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
                <FaArrowLeft size={24} className="text-gray-500 hover:text-gray-700" />
            </div>
        );
    };
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        innerWidth: 100,
        outerHeight: 40,
        marginLeft: "100px",
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    // subcategories

    // Find the selected category object
    const selectedCategoryData = categorylist.find(cat => cat.id === selectedCategory) || { subCategories: [] };
    const [currentIndex, setCurrentIndex] = useState(0);
    const { subCategories } = selectedCategoryData;


    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? subCategories.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === subCategories.length - 1 ? 0 : prevIndex + 1
        );
    };
    const handleSubCategoryClick = (subCategoryId, index) => {
        setSelectedSubCategory(subCategoryId);
        setCurrentIndex(index);
        setCurrentPage(1)
        setproductlist([])
        console.log("page resetting")

    };
    useEffect(() => {
        if (selectedSubCategory) {
            const fetchProducts = async () => {
                if (selectedSubCategory) {
                    console.log("sekect sub category id", selectedSubCategory)
                    const params = {
                        page: currentPage,
                        limit: 12,
                    }
                    try {
                        const response = await getproductlistbyid(selectedSubCategory, params);
                        console.log("response product list", response)
                        setproductlist(response.products); // Assuming the response contains a 'products' array
                        setPageCount(response.totalPages);
                    } catch (error) {
                        console.error("Error fetching the products", error);
                    }
                }else{
                    setproductlist([])
                }
            };

            fetchProducts();
        }else{
            setproductlist([])
        }
    }, [selectedSubCategory, currentPage])

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleProduct=(id)=>{
        navigate(`/product/${id}`)
    }
    return (
        <>
            <div className='relative'>
                <div className="text-sm font-medium text-center  text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <div className='sticky top-0 z-50 bg-white mb-6 mx-28'>
                        <Slider {...settings}>
                            {categorylist.map((category) => (
                                <span key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setSelectedSubCategory(category.subCategories?.[0]?.id || null); // Set first subcategory as selected
                                        setCurrentPage(1);
                                        setproductlist([])
                                    }}
                                    className={`inline-block p-4 rounded-t-lg cursor-pointer w-full ${selectedCategory === category.id
                                        ? 'text-red-600 border-b-2 border-red-600 bg-gray-100 dark:bg-gray-800 dark:text-red-500'
                                        : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {category.title}
                                </span>
                            ))}
                        </Slider>
                        <hr className='w-full border-b' />
                    </div>

                    <div className="sticky top-[55px] z-50 w-full bg-white shadow">
                        <div className="relative overflow-hidden rounded-lg md:h-12 w-full">
                            {selectedCategoryData.subCategories && selectedCategoryData.subCategories.length > 0 ? (
                                <div className="w-auto flex row mx-48 mt-1 gap-2">
                                    {selectedCategoryData.subCategories.map((subCategory, index) => (
                                        <div
                                            key={subCategory.id}
                                            onClick={() => handleSubCategoryClick(subCategory.id, index)}
                                            className={`flex-shrink-0 px-4 w-auto h-8 rounded-full flex items-center justify-center cursor-pointer ${selectedSubCategory === subCategory.id ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}
                                        >
                                            {subCategory.title}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full h-12 flex items-center justify-center">
                                    <span className="text-red-600 text-lg">No Record Found</span>
                                </div>
                            )}
                        </div>


                        {/* Slider controls */}
                        <button
                            type="button"
                            className="absolute top-0 left-32 start-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer group focus:outline-none"
                            onClick={handlePrev}
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="absolute top-0 right-32 end-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer group focus:outline-none"
                            onClick={handleNext}
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 px-4 md:px-10 cursor-pointer">
                        {productlist && productlist.length > 0 ? (
                            productlist.map((items, index) => {
                                // Determine which image to display based on availability
                                const imageUrl = items.image1
                                    ? `${process.env.REACT_APP_BASE_MEDIA_URL}${items.image1}`
                                    : items.image2
                                        ? `${process.env.REACT_APP_BASE_MEDIA_URL}${items.image2}`
                                        : `${process.env.REACT_APP_BASE_MEDIA_URL}${items.image3}`;

                                return (
                                    <>
                                        <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2" onClick={()=>handleProduct(items.id)}>
                                            <div className="border rounded-lg overflow-hidden shadow-md flex flex-col items-center">
                                                <img
                                                    src={imageUrl}
                                                    alt="Product"
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="p-2 text-center">
                                                    <span className="block font-medium">{items.productName}</span>
                                                    <span className="block text-gray-600">Rs {items.basePrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </>

                                );
                            })
                        ) : (
                            <div className="w-full text-center p-10">
                                <span className="text-red-800 text-lg">No products available</span>
                            </div>
                        )}
                        
                    </div>
                    <div className="flex justify-end mt-4">
                                            <ReactPaginate
                                                previousLabel={'Previous'}
                                                nextLabel={'Next'}
                                                breakLabel={'...'}
                                                breakClassName={'break-me'}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={3}
                                                onPageChange={handlePageClick}
                                                containerClassName={'pagination flex justify-center mt-4'}
                                                pageClassName={'page-item mx-1'} // Add space between buttons
                                                pageLinkClassName={'page-link px-3 py-2 border border-gray-300 rounded'} // Border for non-active pages
                                                previousClassName={'page-item mx-1'}
                                                previousLinkClassName={'page-link px-3 py-2 bg-primary text-white rounded'}
                                                nextClassName={'page-item mx-1'}
                                                nextLinkClassName={'page-link px-3 py-2 bg-primary text-white rounded'}
                                                activeClassName={'active'} // Active page button background color
                                                activeLinkClassName={'bg-primary-dark text-white border-none'} // Background color for active page
                                            />

                                        </div>


                </div>

            </div>
        </>
    )
}

export default TopTrending
