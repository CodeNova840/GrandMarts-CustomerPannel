import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useHook from './usehook';

const SubcatagoryProductListing = () => {
    const { getproductlistbySubCatagory } = useHook();
    const { id } = useParams();
    // const { getproductlist } = useHook();


    const [sortOption, setSortOption] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0); // Total number of pages
    const [currentPage, setCurrentPage] = useState(1);

    const getprodyucts = async () => {
        const params = {
            page: currentPage,
            limit: 20,
            sortOption: sortOption,
            priceRange: priceRange,
            searchTerm: searchTerm,
        }
        try {
            const response = await getproductlistbySubCatagory(id, params);
            setProducts(response.products);
            setPageCount(response.totalPages);
            console.log("Products search response is", response.products);
        } catch (error) {
            console.log("Error fetching products");
        }
    };

    useEffect(() => {
        getprodyucts();
    }, [sortOption, priceRange, searchTerm, currentPage]);
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };


    return (
        <>
            <nav className='bg-primary-dark py-4 px-20'>
                <div className='mt-6 flex row justify-between items-center'>
                    <div className='flex row items-center gap-4'>
                        <span className='text-2xl text-white font'>Filter by:</span>
                        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption} className='outline-none h-[48px] ps-4 w-[200px] rounded-md'>
                            <option value="">Sort by</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="discountLowHigh">Discount: Low to High</option>
                            <option value="discountHighLow">Discount: High to Low</option>
                        </select>

                        <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange} className='outline-none h-[48px] ps-4 w-[200px] rounded-md'>
                            <option value="">Select Price Range</option>
                            <option value="0 - 5000">0 - 5000</option>
                            <option value="5001 - 10000">5001 - 10000</option>
                            <option value="10001 - 20000">10001 - 20000</option>
                            <option value="20001 - 400000">20,001 - 40,0000</option>
                        </select>
                    </div>

                    <div className='relative inline-block'>
                        <input
                            type="text"
                            placeholder="Search products" className='outline-none h-[48px] ps-4 w-[200px] rounded-md'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className='absolute left-[170px] top-[50%] text-primary-dark' style={{
                            transform: 'translateY(-50%)',
                        }} />
                    </div>
                </div>

            </nav>
            {/* Render the filtered products here */}
            <div className='flex flex-wrap justify-between mx-4'>
                {products.length === 0 ? (
                    <div className="text-center text-xl font-semibold py-4 mt-64">
                        No data available
                    </div>
                ) : (
                    products.map((product, index) => (
                        <div key={index} className='w-1/4 p-4 shadow-md cursor-pointer' onClick={() => handleProduct(product.id)}>
                            <div className='flex flex-col items-center gap-1'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={`${process.env.REACT_APP_BASE_MEDIA_URL}${product.image1}`}
                                    alt={product.productName}
                                />
                                {/* Display product information */}
                                <h2 className='text-center text-2xl capitalize font-semibold'>{product.productName}</h2>
                                <p className='text-center'>Rs {product.basePrice}</p>
                            </div>
                        </div>
                    ))
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
        </>
    )
}

export default SubcatagoryProductListing;
