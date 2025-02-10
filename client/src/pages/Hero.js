import React from 'react';

function Hero() {
  return (
    <section className="hero-section bg-white ">
      <div className="">
        <div className="row align-items-center">


          {/* Right Side - Full Image Cover */}
          <div className="col-lg-6">
            <div className="position-relative w-100 rounded-3 overflow-hidden">
              <img 
                src="/pictures/food3.jpg" 
                alt="Healthy Food" 
                className="img-fluid w-100 h-100" 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </div>
          
          {/* Left Side - Text Content */}
          <div className="col-lg-5 style={{ backgroundColor: '#f8f9fa' }}">
            <h1 className="display-3 fw-bold text-dark">The healthiest way to start your day</h1>
            <p className="lead text-muted">

              Begin your morning with nourishing choices for your body and uplifting thoughts for your mind. 
              A healthy start ensures a productive and joyful day ahead.
            </p>

          </div>

        </div>
      </div>

      {/* Newsletter Subscription Section */}
      {/* <div className="bg-light py-4 mt-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="fw-bold mb-3 mb-md-0">Get My <span className="text-dark">Free</span> Cookbook Today!</p>
            <div className="d-flex w-100 w-md-auto">
              <input type="text" className="form-control me-2" placeholder="Your Name*" />
              <input type="email" className="form-control me-2" placeholder="Your Email*" />
              <button className="btn btn-dark">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default Hero;
