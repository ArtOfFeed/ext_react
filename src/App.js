/*global chrome*/

import React, { Component } from 'react';
import ShopOffers from './components/ShopOffers';
import ModelItem from './components/ModelItem';
import BrandLayer from './components/BrandLayer';
import Preloader from './components/Preloader';
import ShowAllLayer from './components/ShowAllLayer';
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
                console.log('fetched model', this.state.model);
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
            shopOffers = model.topPrices.map((shop, i) => <div key={i}><ShopOffers shop={shop} currency={model.currency} /></div>)
        } else {
            shopOffers = <h2>Нет предложений</h2>
        }
        if (!this.state.loading) {
            content = <div className="app_wrapper">
                <ModelItem model={model} />
                <div className="shops_list">
                    <BrandLayer />
                    <div className="wrap_shop_offers">
                        {shopOffers}
                    </div>
                    <ShowAllLayer link={model.link} />
                </div>
            </div>
        } else {
            content = <Preloader />
        }
        return (
            <div className="app">
                {content}
            </div>
        )
    }
}

export default App;
