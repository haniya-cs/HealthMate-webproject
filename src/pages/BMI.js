import React, { useState } from "react";
import "../styles/bmi.css";

const BMI = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const height = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);
    const bmi = weight / (height * height);
    const bmiRounded = Math.round(bmi * 10) / 10;

    let category, recommendation;
    if (bmi < 18.5) {
      category = "Underweight";
      recommendation =
        "Consider consulting with a nutritionist for a balanced meal plan to gain healthy weight.";
    } else if (bmi < 25) {
      category = "Normal";
      recommendation =
        "Keep up your healthy habits! Maintain balance between diet and activity.";
    } else if (bmi < 30) {
      category = "Overweight";
      recommendation =
        "Try regular physical activity and portion control to return to a healthy range.";
    } else {
      category = "Obese";
      recommendation =
        "Consult with a healthcare professional for a personalized weight management plan.";
    }

    setResult({ bmi: bmiRounded, category, recommendation });
  };

  return (
    <div className="bmi-page">
      <div className="bmi-container">
        <div className="bmi-header">
          <h1>BMI Calculator</h1>
          <p>Find out your Body Mass Index and what it means for your health.</p>
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="bmi-form-section">
              <h3 className="mb-4 text-primary fw-semibold">Enter Your Details</h3>
              <form onSubmit={handleSubmit} className="bmi-form">
                <div className="bmi-form-group">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="bmi-form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="bmi-form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                
                <div className="bmi-form-group">
                  <label>Gender</label>
                  <div className="bmi-gender-group">
                    <div className="bmi-radio">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        required
                      />
                      <label>Male</label>
                    </div>
                    <div className="bmi-radio">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        required
                      />
                      <label>Female</label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="bmi-btn">
                  Calculate BMI
                </button>
              </form>
            </div>
          </div>

          
          <div className="col-lg-6">
            {result && (
              <div className="bmi-result-section fade-in">
                <h3 className="bmi-result-title">Your Results</h3>
                <div className="bmi-result-value">{result.bmi}</div>
                <div className="bmi-result-category">{result.category}</div>
                <div className="bmi-recommendation">{result.recommendation}</div>
              </div>
            )}
          </div>
        </div>

        
        <div className="bmi-tips">
          <h3>Healthy Lifestyle Tips</h3>
          <div className="bmi-tips-grid">
            <div className="bmi-tip">
              <span>🥗</span>
              <h6>Eat Balanced Meals</h6>
              <p>Include proteins, carbs, and healthy fats in your daily diet.</p>
            </div>
            <div className="bmi-tip">
              <span>🏃‍♀️</span>
              <h6>Stay Active</h6>
              <p>At least 30 minutes of activity daily can improve your BMI.</p>
            </div>
            <div className="bmi-tip">
              <span>💧</span>
              <h6>Stay Hydrated</h6>
              <p>Drink enough water throughout the day to maintain energy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;
