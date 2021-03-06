import './StatisticPage.scss'
import React, { Component } from 'react'
import Chart from '../../cmps/Chart'
import moment from 'moment'
import { bitcoinService } from '../../services/BitcoinService'
export default class StatisticPage extends Component {

    state = {
        marketPrices: [],
        confirmedTrans: [],
        tradeVolume: []
    }

    async componentDidMount() {
        this.getMarketPrices()
        this.getConfirmedTransactions()
        this.getTradeVolume()
    }

    async getMarketPrices() {
        let marketPrices = await bitcoinService.getMarketPrices()
        marketPrices = marketPrices.values.map(value => {
            value.x = value.x * 1000;
            value.x = moment(value.x).format('MMM Do');
            return value
        })
        this.setState({ marketPrices })
    }

    async getConfirmedTransactions() {
        let confirmedTrans = await bitcoinService.getConfirmedTransactions()
        confirmedTrans = confirmedTrans.values.map(value => {
            value.x = value.x * 1000;
            value.x = moment(value.x).format('MMM Do');
            return value
        })
        this.setState({ confirmedTrans })
    }

    async getTradeVolume() {
        let tradeVolume = await bitcoinService.getTradeVolume()
        tradeVolume = tradeVolume.values.map(value => {
            value.x = value.x * 1000;
            value.x = moment(value.x).format('MMM Do');
            return value
        })
        this.setState({ tradeVolume })
    }

    render() {
        return (
            <div className="statistcs-page flex column justify-center align-center">
                <h2 className="statistcs-title">Bitcoin Statistcs</h2>
                <div className="chart1-container">
                    <Chart className="market-price-chart" data={this.state.marketPrices} title="Market Price" desc="The average USD market price across major bitcoin exchanges." color="pink" />
                </div>
                <div className="chart2-container">
                    <Chart className="confirmed-trans-chart" data={this.state.confirmedTrans} title="Exchange Trade Volume (USD)" desc="The total USD value of trading volume on major bitcoin exchanges." color="lightblue" />
                </div>
                <div className="chart3-container">
                    <Chart className="trade-volume-chart" data={this.state.tradeVolume} title="Average Block Size" desc="The average block size over the past 24 hours in megabytes." color="green" />
                </div>
            </div>
        )

    }
}
