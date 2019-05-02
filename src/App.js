/*global chrome*/

import React, { Component } from 'react';
import logo from './logo.svg';
import logoWithoutLetters from './logos/price_no_letters.svg';
import logoPrice from './logos/price.svg';
import './App.css';

class App extends Component {

    state = {
        model: {},
        user: {},
        loading: false
    }

    getMask(obj) {
        const rulesUrl = 'http://price.live.npc.vovk.dev2.price.ua/api/v4/extension/rules';
        let params = {
            method: 'post',
            headers: {
                "Authorization": obj.token
            }
        }
        fetch(rulesUrl, params)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.sendMask(data);
            })
            .catch(err => console.error(err))
    }

    sendMask(data) {
        var info = data;
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, neededTabs);

        function neededTabs(tabs) {
            let rulesObj = {};
            rulesObj.rules = info.response.rules;
            chrome.tabs.sendMessage(tabs[0].id, rulesObj);
        }
    }

    getModel(model, obj) {
        console.log(model, obj);
        const searchUrl = `http://price.live.npc.vovk.dev2.price.ua/api/v4/extension/search/query/${model}`;
        let params = {
            method: 'post',
            headers: {
                "Authorization": obj.token
            }
        }

        fetch(searchUrl, params)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ model: data.response })
                this.setState({ loading: false })
                console.log(this.state.model)
            })
            .catch(err => console.error(err))
    }

    parsedModel() {
        chrome.runtime.onMessage.addListener((request, sender, sendRequest) => {
            this.getModel(request.model_name, this.state.user);
        })
    }

    componentDidMount() {
        this.setState({ loading: true })
        chrome.storage.sync.get(null, (items) => {
            this.setState({ user: items });
            this.getMask(this.state.user);
        });
        this.parsedModel();
    }

    render() {
        const { model } = this.state;
        let content;
        let shopOffers;
        if (model.topPrices) {
            shopOffers = model.topPrices.map((shop, i) => <div key={i} className="shop_offer">
                <div className="shop_name">
                    <a href={shop.link}>{shop.firmName}</a>
                </div>
                <div className="shop_info">
                    <div className="shop_img shop_info_item">
                        <img src={shop.logo} alt="" />
                    </div>
                    <div className="shop_price shop_info_item">
                        <span className="price">{shop.price}</span>
                        <span className="currency">{model.currency}</span>
                    </div>
                    <div className="shop_btn shop_info_item">
                        <a href={shop.link} className="btn">Купить</a>
                    </div>
                </div>
            </div>
            )
        } else {
            shopOffers = <h2>Нет предложений</h2>
        }
        if (!this.state.loading) {
            content = <div className="app_wrapper">
                <div className="product_item">
                    <div className="image_item">
                        <img src={model.image} alt="" />
                    </div>
                    <div className="info_item">
                        <div className="item_name">
                            <a className="item_name_link" href={model.link}>{model.name}</a>
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
                                <a href={model.link} className="item_offers">{model.offersCount} предложения</a>
                                <a href={model.linkReviews} className="item_rates">{model.averageRating}</a>
                            </div>
                            <div className="item_btn sub_item">
                                <a className="btn" href={model.link}>Сравнить цены</a>
                            </div>
                            <a href={model.linkReviews} className="item_reviews link sub_item">Отзывы ({model.reviewsCount})</a>
                            <a href={model.linkCharacteristics} className="item_characteristics link sub_item">Характеристики</a>
                        </div>
                    </div>
                </div>
                <div className="shops_list">
                    <div className="brand_layer">
                        <img src={logoWithoutLetters} alt="" />
                    </div>

                    <div className="wrap_shop_offers">
                        {shopOffers}
                    </div>
                    <div className="show_all">
                        <a className="link" href={model.link}>Посмотреть все</a>
                    </div>
                </div>
            </div>
        } else {
            content = <div className="wrapper_preload">
                <div className="inner_preload">
                    <img src={logoPrice} alt="" />
                </div>
            </div>
        }
        return (
            <div className="app">
                {content}
            </div>
        )
    }
}

export default App;
