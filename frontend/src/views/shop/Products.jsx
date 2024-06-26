import { React, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingCart, FaSpinner } from 'react-icons/fa';

import apiInstance from '../../utils/axios';
import Addon from '../plugin/Addon';
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CartID from '../plugin/cartID';
import { addToCart } from '../plugin/AddToCart';
import { addToWishlist } from '../plugin/addToWishlist';
import { CartContext } from '../plugin/Context';

function Products() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

    const [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
    const [loadingStates, setLoadingStates] = useState({});
    const [loading, setLoading] = useState(true);

    const axios = apiInstance;
    const addon = Addon();
    const currentAddress = GetCurrentAddress();
    const userData = UserData();
    const cart_id = CartID();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [colorImage, setColorImage] = useState("");
    const [colorValue, setColorValue] = useState("No Color");
    const [sizeValue, setSizeValue] = useState("No Size");
    const [qtyValue, setQtyValue] = useState(1);
    const [cartCount, setCartCount] = useContext(CartContext);

    // Pagination
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    async function fetchData(endpoint, setDataFunction) {
        try {
            const response = await axios.get(endpoint);
            setDataFunction(response.data);
            if (products) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData('products/', setProducts);
        fetchData('featured-products/', setFeaturedProducts);
        fetchData('category/', setCategory);
        fetchData('brand/', setBrand);
    }, []);

    const handleColorButtonClick = (event, product_id, colorName, colorImage) => {
        setColorValue(colorName);
        setColorImage(colorImage);
        setSelectedProduct(product_id);
        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [product_id]: colorName,
        }));
    };

    const handleSizeButtonClick = (event, product_id, sizeName) => {
        setSizeValue(sizeName);
        setSelectedProduct(product_id);
        setSelectedSize((prevSelectedSize) => ({
            ...prevSelectedSize,
            [product_id]: sizeName,
        }));
    };

    const handleQtyChange = (event, product_id) => {
        setQtyValue(event.target.value);
        setSelectedProduct(product_id);
    };

    const handleAddToCart = async (product_id, price, shipping_amount) => {
        setLoadingStates((prevStates) => ({
            ...prevStates,
            [product_id]: 'Adding...',
        }));

        try {
            await addToCart(product_id, userData?.user_id, qtyValue, price, shipping_amount, currentAddress.country, colorValue, sizeValue, cart_id, setIsAddingToCart);

            setLoadingStates((prevStates) => ({
                ...prevStates,
                [product_id]: 'Added to Cart',
            }));

            setColorValue("No Color");
            setSizeValue("No Size");
            setQtyValue(0);

            const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
            const response = await axios.get(url);

            setCartCount(response.data.length);
            console.log(response.data.length);
        } catch (error) {
            console.log(error);
            setLoadingStates((prevStates) => ({
                ...prevStates,
                [product_id]: 'Add to Cart',
            }));
        }
    };

    const handleAddToWishlist = async (product_id) => {
        try {
            await addToWishlist(product_id, userData?.user_id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {loading === false && (
                <div>
                    <main className="mt-5">
                        <div className="container">
                            <section className="text-center container">
                                <div className="row mt-4 mb-3">
                                    <div className="col-lg-6 col-md-8 mx-auto">
                                        <h1 className="fw-light">ElectroBazaar: Explore Latest in Tech</h1>
                                        <p className="lead text-muted">Our Latest Categories</p>
                                    </div>
                                </div>
                            </section>
                            <div className="d-flex justify-content-center">
                                {category.map((c, index) => (
                                    <div key={index} className="align-items-center d-flex flex-column" style={{ background: "#e8e8e8", marginLeft: "10px", borderRadius: "10px", padding: "30px" }}>
                                        <img
                                            src={c.image}
                                            alt=""
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                        <p><a href="" className="text-dark">{c.title}</a></p>
                                    </div>
                                ))}
                            </div>

                            <section className="text-center container">
                                <div className="row mt-4 mb-3">
                                    <div className="col-lg-6 col-md-8 mx-auto">
                                        <h1 className="fw-light">Featured Products </h1>
                                        <p className="lead text-muted">Our Featured Products</p>
                                    </div>
                                </div>
                            </section>
                            <section className="text-center">
                                <div className="row">
                                    {currentItems.map((product, index) => (
                                        <div className="col-lg-4 col-md-12 mb-4" key={index}>
                                            <div className="card">
                                                <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                                                    <Link to={`/detail/${product.slug}`}>
                                                        <img
                                                            src={(selectedProduct === product.id && colorImage) ? colorImage : product.image}
                                                            className="w-100"
                                                            style={{ width: "100px", height: "300px", objectFit: "cover" }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <h6>By: <Link to={`/vendor/${product?.vendor?.slug}`}>{product.vendor.name}</Link></h6>
                                                    <Link to={`/detail/${product.slug}`} className="text-reset"><h5 className="card-title mb-3 ">{product.title.slice(0, 30)}...</h5></Link>
                                                    <Link to="/" className="text-reset"><p>{product?.brand.title}</p></Link>
                                                    <h6 className="mb-1">₹{product.price}</h6>

                                                    {((product.color && product.color.length > 0) || (product.size && product.size.length > 0)) ? (
                                                        <div className="btn-group">
                                                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                                                                Variation
                                                            </button>
                                                            <ul className="dropdown-menu" style={{ maxWidth: "400px" }} aria-labelledby="dropdownMenuClickable">
                                                                {/* Quantity */}
                                                                <div className="d-flex flex-column mb-2 mt-2 p-1">
                                                                    <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                        <li>
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                placeholder="Quantity"
                                                                                onChange={(e) => handleQtyChange(e, product.id)}
                                                                                min={1}
                                                                                defaultValue={1}
                                                                            />
                                                                        </li>
                                                                    </div>
                                                                </div>

                                                                {/* Size */}
                                                                {product?.size && product?.size.length > 0 && (
                                                                    <div className="d-flex flex-column">
                                                                        <li className="p-1"><b>Size</b>: {selectedSize[product.id] || 'Select a size'}</li>
                                                                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                            {product?.size?.map((size, index) => (
                                                                                <li key={index}>
                                                                                    <button
                                                                                        className="btn btn-secondary btn-sm me-2 mb-1"
                                                                                        onClick={(e) => handleSizeButtonClick(e, product.id, size.size)}
                                                                                    >
                                                                                        {size.size}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Color */}
                                                                {product?.color && product?.color.length > 0 && (
                                                                    <div className="d-flex flex-column">
                                                                        <li className="p-1"><b>Color</b>: {selectedColors[product.id] || 'Select a color'}</li>
                                                                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                            {product?.color?.map((color, index) => (
                                                                                <li key={index}>
                                                                                    <button
                                                                                        className="btn btn-secondary btn-sm me-2 mb-1"
                                                                                        onClick={(e) => handleColorButtonClick(e, product.id, color.color_name, color.image)}
                                                                                    >
                                                                                        {color.color_name}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div className="btn-group">
                                                            <div className="d-flex flex-column mb-2 mt-2 p-1">
                                                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Quantity"
                                                                        onChange={(e) => handleQtyChange(e, product.id)}
                                                                        min={1}
                                                                        defaultValue={1}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="mt-3">
                                                        <button
                                                            className="btn btn-primary shadow-0 me-1"
                                                            onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                                        >
                                                            {loadingStates[product.id] === 'Adding...' ? <FaSpinner className="spinner-icon" /> : <FaShoppingCart />}
                                                            {loadingStates[product.id] === 'Added to Cart' ? <FaCheckCircle /> : ' Add to cart'}
                                                        </button>
                                                        <button
                                                            className="btn btn-light border px-2 pt-2 icon-hover"
                                                            onClick={() => handleAddToWishlist(product.id)}
                                                        >
                                                            <i className="fas fa-heart fa-lg text-secondary px-1"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                        </li>
                                        {pageNumbers.map(number => (
                                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(number)}>{number}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            )}
            {loading === true && (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Products;
