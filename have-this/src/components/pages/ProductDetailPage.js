import { Link } from "react-router-dom";
import data from "../data";
import Rating from "../Rating";

function ProductDetailPage(props) {
    const productItem = data.products.find(
        (x) => x._id === parseInt(props.match.params.id)
    );

    if (!productItem) {
        return <h3>Product not found</h3>;
    }

    return (
        <div>
            <div className='row top'>
                <Link to='/'>Go Back To result</Link>
                <div className='col-2'>
                    <img
                        className='large'
                        src={productItem.images}
                        alt={productItem.name}
                    />
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1>
                                <h1>{productItem.name}</h1>
                            </h1>
                        </li>
                        <li>
                            <Rating
                                rating={productItem.rating}
                                numberOfReviews={productItem.numberOfReviews}
                            />
                        </li>
                        <li>Price: ${productItem.price}</li>
                        <li>
                            Decription:
                            <p>{productItem.description}</p>
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
                                        ${productItem.price}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Status</div>
                                    <div>
                                        {productItem.countInStock > 0 ? (
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
                            <li>
                                <button className='primary block'>
                                    Add to Cart
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
