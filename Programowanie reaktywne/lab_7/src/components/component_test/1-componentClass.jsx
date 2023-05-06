import React, {Component} from 'react' // React to export default, a {Component} to poszczególne exporty

class Test_1 extends Component{
    state = {
        value: 0
    }

    setStateValue = () =>{
        this.setState({value: 1})
    }

    render(){
        return <div>
            <p>{this.state.value}</p>
            <button className="btn btn-secondary" onClick={this.setStateValue}>Set value</button>
        </div>
    }
}

export default Test_1