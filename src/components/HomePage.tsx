import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/HomePage.css';
import { Button } from '@mui/material';
import { Image } from 'antd';

const HomePage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-transparent fixed-top">
        <div className="container">
          <Button variant="outlined">Sign Up</Button>
        </div>
      </nav>

      {/* Banner Section */}
      <section className="banner-section">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>Oddaj krew, uratuj życie</h1>
              <p className="lead my-4">
                Dołącz do nas i pomóż ratować życie innym ludziom. Oddanie krwi
                to prosty sposób, aby zrobić coś naprawdę dobrego.
              </p>
              <a href="#" className="btn btn-danger btn-lg">
                Explore
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Information Sections */}
      <section className="info-section p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card card-custom">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-heart-fill"></i>
                  </div>
                  <h3 className="card-title mb-3">Potrzebna krew</h3>
                  <p className="card-text">
                    Sprawdź, jakie grupy krwi są obecnie najbardziej potrzebne.
                  </p>
                  <a href="#" className="btn btn-danger">
                    Dowiedz się więcej
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card card-custom">
                <div className="card-body text-center">
                  <h3 className="card-title mb-3">1278</h3>
                  <p className="card-text">
                    Znajdź najbliższą placówkę krwiodawstwa w swojej okolicy.
                  </p>
                  <a href="#" className="btn btn-danger">
                    Dowiedz się więcej
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card card-custom">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-calendar2-heart-fill"></i>
                  </div>
                  <h3 className="card-title mb-3">Informacje dla dawców</h3>
                  <p className="card-text">
                    Wszystko, co musisz wiedzieć przed oddaniem krwi.
                  </p>
                  <a href="#" className="btn btn-danger">
                    Dowiedz się więcej
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <img src="/assets/books.png" className="img-fluid" alt="Book" />
            </div>
            <div className="col-md p-5">
              <h2 className="text-danger">Benefits of reading books</h2>
              <p className="lead">
                Reading calms you down and slows down your heartbeat. Just 6
                minutes of reading is enough to reduce the feeling of stress by
                as much as 60%! Interestingly, reading books reduces stress:
              </p>
              <ul>
                <li>68% more than listening to music,</li>
                <li>300% more than going for a walk</li>
                <li>And as much as 600% more than playing computer games.</li>
              </ul>
              <a href="#" className="btn btn-danger mt-6">
                Sprawdź gdzie oddać krew
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="learn2" className="p-5">
        <div className="container">
          <div className="col-md p-5">
            <h2 className="text-danger">Development of imagination</h2>
            <p className="lead">
              With only letters in front of our eyes, we have to visualize what
              is happening in the book - often these are even things that we
              cannot see in the real world! Reading stimulates the right
              hemisphere of the brain and develops our imagination.
            </p>
            <a href="#" className="btn btn-danger mt-6">
              Sprawdź gdzie oddać krew
            </a>
          </div>
          <div className="row align-items-center justify-content-between">
            <div className="col-md"></div>
            <div className="img-fluid" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section p-5 text-center position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2024 Katarzyna Gesek</p>
          <a href="#" className="position-absolute bottom-0 end-0 p-5">
            <i className="bi bi-arrow-up-circle h1"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
