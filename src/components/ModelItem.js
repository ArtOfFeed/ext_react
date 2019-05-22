import React from 'react';

function ModelItem(props) {
    let { model } = props;
    return (
        <div className="product_item">
            <div className="image_item">
                <img src={model.image} alt="" />
            </div>
            <div className="info_item">
                <div className="item_name">
                    <a target="_blank" rel="noopener noreferrer" className="item_name_link" href={model.link}>{model.name}</a>
                </div>
                <div className="item_price">
                    <span className="price">{model.minPrice}</span>
                    <span className="currency">{model.currency}</span>
                    <span className="dash">&mdash;</span>
                    <span className="price">{model.maxPrice}</span>
                    <span className="currency">{model.currency}</span>
                </div>
                <div className="item_sub_info">
                    <div className="item_offers_rates sub_item">
                        <a target="_blank" rel="noopener noreferrer" href={model.link} className="item_offers">{model.offersCount} предложения</a>
                        <a target="_blank" rel="noopener noreferrer" href={model.linkReviews} className="item_rates">{model.averageRating}</a>
                    </div>
                    <div className="item_btn sub_item">
                        <a target="_blank" rel="noopener noreferrer" className="btn" href={model.link}>Сравнить цены</a>
                    </div>
                    <a target="_blank" rel="noopener noreferrer" href={model.linkReviews} className="item_reviews link sub_item">Отзывы ({model.reviewsCount})</a>
                    <a target="_blank" rel="noopener noreferrer" href={model.linkCharacteristics} className="item_characteristics link sub_item">Характеристики</a>
                </div>
            </div>
        </div>
    )
}

export default ModelItem;