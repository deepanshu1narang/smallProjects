import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import Notes from './components/Notes';
import {
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  constructor(props){
    super(props);
    this.pageSize = 18;
    this.state ={
      progress : 0,
    }
  }

  setProgress = (progress) => {
    this.setState({progress : progress});
  }

  apiKey = process.env.REACT_APP_NEWS_API_KEY; //using the file from env local
  
  render() {
    return (
      <div className='App'>
        <LoadingBar
        color='red'
        progress={this.state.progress}
        />
        <Navbar />
          <div className='container my-3'>
            <Routes>
            <Route exact path="/" element={<NewsComponent setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="general" />} />
            <Route exact path="/business" element={<NewsComponent setProgress={this.setProgress} key="business" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="business" />} />
            <Route exact path="/health" element={<NewsComponent setProgress={this.setProgress} key="health" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="health" />} />
            <Route exact path="/science" element={<NewsComponent setProgress={this.setProgress} key="science" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="science" />} />
            <Route exact path="/sports" element={<NewsComponent setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="sports" />} />
            <Route exact path="/technology" element={<NewsComponent setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="technology" />} />
            <Route exact path="/entertainment" element={<NewsComponent setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country="in" category="entertainment" />} />
            <Route exact path="/notes" element={<Notes />} />
          </Routes>
        </div>

        <Footer />
      </div>
    )
  }
}
