import React from "react";

export default function NewsItem(props){

    return (
      <div>
        <div className="card" style={{width: "18rem", height: "464px"}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: "90%", zIndex:"1"}}>
            {props.source}
          </span>
          <img src={props.imageUrl} className="card-img-top" alt={props.title} style={{height: "200px", width:"18rem" }} />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text" style={{marginBottom:"8px", height : "4.5rem"}}>{props.description}</p>
            <p className="card-text"><small className="text-muted">Published by {props.author} at {props.date}</small></p>
            <a href= {props.newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}
