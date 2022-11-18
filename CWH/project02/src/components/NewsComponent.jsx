import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalResults : 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  
  updateNews(){
    this.props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    fetch(url)
    .then(response => {
      // this.props.setProgress(50);
      return response.json();
    })
    .then(data => {
      if(data.status === 'ok'){
        let articles = data.articles;
        this.setState({
          articles : articles,
          totalResults : data.totalResults,
          loading : false
        });
      }
      else{
        console.log("some error is there");
      }
    })
    .catch(error => console.log(error));
    this.props.setProgress(100);
  }

  componentDidMount(){
    this.setState({
      loading : true
    });

    this.updateNews();
  }
  

  fetchMoreData = () => {
    this.props.setProgress(60);
    this.setState({page : this.state.page + 1});
    // this.updateNews();
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data.status === 'ok'){
        let articles = data.articles;
        this.setState({
          articles : this.state.articles.concat(articles),
          totalResults : data.totalResults,
          totalPages : Math.ceil(data.totalResults/this.props.pageSize),
          loading : false
        });
        // this.props.setProgress(80);
      }
      else{
        console.log("some error is there");
      }
    })
    .catch(error => console.log(error, error.message));
    this.props.setProgress(100);
  }
 

  randomWriter= () => {
    const writers = ["Naruto Uzumaki", "unknown", 'Sasuke Uchiha', "Madara Uchiha", "Itachi Uchiha", "Hinata Hyuga", "Negi Hyuga", "Shikamaru Nara", "Pain", "Nagato Uzumaki", "Jiraya", "Konan", "Byakuya Kuchiki", "Ichigo Kurosaki", "Uryu Ishida", "Sakura Haruno", "Sai", "Ino Yamanaka", "Choji Akimichi", "Minato Namikaze", "Kushina Namikaze"];
    let ind = Math.floor(Math.random()*writers.length);
    return writers[ind];
  }

  render() {

    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top { this.props.category !== 'general' && this.capitalizeFirstLetter(this.props.category) } Headlines</h1>

        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length > this.state.totalResults ? false : true}
          loader={<Spinner />}
          >
          <div className='container my-3'>
            <div className='row'>
              {
                this.state.articles !== [] && this.state.articles.map((e, index) => {
                  return (
                    <div className='col-md-4 my-3' key={index}>
                      <NewsItem 
                        title={e.title ? (e.title.length > 40 ? e.title.slice(0,40) + "..." : e.title) : ""} 
                        description={e.description ? (e.description.length > 80 ? e.description.slice(0,80) + "..." : e.description) : e.title.slice(0,80) + "..."} 
                        
                        imageUrl={e.urlToImage ? e.urlToImage : "https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc="} 
                        newsUrl={e.url} author={!e.author ? this.randomWriter() : e.author} 
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
}
