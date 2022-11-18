import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import Notes from './components/Notes';
import {
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer';

export default function App(){
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const pageSize = 15;

  return (
    <div className='App'>
      <Navbar />
        <div className='container my-3'>
          <Routes>
            <Route exact path="/" element={<NewsComponent key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general" />} />
            <Route exact path="/business" element={<NewsComponent key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business" />} />
            <Route exact path="/health" element={<NewsComponent key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health" />} />
            <Route exact path="/science" element={<NewsComponent key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science" />} />
            <Route exact path="/sports" element={<NewsComponent key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports" />} />
            <Route exact path="/technology" element={<NewsComponent key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology" />} />
            <Route exact path="/entertainment" element={<NewsComponent key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment" />} />
            <Route exact path="/notes" element={<Notes />} />
          </Routes>
        </div>

      <Footer />
    </div>
  )
}
