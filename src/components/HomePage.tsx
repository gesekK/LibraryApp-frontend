import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/HomePage.css';
import { Button } from '@mui/material';
import { Image } from 'antd';
import booksImage from '../components/assets/book_fluid.png';
import astronautImage from '../components/assets/astronaut.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignUpClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const header = document.querySelector('.home-header');
    if (header) {
      const text = header.textContent ?? '';
      header.textContent = '';

      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.2}s`;
        header.appendChild(span);
      });
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-transparent fixed-top">
        <div className="home-container">
          <Button
            className="home-login-button"
            variant="outlined"
            sx={{
              width: '200px',
              height: '40px',
              color: '#483C32',
              borderColor: '#483C32',
              '&:hover': {
                borderColor: '#483C32',
                backgroundColor: 'rgba(245, 242, 233, 0.1)',
              },
            }}
            onClick={handleSignUpClick}
          >
            {t('home.Sign Up')}
          </Button>
        </div>
      </nav>

      <div className="banner-section">
        <div className="banner-container">
          <div>
            <h1 className="home-header">
              {t('home.Immerse yourself in the world of books')}
            </h1>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <section className="info-section p-5">
        <div className="home-container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card card-custom">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <h3 className="card-title mb-3">
                    {t('home.Acclaimed by critics')}
                  </h3>
                  <p className="card-text">
                    {t('home.Nearly 163 reviews issued in the last 7 days.')}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card card-custom">
                <div className="card-body text-center">
                  <i className="bi bi-book-fill"></i>

                  <h3 className="card-title mb-3">{t('home.Latest titles')}</h3>
                  <p className="card-text">
                    {t(
                      'home.Nearly 5,000 books available on our website. Check out the latest titles!',
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card card-custom">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-calendar-fill"></i>
                  </div>
                  <h3 className="card-title mb-3">
                    {t('home.A leader among others')}
                  </h3>
                  <p className="card-text">
                    {t(
                      'home.As many as 267 rentals in the last 7 days! Check what\n' +
                        'we can surprise you!',
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="learn" className="p-5">
        <div className="home-container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <Image src={booksImage} className="img-fluid" height={300} />
            </div>
            <div className="col-md p-5">
              <h2 className="text-danger">Benefits of reading books</h2>
              <p className="lead">
                {t(
                  'home.Reading calms you down and slows down your heartbeat. Just 6 minutes of reading is enough to reduce the feeling of stress byas much as 60%! Interestingly, reading books reduces stress:',
                )}
              </p>
              <ul>
                <li>{t('home.68% more than listening to music,')}</li>
                <li>{t('home.300% more than going for a walk')}</li>
                <li>
                  {t(
                    'home.And as much as 600% more than playing computer games.',
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="learn2" className="p-5">
        <div className="home-container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <h2 className="text-danger">
                {t('home.Development of imagination')}
              </h2>
              <p className="lead">
                {t(
                  'home.With only letters in front of our eyes, we have to visualize what is happening in the book - often these are even things that we cannot see in the real world! Reading stimulates the right hemisphere of the brain and develops our imagination.',
                )}
              </p>
            </div>
            <div className="col-md">
              <Image src={astronautImage} className="img-fluid2" height={400} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section p-5 text-center position-relative">
        <div className="home-container">
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
