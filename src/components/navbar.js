import React, { Component } from 'react'

class Navbar extends Component {
  render () {
    return (
      <div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="...bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="...">
              Brand
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left" method="GET" role="search">
              <div className="form-group">
                <input type="text" name="q" className="form-control" placeholder="Search" />
              </div>
              <button type="submit" className="btn btn-default"><i className="glyphicon glyphicon-search"></i></button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                  Account
                  <span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    <li className="dropdown-header">SETTINGS</li>
                    <li className=""><a href="...">Other Link</a></li>
                    <li className=""><a href="...">Other Link</a></li>
                    <li className=""><a href="...">Other Link</a></li>
                    <li className="divider"></li>
                    <li><a href="...">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
