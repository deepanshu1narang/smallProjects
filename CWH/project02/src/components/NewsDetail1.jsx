import React, { Component } from 'react'

export default class NewsDetail1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      favoriteColor1: "red",
      favoriteColor2: "green"
    }
  }

  static getDerivedStateFromProps(props, state){
    return {favoriteColor2: props.favCol };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("setTimeout working");
      this.setState({favoriteColor1: "blue"});
    }, 5000);

  }


  render() {
    return (
      <div>
        News Detail<br />
        MOUNT
        <h1>My Favorite Colors are {this.state.favoriteColor1} and {this.state.favoriteColor2}</h1>
        {this.props.randomProp}
      </div>
    )
  }
}
