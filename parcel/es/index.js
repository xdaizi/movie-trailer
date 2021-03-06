import React from 'react'
import { render } from 'react-dom'
import App from './app.js'

class AppContainer extends React.Component {
    state = {
        name: 'Parcel 打包案例'
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                name: 'Parcel 打包包'
            })
        }, 2000)
    }
    render () {
        return <App name={this.state.name}/>
    }
}

render(
    <AppContainer/>,
    document.getElementById('app')
)