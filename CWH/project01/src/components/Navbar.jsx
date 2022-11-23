import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a id="brand-name" className="navbar-brand" href="#" disabled>
          TextUtils
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <i
              style={{ fontSize: "170%", position: "relative", top: "1vh" }}
              className="fa fa-search fa-2x me-1"
              aria-hidden="true"
            ></i>
            <input
              type="search"
              className="form-control me-2"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            <button className="input-group-text" id="basic-addon1">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
