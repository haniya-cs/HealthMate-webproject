import React from "react";
import'../styles/about.css';
import { Link } from "react-router-dom";
const About = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6 lg:py-12">
      <div className="fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 lg:mb-8 text-center">
          About HealthMate
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            At HealthMate, we believe that everyone deserves access to 
            personalized, science-based nutrition and fitness guidance tailored
             to their unique lifestyle and goals. Our platform blends cutting-edge technology
              with expert nutritional and fitness insights to help you make smarter 
              choices, track your progress, and stay motivated every day. 
              Whether you want to lose weight, gain strength,
               or simply improve your overall well-being, HealthMate empowers you to build
                lasting healthy habits and achieve your goals safely, effectively, and confidently.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">🎯 Personalized Tools</h3>
              <p className="text-gray-600">
                BMI calculators, calorie trackers, and customized meal plans
                based on your health profile.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🍽️ Expert Recipes</h3>
              <p className="text-gray-600">
                Nutritionist-approved recipes tailored for specific health
                conditions and dietary needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">📱 Easy Tracking</h3>
              <p className="text-gray-600">
                Simple, intuitive interfaces that make monitoring your health
                progress effortless.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🔬 Science-Based</h3>
              <p className="text-gray-600">
                All recommendations backed by current nutritional research and
                medical guidelines.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-6 lg:p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-6">
            Join thousands of users who have transformed their health with
            HealthMate.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            <Link to="/login">Get Started Today</Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default About;

