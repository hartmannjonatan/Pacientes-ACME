import React from 'react'

export default class Teste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {num: null};
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        fetch(window.location.href+'number')
        .then((response) => response.json())
        .then((data) =>
            this.setState({num: data})
        );
      }
    
      render() {
        return (
          <button onClick={this.handleClick}>
            {this.state.num != null ? 'feito' : 'Clique'}
          </button>
        );
      }
}