import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailProduct } from "../actions/productActions";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingBox from "../messages/LoadingBox";
import Rating from "../Rating";

function ProductDetailPage(props) {
    const productId = props.match.params.id;
    const dispatch = useDispatch();
    const productsDetail = useSelector((state) => state.productsDetail);
    const { loading, error, product } = productsDetail;

    useEffect(() => {
        dispatch(detailProduct(productId));
    }, [dispatch, productId]);

    // fn() for cart btn
    const [qty, setQty] = useState(1);

    const HandleAddToCart = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <Fragment>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
            ) : (
                <div>
                    <div className='row top'>
                        <Link to='/'>Go Back To result</Link>
                        <div className='col-2'>
                            <img
                                className='large'
                                src={product.image}
                                alt={product.name}
                            />
                        </div>
                        <div className='col-1'>
                            <ul>
                                <li>
                                    <h1>
                                        <h1>{product.name}</h1>
                                    </h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numberOfReviews={
                                            product.numberOfReviews
                                        }
                                    />
                                </li>
                                <li>Price: ${product.price}</li>
                                <li>
                                    Decription:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className='col-1'>
                            <div className='card card-body'>
                                <ul>
                                    <li>
                                        <div className='row'>
                                            <div>Price</div>
                                            <div className='price'>
                                                ${product.price}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className='success'>
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className='error'>
                                                        Unavailable
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className='row'>
                                                    <div>Qty</div>
                                                    <div>
                                                        <select
                                                            value={qty}
                                                            onChange={(event) =>
                                                                setQty(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product.countInStock
                                                                ).keys(),
                                                            ].map((x) => (
                                                                <option
                                                                    value={
                                                                        x + 1
                                                                    }
                                                                >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button
                                                    className='primary block'
                                                    onClick={HandleAddToCart}
                                                >
                                                    Add to Cart
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ProductDetailPage;
