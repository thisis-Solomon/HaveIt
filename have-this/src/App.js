import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartPage from "./components/pages/CartPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import ProductsPage from "./components/pages/ProductsPage";

function App() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <BrowserRouter>
            <div className='grid-container'>
                <header className='row'>
                    <div>
                        <Link className='brand' to='/'>
                            HaveIt
                        </Link>
                    </div>
                    <div>
                        <Link to='/cart'>
                            Cart
                            {cartItems.length > 0 && (
                                <span className='badge'>
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        <Link to='/signin'>Sign In</Link>
                    </div>
                </header>
                <main>
                    <Route path='/cart/:id?' component={CartPage} />
                    <Route exact path='/' component={ProductsPage} />
                    <Route path='/product/:id' component={ProductDetailPage} />
                </main>
                <footer className='row center'>All right reserverd </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
