import React, { useState } from 'react';

type JspFaqComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspFaqComponent: React.FC<JspFaqComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { faqlist, loop } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice("This form originally submitted to '#' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
    };

    const handleBackendAction = async (
        e: React.MouseEvent<HTMLElement>,
        action: string = "",
    ) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice(
            action
                ? `The original backend action '${action}' has not been migrated to an API endpoint, so the action was not sent.`
                : "This form originally submitted to '#' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div id="overlayer"></div>
          <div className="loader">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        
          <div className="site-wrap">
        
            <div className="site-mobile-menu site-navbar-target">
              <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                  <span className="icon-close2 js-menu-toggle"></span>
                </div>
              </div>
              <div className="site-mobile-menu-body"></div>
            </div>
        
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
                        <li><a href="/create_account" className="nav-link">Open Account</a></li>
                        <li><a href="/register" className="nav-link">Register</a></li>
                        <li><a href="/faq" className="nav-link">FAQs</a></li>
                        <li><a href="/contact" className="nav-link">Contact Us</a></li>
                        <li><a href="/login"><button className="btn btn-primary">Login</button></a></li>
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
        
            <section className="faq-section" id="faq-sec">
              <div className="container">
        
                <div className="faq-hero">
                  <div className="faq-hero-content">
                    <h1><span>Frequently</span> Asked Questions</h1>
                    <p>
                      Find quick answers to the most common banking questions in a premium, modern and glossy FAQ section.
                    </p>
                    <div className="line"></div>
                  </div>
                </div>
        
                {
                  (!!(faqlist)) ? (<>
                    <div className="faq-wrapper">
                      <div className="accordion faq-accordian" id="faqAccordion">
        
                        {faqlist && faqlist?.map((faq: any, index: number) => (<>
                          <div className="card">
                            <div className="card-header" id="heading{loop?.index}">
                              <h6 className="mb-0 collapsed" data-toggle="collapse" data-target="#collapse{loop?.index}" aria-expanded="false" aria-controls="collapse{loop?.index}">
                                {faq.question}
                                <span className="icon-plus"></span>
                              </h6>
                            </div>
                            <div className="collapse" id="collapse{loop?.index}" aria-labelledby="heading{loop?.index}" data-parent="#faqAccordion">
                              <div className="card-body">
                                <p>{faq.answer}</p>
                              </div>
                            </div>
                          </div>
                        </>))}
        
                      </div>
                    </div>
                  </>) :
        
                  (<>
                    <div className="empty-faq">
                      <h3>No FAQs Available</h3>
                      <p>FAQs have not been added yet. Please check again later.</p>
                    </div>
                  </>)
                }
        
              </div>
            </section>
        
            <footer className="footer-glossy">
              <div className="container">
                <div className="row">
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-5">
                        <h2 className="footer-heading mb-4">About Us</h2>
                        <h4>Registered Office</h4>
                        <address className="address">
                          MYBANK, SDI<br />
                          BHUBANESWAR, TARABOI, KHORDHA, 752050, ODISHA, INDIA.<br />
                          Tel : 8249669907, 7787977529
                        </address>
                      </div>
        
                      <div className="col-md-3 ml-auto">
                        <h2 className="footer-heading mb-4">Quick Links</h2>
                        <ul className="list-unstyled">
                          <li><a href="/">Home</a></li>
                          <li><a href="/create_account">Open Account</a></li>
                          <li><a href="/register">Register</a></li>
                          <li><a href="/login">Login</a></li>
                          <li><a href="/faq">FAQ</a></li>
                        </ul>
                      </div>
        
                      <div className="col-md-3 footer-social">
                        <h2 className="footer-heading mb-4">Follow Us</h2>
                        <a href="#" className="pl-0 pr-3"><span className="icon-facebook"></span></a>
                        <a href="#" className="pl-3 pr-3"><span className="icon-twitter"></span></a>
                        <a href="#" className="pl-3 pr-3"><span className="icon-instagram"></span></a>
                        <a href="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></a>
                      </div>
                    </div>
                  </div>
        
                  <div className="col-md-3">
                    <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
                    <form onSubmit={handleSubmit} action="#" method="post" className="footer-subscribe">
                      <div className="input-group mb-3">
                        <input onChange={handleInputChange} type="text" className="form-control" placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                          <button className="btn" type="button" id="button-addon2">Send</button>
                        </div>
                      </div>
                    </form>
                  </div>
        
                </div>
              </div>
            </footer>
        
          </div>
        </>
    );
};

export default JspFaqComponent;
