import React from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function NewsComponent (props) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // 
  
  const updateNews = () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setTotalPages(Math.ceil(data.totalResults/props.pageSize));
        setLoading(false);
      }
      else{
        console.log("some error is there");
      }
    })
    .catch(error => console.log(error, "We might have reached the limits."));
  }

  useEffect( function(){
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    setLoading(true);
    updateNews();
  }, [page]);

  const navClick = (event) => {
    // setLoading(true);
    
    // next Button
    if(event.target.id==="nextB"){
      setPage(page+1);
    }

    // previous button
    else if(event.target.id==="prevB"){
      setPage(page-1);
    }
  }

  let navigationButtons = document.querySelectorAll("#pageNumber ul li button");
  navigationButtons = Array.from(navigationButtons);

  const pageNavigator = (e) => {
    const toPage = Number(e.target.innerText);
    if(page === toPage)
      e.target.disabled = true;
    else{
      setPage(toPage);
    }
  }



  const randomWriter= () => {
    const writers = ["Naruto Uzumaki", "unknown", 'Sasuke Uchiha', "Madara Uchiha", "Itachi Uchiha", "Hinata Hyuga", "Negi Hyuga", "Shikamaru Nara", "Pain", "Nagato Uzumaki", "Jiraya", "Konan", "Byakuya Kuchiki", "Ichigo Kurosaki", "Uryu Ishida", "Sakura Haruno", "Sai", "Ino Yamanaka", "Choji Akimichi", "Minato Namikaze", "Kushina Namikaze"];
    let ind = Math.floor(Math.random()*writers.length);
    return writers[ind];
  }

  return (
    <>
      <h1 className='text-center' style={{marginTop : "22vh"}}>
        NewsMonkey - Top { props.category !== 'general' && capitalizeFirstLetter(props.category) } Headlines
      </h1>
      {loading && <Spinner />}

      <div className='container my-3'>
        <div className='row'>
          {
            !loading && (articles !== [] && articles.map((e, index) => {
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
            }) )
          }

          <footer id="pageNo">
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group me-2" role="group" aria-label="Second group">
                <button id="prevB" disabled={page <= 1 && true} type="button" className="btn btn-info" onClick={navClick}>&larr; Previous</button>
              </div>


              <span id="normalSpan"> 
                <Pagination id="pageNumber" page={page} count={totalPages} hideFirstButton hideNextButton hidePrevButton hideLastButton color='primary' onClick={pageNavigator}/>
              </span>

              <div className="btn-group me-2" role="group" aria-label="Second group">
                <button id="nextB" disabled={page + 1 > Math.ceil(totalResults/props.pageSize) && true} type="button" className="btn btn-info" onClick={navClick}>Next &rarr;</button>
              </div>
            </div>
          </footer>

        </div>
      </div>

    </>
  );
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
