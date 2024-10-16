// Cart.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decrementQuantity, addToCart } from '../../redux/features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import useHook from './usehook';
import TCS from 'assets/delivery Partners/TCS.png'
import Leopard from 'assets/delivery Partners/Leoaprd1.png'
import toastr from 'toastr';
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};
const Cart = () => {
    const { postStripe, postCOD, postBsecureSession } = useHook();

    const navigate = useNavigate();
    const baseMediaUrl = process.env.REACT_APP_BASE_MEDIA_URL;
    const cartItems = useSelector((state) => state.cart.carts || []);
    // Log cartItems to see the data

    const dispatch = useDispatch();

    const handleRemove = (productId) => {
        console.log("productId is ", productId)
        dispatch(removeFromCart({ id: productId.product.id }));
    };
    const getTotalPrice = () => {
        if (!Array.isArray(cartItems)) {
            return "0.00";
        }

        const prices = cartItems.map((item) => {
            if (!item || !item.product) {
                return 0;
            }

            const price = item.product.finalPrice > 0 ? item.product.finalPrice : item.product.basePrice;

            if (isNaN(price) || price <= 0) {
                return 0;
            }

            const quantity = item.quantity || 1;
            return price * quantity;
        });

        const total = prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);
        return total.toFixed(2);
    };

    // const handleIncrement = (item) => {
    //     dispatch(addToCart({
    //         product: item.product,
    //     size: item.size.size, // or item.size if it's already an object
    //     color: item.color,

    //     }));
    // };
    const handleIncrement = (item) => {
        console.log("item increment is ",item)
        if (item?.product?.id && item.size && item.color) {
            dispatch(addToCart({
                product: item.product,
                size: item.size,
                color: item.color,
            }));
        } else {
            console.warn('Invalid item properties for increment:', item);
        }
    };
    const handleDecrement = (item) => {
        if (item?.product?.id) {
            console.log('Decrementing item:', item);
            dispatch(decrementQuantity({
                product: item.product.id,
            }));
        } else {
            console.warn('Cannot decrement: item or product is undefined', item);
        }
    };

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const [deliveryMethod, setDeliveryMethod] = useState("tcs");
    const handledeliveryMethodChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

    const handleCheckout = async () => {
        try {
            if (paymentMethod === 'cod') {
                // Call the backend to create a COD order
                const formData = {
                    userId: userId,
                    paymentMethod: paymentMethod,
                    // Assuming you have a way to extract productId and amount from cartItems
                    productData: cartItems, // Adjust based on your actual data structure
                    amount: getTotalPrice()
                };
                console.log("payment method is cod ", formData)

                await postCOD(formData)
                // Redirect to a confirmation or thank you page
                navigate('/order-confirmation');
            } else if (paymentMethod === 'stripe') {
                console.log(cartItems)
                const userId = localStorage.getItem("GrandMarts_userId")
                const formData = {
                    productData: cartItems,
                    totalPrice: getTotalPrice(),
                    userId: userId,
                    paymentMethod: paymentMethod,
                }
                // Call the backend to create a Stripe payment session
                const response = await postStripe(formData)
                console.log("payment method is stripe ", formData)
                console.log('API Response:', response);
                const { clientSecret } = response.data;
                const stripe = await stripePromise;

                // Redirect to Stripe Checkout
                const { error } = await stripe.redirectToCheckout({ sessionId: clientSecret });
                if (error) {
                    console.error('Stripe checkout error:', error);
                }
            }
            else if (paymentMethod === 'bsecure') {
                // Handle Bsecure payment method
                const userId = localStorage.getItem("GrandMarts_userId")
                const formData = {
                    productData: cartItems,
                    totalPrice: getTotalPrice(),
                    userId: userId,
                    paymentMethod: paymentMethod,
                };

                // Send request to your server to create a Bsecure payment session
                const response = await postBsecureSession(formData);
                console.log("payment method is bsecure ", response);
                if (response.paymentResponse.status === 200) {
                    window.open(response.paymentResponse.body.checkout_url);
                    // navigate('/payout-form', { state: { formData } });
                } else {
                    toastr.error("Failed to process the Bsecure payment. Please try again or contact support.");
                }
                // Redirect to Bsecure payment page
                // const { paymentUrl } = response.data;
                // window.location.href = paymentUrl;
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };
    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Shopping Cart
                    </h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                {cartItems.map((item, index) => (
                                    <>
                                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" key={index}>
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <img
                                                        className="h-20 w-20"
                                                        src={
                                                            item.product.image1
                                                                ? `${baseMediaUrl}/${item.product.image1}`
                                                                : item.product.image2
                                                                    ? `${baseMediaUrl}/${item.product.image2}`
                                                                    : `${baseMediaUrl}/${item.product.image3}`
                                                        }
                                                        alt="product image"
                                                    />
                                                </a>

                                                <label htmlFor="counter-input" className="sr-only">
                                                    Choose quantity:
                                                </label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <button onClick={() => handleDecrement(item)}
                                                            type="button"
                                                            id="decrement-button"
                                                            data-input-counter-decrement="counter-input"
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                        >
                                                            <svg
                                                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 2"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M1 1h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <input
                                                            type="text"
                                                            id="counter-input"
                                                            data-input-counter=""
                                                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                                            placeholder=""
                                                            value={item.quantity}
                                                            required=""
                                                        />
                                                        <button onClick={() => handleIncrement(item)}
                                                            type="button"
                                                            id="increment-button"
                                                            data-input-counter-increment="counter-input"
                                                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                        >
                                                            <svg
                                                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 1v16M1 9h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">
                                                            Rs {item.product.finalPrice > 0 ? item.product.finalPrice : item.product.basePrice}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <span
                                                        className="text-base font-medium text-gray-900 hover:underline dark:text-white capitalize"
                                                    >
                                                        {item.product.productName}
                                                    </span>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Size: {item.size && item.size.size ? item.size.size : "N/A"}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Color: <span style={{ backgroundColor: item.color ? item.color : "NA", marginLeft: "12px" }} className="w-4 h-4 inline-block rounded-full"></span>
                                                    </p>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            type="button" onClick={() => handleRemove(item)}
                                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                        >
                                                            <svg
                                                                className="me-1.5 h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={24}
                                                                height={24}
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M6 18 17.94 6M18 18 6.06 6"
                                                                />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                ))}
                            </div>
                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Order summary
                                    </p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                    Subtotal
                                                </dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                    base price
                                                </dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                    Delivery Charges
                                                </dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                    $799
                                                </dd>
                                            </dl>
                                        </div>
                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">
                                                Total
                                            </dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">
                                                Rs {getTotalPrice()}
                                            </dd>
                                        </dl>
                                    </div>
                                    {/* Payment Method */}
                                    <div className="space-y-2">
                                        <p className="text-base font-semibold">Payment Method</p>
                                        <div className="flex flex-col">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={paymentMethod === "cod"}
                                                    onChange={handlePaymentMethodChange}
                                                    className="mr-2"
                                                />
                                                Cash on Delivery
                                            </label>
                                            {/* <label className="flex">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="stripe"
                                                    checked={paymentMethod === "stripe"}
                                                    onChange={handlePaymentMethodChange}
                                                    className="mr-2"
                                                />
                                                Card Payment
                                            </label> */}
                                            <label className="flex">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="bsecure"
                                                    checked={paymentMethod === "bsecure"}
                                                    onChange={handlePaymentMethodChange}
                                                    className="mr-2"
                                                />
                                                Bsecure Payment
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-base font-semibold">Pick Your Preferred Courier</p>
                                        <div className="flex flex-col">
                                            <label className={`flex items-center rounded-md p-6 ${deliveryMethod === "tcs" ? 'border border-primary-dark' : ' border border-gray-500 '}`}>
                                                <input
                                                    type="radio"
                                                    name="deliveryPartners"
                                                    value="tcs"
                                                    checked={deliveryMethod === "tcs"}
                                                    onChange={handledeliveryMethodChange}
                                                    className="mr-2 text-primary-dark"
                                                />
                                                <img src={TCS} className='w-56 h-24' />
                                            </label>
                                            <label className={`flex items-center rounded-md p-6 mt-3 ${deliveryMethod === "leopard" ? 'border border-primary-dark' : ' border border-gray-500 '}`}>
                                                <input
                                                    type="radio"
                                                    name="deliveryPartners"
                                                    value="leopard"
                                                    checked={deliveryMethod === "leopard"}
                                                    onChange={handledeliveryMethodChange}
                                                    className="mr-2"
                                                />
                                                <img src={Leopard} className='w-56 h-24' />

                                            </label>
                                            {/* <label className="flex">
                                                <input
                                                    type="radio"
                                                    name="deliveryPartners"
                                                    value="starlink"
                                                    checked={deliveryMethod === "starlink"}
                                                    onChange={handledeliveryMethodChange}
                                                    className="mr-2"
                                                />
                                                Starlink
                                            </label> */}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-base font-semibold">Address Confirmation</p>
                                        <div className="flex flex-col">
                                            <span>Address here</span>
                                        </div>
                                    </div>

                                    <span onClick={handleCheckout}
                                        className="cursor-pointer flex w-full items-center justify-center rounded-lg bg-primary-dark px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Proceed to Checkout
                                    </span>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            {" "}
                                            or{" "}
                                        </span>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                                        >
                                            Continue Shopping
                                            <svg
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 12H5m14 0-4 4m4-4-4-4"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;

