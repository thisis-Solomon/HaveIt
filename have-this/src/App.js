import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import CartPage from "./components/pages/CartPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import ProductsPage from "./components/pages/ProductsPage";
import RegisterPage from "./components/pages/RegisterPage";
import SigninPage from "./components/pages/SigninPage";

function App() {
    return (
        <BrowserRouter>
            <div className='grid-container'>
                <Header />
                <main>
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/signin' component={SigninPage} />
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
