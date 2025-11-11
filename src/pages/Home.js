import { useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
  const navigate=useNavigate();
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
         
          <h1 className="hero-title">Transform Your Health Journey</h1>
          <p className="hero-subtitle">
            Discover personalized nutrition plans, track your fitness goals,
            and access expert-recommended recipes tailored to your health needs.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/bmi")} className="btn btn-bmi">
              📊 Calculate BMI
            </button>
            <button onClick={() => navigate("/dietplan")} className="btn btn-diet">
              📅 Get Diet Plan
            </button>
            <button onClick={() => navigate("/nutrition")} className="btn btn-nutrition">
              🍎 Track Nutrition
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon blue">
            <span>📊</span>
          </div>
          <h3>BMI Calculator</h3>
          <p>
            Get instant BMI calculations with personalized health
            recommendations and goal tracking tailored to your body type.
          </p>
          <button onClick={() => navigate("/bmi")} className="feature-link">
            Try Calculator →
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-icon green">
            <span>🍎</span>
          </div>
          <h3>Calorie Tracking</h3>
          <p>
            Monitor your daily caloric intake with our intelligent food logging
            system and personalized goal setting.
          </p>
          <button onClick={() => navigate("/nutrition")} className="feature-link">
            Start Tracking →
          </button>
        </div>

        <div className="feature-card">
          <div className="feature-icon purple">
            <span>🥗</span>
          </div>
          <h3>Plan Your Diet</h3>
          <p>
            Get a personalized diet plan tailored to your health goals, body type,
            and nutritional needs for a balanced and sustainable lifestyle.
          </p>
          <button onClick={() => navigate("/dietplan")} className="feature-link">
            Your Dietplan →
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Join Thousands on Their Health Journey</h2>
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-number blue">10,000+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat">
            <div className="stat-number green">100+</div>
            <div className="stat-label">Healthy Recipes</div>
          </div>
          <div className="stat">
            <div className="stat-number purple">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat">
            <div className="stat-number orange">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

