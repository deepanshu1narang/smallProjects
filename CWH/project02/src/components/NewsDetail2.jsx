import React, { Component } from 'react'

export default class NewsDetail2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            song1 : "cheap thrills",
            song2 : "idgaf",
            song3 : "unravel",
            song4 : "safar"
        }
    }

    static getDerivedStateFromProps(props, state){
        return { song1 : props.coolSong};
    }

    shouldComponentUpdate(){
        return true;
    }

    updateSongName = () => {
        this.setState({song2 : "sign"});
    }  // only arrow functions can e written here

    componentDidMount(){
        setTimeout(() => {
            this.setState({song3 : "silhoutte"});
            this.setState({song4 : "suzume no tojimari"});
        }, 5000);
    };

    getSnapshotBeforeUpdate(prevProps, prevState){
        document.getElementById('d1').innerHTML = "Before the update song3 was " + prevState.song3;
        return null;
    } // does not work properly if we don't use componentDIdUpdate with getSnapShotBeforeUpdate

    componentDidUpdate(){
        document.getElementById('d2').innerHTML = "After the update song3 is " + this.state.song3;
        document.getElementById('d3').innerHTML= "the updated value of song4 is " + this.state.song4;
    }

    // componentDidMount(){
    //     setTimeout(() => {
    //         this.setState({song4 : "suzume no tojimari"});
    //     }, 5000);
    // };

    // componentDidUpdate(){
    //     document.getElementById('d3').innerHTML= "the updated value of song4 is " + this.state.song4;
    // } // can work independently without getSnapShotBeforeUpdate
    

  render() { 
    return (
      <div>
        UPDATE
        <p>song1 is {this.state.song1}</p>
        <p onClick={this.updateSongName}>song 2 is {this.state.song2}</p>
        <p>song3 is {this.state.song3}</p>
        <p>song4 is {this.state.song4}</p>
        <div id="d1"></div>
        <div id="d2"></div>
        <div id="d3"></div>
        <span>
        It is a bad practice to write componentDidMount and other methods to write multiple times and it creates errors too. 
        <h6>QUICK TIP:</h6>
            <li>FIrstly write all componentDidMount and componentDIdUpdate as you please and then write all of them in the one only.</li>
        </span>
      </div>
    )
  }
}
