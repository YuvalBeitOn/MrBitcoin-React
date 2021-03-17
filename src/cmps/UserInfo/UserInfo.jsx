// import React from 'react'
// import './UserInfo.scss'
// import usdImg from '../../assets/icons/coins.png'
// import bitcoinImg from '../../assets/icons/bitcoin.png'

// export default function UserInfo(props) {

//     handleMouseIn() {
//         this.setState({ hover: true })
//     }

//     handleMouseOut() {
//         this.setState({ hover: false })
//     }

//     const { user, rate } = props;
//     const userUsdRate = (1 / rate * user.coins).toFixed(2)
//     return (
//         <div className="user-info flex column">
//             <img className="user-img" src={user.imgUrl} alt="user-img" />
//             <div className="user-container flex align-center">
//                 <div className={"online-sign " + (navigator.onLine ? ' online ' : ' offline ')} onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}></div>
//                 <span className="user-title">Hello {user.name}!</span>
//             </div>
//             <span className="coins-txt flex align-center"><img className="coins-img" src={usdImg} alt="usd-img"></img> <span className="coin-txt">USD: </span> {userUsdRate}</span>
//             <span className="coins-txt flex align-center"><img className="coins-img" src={bitcoinImg} alt="bitcoin-img"></img> <span className="coin-txt">BTC: </span> {user.coins}</span>
//         </div>
//     )
// }

import React, { Component } from 'react'
import './UserInfo.scss'
import usdImg from '../../assets/icons/coins.png'
import bitcoinImg from '../../assets/icons/bitcoin.png'

export default class UserInfo extends Component {

    state = {
        hover: false
    }

    handleMouseIn() {
        this.setState({ hover: true })
    }

    handleMouseOut() {
        this.setState({ hover: false })
    }

    render() {
        const { user, rate } = this.props;
        const userUsdRate = (1 / rate * user.coins).toFixed(2)
        const toolTipTxt = navigator.onLine? 'Online' : 'Offline'
        const tooltipStyle = {
            display: this.state.hover ? 'block' : 'none'
        }
        return (
            <div className="user-info flex column">
                <img className="user-img" src={user.imgUrl} alt="user-img" />
                <div className="user-container flex align-center">
                    { toolTipTxt && tooltipStyle && <div className={"online-sign " + (navigator.onLine ? ' online ' : ' offline ')} onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                        <div className="tool-tip" style={tooltipStyle}>{toolTipTxt}</div>
                    </div>}
                    <span className="user-title">Hello {user.name}!</span>
                </div>
                <span className="coins-txt flex align-center"><img className="coins-img" src={usdImg} alt="usd-img"></img> <span className="coin-txt">USD: </span> {userUsdRate}</span>
                <span className="coins-txt flex align-center"><img className="coins-img" src={bitcoinImg} alt="bitcoin-img"></img> <span className="coin-txt">BTC: </span> {user.coins}</span>
            </div>

        )
    }
}
