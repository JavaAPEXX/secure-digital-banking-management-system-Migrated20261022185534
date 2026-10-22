import React from 'react';

type JspHeaderComponentProps = {
    data?: Record<string, any>;
};

export const JspHeaderComponent: React.FC<JspHeaderComponentProps> = ({ data = {} }) => {

    return (
        <>
<header className="site-navbar js-sticky-header site-navbar-target" role="banner">
            <div className="container">
              <div className="row align-items-center">
        
                <div className="col-6 col-xl-2">
                  <h1 className="mb-0 site-logo">
                    <a href="/" className="h2 mb-0">MY<span className="text-primary">BANK</span></a>
                  </h1>
                </div>
        
                <div className="col-12 col-md-10 d-none d-xl-block">
                  <nav className="site-navigation position-relative text-right" role="navigation">
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li><a href="/" className="nav-link">Home</a></li>
                      <li><a href="#services-section" className="nav-link">Services</a></li>
        
                      <li className="has-children">
                        <a href="#" className="nav-link">Create Account</a>
                        <ul className="dropdown">
                          <li><a href="/create_account">Open Account</a></li>
                          <li><a href="/register">Register Account</a></li>
                        </ul>
                      </li>
        
                      <li><a href="/faq" className="nav-link">FAQ</a></li>
                      <li><a href="#about-section" className="nav-link">About Us</a></li>
                      <li><a href="#contact-section" className="nav-link">Contact Us</a></li>
                      <li>
                        <a href="/login">
                          <button className="login-btn">Login</button>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
        
                <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{ position: 'relative', top: '3px' }}>
                  <a href="#" className="site-menu-toggle js-menu-toggle float-right">
                    <span className="icon-menu h3"></span>
                  </a>
                </div>
        
              </div>
            </div>
          </header>
        </>
    );
};

export default JspHeaderComponent;
