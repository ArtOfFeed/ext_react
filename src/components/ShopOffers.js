import React from 'react';

function ShopOffers(props) {
    let {shop} = props;
    let {currency} = props;
    return (
        <div className="shop_offer">
            <div className="shop_name">
                <a target="_blank" rel="noopener noreferrer"  href={shop.url}>{shop.firm_name}</a>
            </div>
            <div className="shop_info">
                <div className="shop_img shop_info_item">
                    <img src={shop.firm_logo} alt="" />
                </div>
                <div className="shop_price shop_info_item">
                    <span className="price">{shop.price}</span>
                    <span className="currency">{currency}</span>
                </div>
                <div className="shop_btn shop_info_item">
                    <a target="_blank" rel="noopener noreferrer"  href={shop.url} className="btn">Купить</a>
                </div>
            </div>
        </div>
    );
}

export default ShopOffers;