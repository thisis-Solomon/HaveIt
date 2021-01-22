import { useEffect, Fragment } from "react";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../messages/LoadingBox";
import ErrorMessage from "../messages/ErrorMessage";
import { listProducts } from "../actions/productActions";

function ProductsPage() {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);
    const { loading, error, products } = productsList;

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return (
        <Fragment>
            {loading ? (
                <LoadingBox/>
            ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
            ) : (
                <div className='row center'>
                    {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
            )}
        </Fragment>
    );
}

export default ProductsPage;
