import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userAction";

const Header = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signout());
    };
    return (
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
                        <span className='badge'>{cartItems.length}</span>
                    )}
                </Link>
                {userInfo ? (
                    <div className='dropdown'>
                        <Link to='#'>
                            {userInfo.name}{" "}
                            <i className='fa fa-caret-down'></i>
                        </Link>
                        <ul className='dropdown-content'>
                            <Link to='#signin' onClick={handleSignOut}>
                                Logout
                            </Link>
                        </ul>
                    </div>
                ) : (
                    <Link to='/signin'>Sign In</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
