/** @format */

import { BrowserRouter, Route } from 'react-router-dom';
import CartPage from './components/pages/CartPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import ProductsPage from './components/pages/ProductsPage';

function App() {
	return (
		<BrowserRouter>
			<div className='grid-container'>
				<header className='row'>
					<div>
						<a className='brand' href='/'>
							HaveIt
						</a>
					</div>
					<div>
						<a href='/cart'>Cart</a>
						<a href='/signin'>Sign In</a>
					</div>
				</header>
				<main>
					<Route path="/cart/:id?" component={CartPage}/>
					<Route exact path='/' component={ProductsPage}/>
					<Route path='/product/:id' component={ProductDetailPage}/>
				</main>
				<footer className='row center'>All right reserverd </footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
