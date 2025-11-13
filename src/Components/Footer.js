import "../styles/Footer.css"; 

import { useNavigate } from "react-router-dom";

const Footer = () => {
const navigate=useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-section">
              <span className="footer-brand">HealthMate</span>
            <p className="footer-description">
             "Your trusted partner in achieving a balanced,
              healthy lifestyle — one step at a time."
            </p>
          </div>

          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              {[
                ["/", "🏠", "Home"],
                ["/about", "ℹ️", "About Us"],
                ["/bmi", "📊", "BMI Calculator"],
                ["/nutrition", "🍎", "Nutrition Tracker"],
                ["/dietplan", "📅", "Diet Plan"],
                ["/contact", "📞", "Contact"],
              ].map(([page, icon, label]) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="footer-link"
                  >
                    <span>{icon}</span> <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Get in Touch</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <div className="contact-icon email">📧</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">support@healthmate.com</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon phone">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} HealthMate. All rights reserved. |
            Empowering healthier lives worldwide.
          </p>
          <div className="footer-policies">
            <a href="https://google.com">Privacy Policy</a>
            <a href="https://google.com">Terms of Service</a>
            <a href="https://google.com">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
