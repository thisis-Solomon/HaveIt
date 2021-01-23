import React from "react";

const CartPage = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;
    return <div>
        <p>ADD TO CART: PRODUCT ID: {productId}: QTY: {qty}</p>
    </div>;
};

export default CartPage;
