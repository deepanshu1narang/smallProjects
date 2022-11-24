import React, { Component } from 'react';
import NewsItem from './NewsItem';
import { Pagination } from '@mui/material';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export default class NewsComponent extends Component {

  static defaultProps ={
    country : "in",
    pageSize : 10,
    category : "general"
  }
  
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    // console.log("I am a constructor from News Component");
    // states are always set up in constructors
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      status : ""
      // totalResults : 0.... even if we don't make a state here we can directly make the state in the setState only 
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  
  updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        let articles = data.articles;
        this.setState({
          articles : articles,
          totalResults : data.totalResults,
          totalPages : Math.ceil(data.totalResults/this.props.pageSize),
          loading : false
        });
      }
      else{
        console.log("some error is there");
      }
    })
    .catch(error => console.log(error, "We might have reached the limits."));
  }

  componentDidMount(){
    this.setState({
      loading : true
    });

    this.updateNews();
  }
  
  navClick =(event) => {

    this.setState({
      loading : true
    });
    
    // next Button
    if(event.target.id==="nextB"){
        this.setState({page : this.state.page + 1});
        this.updateNews();
    }

    // previous button
    else if(event.target.id==="prevB"){
    this.setState({page : this.state.page - 1});
    this.updateNews();
    }
  }

  // why updateNews function? clear the comments and then look at a cleaner code --- or if the commented code is cleared someday then just write the code of updateNews() inside the block in place of this.updateNews() 

  randomWriter= () => {
    const writers = ["Naruto Uzumaki", "unknown", 'Sasuke Uchiha', "Madara Uchiha", "Itachi Uchiha", "Hinata Hyuga", "Negi Hyuga", "Shikamaru Nara", "Pain", "Nagato Uzumaki", "Jiraya", "Konan", "Byakuya Kuchiki", "Ichigo Kurosaki", "Uryu Ishida", "Sakura Haruno", "Sai", "Ino Yamanaka", "Choji Akimichi", "Minato Namikaze", "Kushina Namikaze"];
    let ind = Math.floor(Math.random()*writers.length);
    return writers[ind];
  }

  pageNavigator = (e) => {
    const toPage = Number(e.target.innerText);
    if(this.state.page === toPage)
      e.target.disabled = true;
    else{
      this.setState({page : toPage, loading :true});
      this.updateNews();
    }
  }



  render() {

    return (
      <div className='row'>
        <h1 className='text-center'>NewsMonkey - Top { this.props.category !== 'general' && this.capitalizeFirstLetter(this.props.category) } Headlines</h1>
        {this.state.loading && <Spinner />}

        {
          !this.state.loading && ( this.state.articles !== [] && this.state.articles.map((e, index) => {
            return (
              <div className='col-md-4 my-3' key={index}>
                <NewsItem title={e.title ? (e.title.length > 40 ? e.title.slice(0,40) + "..." : e.title) : ""}  description={e.description ? (e.description.length > 80 ? e.description.slice(0,80) + "..." : e.description) : e.title.slice(0,80) + "..."} imageUrl={e.urlToImage ? e.urlToImage : "https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc="}  newsUrl={e.url} author={!e.author ? this.randomWriter() : e.author} date={`${new Date(e.publishedAt.slice(0,10).toString()).toDateString()}, ${new Date("01-01-2000 " + e.publishedAt.slice(11,19).toString()).toLocaleTimeString()}` } source={e.source.name} />
              </div>
            )
          }) )
        }

        
        {this.props.meaninglessProp}
        <footer id="pageNo">
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group me-2" role="group" aria-label="Second group">
              <button id="prevB" disabled={this.state.page <= 1 && true} type="button" className="btn btn-info" onClick={this.navClick}>&larr; Previous</button>
            </div>


            <span id="normalSpan"> 
              <Pagination id="pageNumber" page={this.state.page} count={this.state.totalPages} hideFirstButton hideNextButton hidePrevButton hideLastButton color='primary' onClick={this.pageNavigator} />
            </span>

            <div className="btn-group me-2" role="group" aria-label="Second group">
              <button id="nextB" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize) && true} type="button" className="btn btn-info" onClick={this.navClick}>Next &rarr;</button>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
