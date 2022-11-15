import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import About from './components/About';
import {
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';

export default class App extends Component {
  // it's a class so obviously we don't use let var const etc for writing methods
  // open class concepts of JS in another tab

  // apiKey = "a3a09737ec3c45b29753bc4943e2ee55"; 
  // easy right.... but it is unsecure method and we generally need to store these types of data in .env.local because it is ignored by git and hence out api key is safe
  apiKey = process.env.REACT_APP_NEWS_API_KEY; //using the file from env local
  // {console.log(apiKey)}
  // it needs to restart the dev server so that env.local could be loaded too

  render() {
    return (
      <div className='App'>
        <Navbar />
        <About />
        {console.log(this.apiKey)}
          <div className='container my-3'>
            <Routes>
            <Route exact path="/" element={<NewsComponent key="general" pageSize={20} apiKey={this.apiKey} country="in" category="general" />} />
            <Route exact path="/business" element={<NewsComponent key="business" pageSize={20} apiKey={this.apiKey} country="in" category="business" />} />
            <Route exact path="/health" element={<NewsComponent key="health" pageSize={20} apiKey={this.apiKey} country="in" category="health" />} />
            <Route exact path="/science" element={<NewsComponent key="science" pageSize={20} apiKey={this.apiKey} country="in" category="science" />} />
            <Route exact path="/sports" element={<NewsComponent key="sports" pageSize={20} apiKey={this.apiKey} country="in" category="sports" />} />
            <Route exact path="/technology" element={<NewsComponent key="technology" pageSize={20} apiKey={this.apiKey} country="in" category="technology" />} />
            <Route exact path="/entertainment" element={<NewsComponent key="entertainment" pageSize={20} apiKey={this.apiKey} country="in" category="entertainment" />} />
          </Routes>
        </div>


        <Footer />
      </div>
    )
  }
}
