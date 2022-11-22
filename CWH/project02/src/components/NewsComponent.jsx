import React from 'react';
import { useState, useEffect } from 'react';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function NewsComponent(props){
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = () => {
    props.showProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        // setLoading(true);
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
        setLoading(false);
      }
      else{
        console.log("some error is there");
      }
    })
    .catch(error => console.log(error));
    props.showProgress(100);
  }

  useEffect(function(){
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [page]);

  const fetchMoreData = () => {
    props.showProgress(10);
    setPage(page+1);
  }


  const randomWriter= () => {
    const writers = ["Naruto Uzumaki", "unknown", 'Sasuke Uchiha', "Madara Uchiha", "Itachi Uchiha", "Hinata Hyuga", "Negi Hyuga", "Shikamaru Nara", "Pain", "Nagato Uzumaki", "Jiraya", "Konan", "Byakuya Kuchiki", "Ichigo Kurosaki", "Uryu Ishida", "Sakura Haruno", "Sai", "Ino Yamanaka", "Choji Akimichi", "Minato Namikaze", "Kushina Namikaze"];
    let ind = Math.floor(Math.random()*writers.length);
    return writers[ind];
  }

  return (
    <>
      <h1 id="topHeadlines01" className='text-center'>NewsMonkey - Top { props.category !== 'general' && capitalizeFirstLetter(props.category) } Headlines</h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults ? true : false}
        loader={<Spinner />}
        >
        <div className='container my-3'>
          <div className='row'>
            {
              articles.map((e, index) => {
                return (
                  <div className='col-md-4 my-3' key={index}>
                    <NewsItem 
                      title={e.title ? (e.title.length > 40 ? e.title.slice(0,40) + "..." : e.title) : ""} 
                      description={e.description ? (e.description.length > 80 ? e.description.slice(0,80) + "..." : e.description) : e.title.slice(0,80) + "..."}                      
                      imageUrl={e.urlToImage ? e.urlToImage : "https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc="} 
                      newsUrl={e.url} author={!e.author ? randomWriter() : e.author} 
                      date={`${new Date(e.publishedAt.slice(0,10).toString()).toDateString()}, ${new Date("01-01-2000 " + e.publishedAt.slice(11,19).toString()).toLocaleTimeString()}` } 
                      source={e.source.name} 
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

      </InfiniteScroll>
    </>
  )
}


NewsComponent.defaultProps ={
  country : "in",
  pageSize : 10,
  category : "general"
}

NewsComponent.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}