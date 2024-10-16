import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import useHook from './usehook';
import Trending from 'assets/common/TopTrending.jpg'
import TopTrending from 'pages/top-trending';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { getBanner, getCategories } = useHook();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: "100%"
    };
    const navigate=useNavigate();
    const [bannerlist, setBannerlist] = useState([])

    const fetchBanner = async () => {
        try {
            const response = await getBanner();
            console.log("API response:", response); // Debug the full response
            if (response && response.data && Array.isArray(response.data)) {
                setBannerlist(response.data);
                console.log("jsksjdksjdksjdksjdsdjksjd", bannerlist)
            } else {
                console.log("Unexpected response format", response);
            }
        } catch (error) {
            console.error("Failed to fetch banner:", error);
        }
    };
    // Fetch Categories and Banners
    useEffect(() => {
        fetchBanner();
    }, []);
    const [categorieslist, setCategorieslist] = useState([])
    useEffect(() => {
        // Call getCategories only once when component mounts
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategorieslist(response.categories)
            console.log("categories list is:-", categorieslist)
            console.log("categries", response)
            // Handle the response if needed
        };

        fetchCategories();
    }, []);
    const handleCategorylist=(id)=>{
         navigate(`/productlisting/${id}`)
    }
    return (
        <>
            <div className="overflow-hidden">
                <Slider {...settings}>
                    {bannerlist.map((item, index) => (
                        <div key={index}>
                            <img className='object-center w-full max-w-full h-[400px]'
                                src={`${process.env.REACT_APP_BASE_MEDIA_URL}${item.imageUrl}`}
                                alt={`Banner ${index + 1}`}
                            // Ensure images fit the slider container
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className='mt-5'>
                <h4 className='text-center text-2xl font-semibold'>Top Category</h4>
                <div className="mt-5 mx-20">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-10">
                        {categorieslist.map((item, index) => (
                            <div key={index} className="flex justify-center cursor-pointer">
                                <span className="block max-w-sm bg-white rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={()=>handleCategorylist(item.id)}>
                                    <img
                                        src={`${process.env.REACT_APP_BASE_MEDIA_URL}${item.categoryImage}`}
                                        alt={item.title || "Category image"}
                                        className="w-[150px] h-[150px] object-cover"
                                    />
                                    <h5 className="mb-2 text-md text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {item.title}
                                    </h5>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div >
                {/* banner Top Trending */}
                <img src={Trending} alt="trending" className='h-52 w-full' />
                {/* top trending component */}

                <div className=''>
                    <TopTrending />
                </div>

            </div>
        </>
    )
}
export default Home
