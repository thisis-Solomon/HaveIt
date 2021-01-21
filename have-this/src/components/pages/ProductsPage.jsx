import { useState, useEffect, Fragment } from "react";
import Product from "../Product";
import axios from "axios";
import LoadingBox from "../messages/LoadingBox";
import ErrorMessage from "../messages/ErrorMessage";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("/api/products");
                setIsLoading(false);
                setProducts(data);
            } catch (error) {
                setIsError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <Fragment>
            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : isError ? (
                <ErrorMessage variant='danger'>{isError}</ErrorMessage>
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
