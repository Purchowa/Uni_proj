import React, {Component} from 'react'

class Counter extends Component{
    state = {
        counter: 0
    }

    incrementCounter = () => {
        this.setState({counter: this.state.counter + 1})
    }

    getCounter = () => {
        return this.state.counter === 0 ? '0' : this.state.counter
    }

    resetCounter = () => {
        this.setState({counter: 0})
    }

    render(){
        return <div>
            <span className="badge badge-primary m-2 text-primary">{this.getCounter()}</span>
            <button className="btn btn-secondary btn-sm" onClick={this.incrementCounter}>Increase value</button>
            <button className="btn btn-danger btn-sm" onClick={this.resetCounter}>Reset value</button>
        </div>
    }
}

export default Counter