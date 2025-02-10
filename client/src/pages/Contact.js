import 'bootstrap/dist/css/bootstrap.min.css';
import { TelephoneFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';

const Contact = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                {/* Contact Form */}
                <div className="col-md-6">
                    <div className="p-4 bg-white shadow-lg rounded">
                        <h2 className="fw-bold mb-4">CONTACT US</h2>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control border-0 border-bottom rounded-0" placeholder="Enter your Name" />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control border-0 border-bottom rounded-0" placeholder="Enter a valid email address" />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control border-0 border-bottom rounded-0" rows="3" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark w-100">SUBMIT</button>
                        </form>
                    </div>
                </div>

                {/* Contact Info Card */}
                <div className="col-md-6">
                    <div className="p-4 bg-light rounded shadow-sm">
                        <div className="mb-3">
                            <h5 className="fw-bold d-flex align-items-center">
                                <TelephoneFill className="text-warning me-2 fs-4" /> CALL US
                            </h5>
                            <p className="mb-0">1 (234) 567-891, 1 (234) 987-654</p>
                        </div>
                        <div className="mb-3">
                            <h5 className="fw-bold d-flex align-items-center">
                                <GeoAltFill className="text-warning me-2 fs-4" /> LOCATION
                            </h5>
                            <p className="mb-0">121 Rock Street, 21 Avenue, New York, NY 92103-9000</p>
                        </div>
                        <div>
                            <h5 className="fw-bold d-flex align-items-center">
                                <ClockFill className="text-warning me-2 fs-4" /> BUSINESS HOURS
                            </h5>
                            <p className="mb-0">Mon - Fri: 10 AM - 8 PM, Sat, Sun: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
