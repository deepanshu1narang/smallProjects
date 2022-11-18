import React, { Component } from "react";

export default class NewsItem extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div>
        <div className="card" style={{width: "18rem", height: "464px"}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: "90%", zIndex:"1"}}>
            {this.props.source}
          </span>
          <img src={this.props.imageUrl} className="card-img-top" alt={this.props.title} style={{height: "200px", width:"100%" }} />
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text" style={{marginBottom:"8px", height : "4.5rem"}}>{this.props.description}</p>
            <p className="card-text"><small className="text-muted">Published by {this.props.author} at {this.props.date}</small></p>
            <a href= {this.props.newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
