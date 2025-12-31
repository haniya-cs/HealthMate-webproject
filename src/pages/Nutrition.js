import React, { useState,useEffect } from "react";
import "../styles/nutrition.css";
import axios from "axios";
const Nutrition = () => {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodEntries, setFoodEntries] = useState([]);
  const [showSetup, setShowSetup] = useState(true);
  const [selectedCondition, setSelectedCondition] = useState("general");
  const [recipes, setRecipes] = useState([]);

  const [setupData, setSetupData] = useState({
    userAge: "",
    userGender: "male",
    userHeight: "",
    userWeight: "",
    activityLevel: "1.2",
    goal: "maintain",
  });

  const [foodForm, setFoodForm] = useState({
    foodName: "",
    portion: "",
  });

  //new useEffect
  useEffect(() => {
  // Check if the setup form was already completed
  const completed = localStorage.getItem("setupCompleted");
  const savedSetup = JSON.parse(localStorage.getItem("setupData"));

  if (completed === "true" && savedSetup) {
    setSetupData(savedSetup); // fill the form with saved data
    setShowSetup(false);       // hide the setup form

    // Recalculate dailyGoal
    const { userAge, userGender, userHeight, userWeight, activityLevel, goal } = savedSetup;
    let bmr;
    if (userGender === "male") {
      bmr = 10 * parseFloat(userWeight) + 6.25 * parseFloat(userHeight) - 5 * parseInt(userAge) + 5;
    } else {
      bmr = 10 * parseFloat(userWeight) + 6.25 * parseFloat(userHeight) - 5 * parseInt(userAge) - 161;
    }

    let tdee = bmr * parseFloat(activityLevel);
    let newDailyGoal;
    if (goal === "lose") newDailyGoal = Math.round(tdee - 500);
    else if (goal === "gain") newDailyGoal = Math.round(tdee + 500);
    else newDailyGoal = Math.round(tdee);

    setDailyGoal(newDailyGoal);
  }
}, []); // runs once on page load

const [editingFood, setEditingFood] = useState(null);

const startEditFood = (food) => {
  setEditingFood(food);
  setFoodForm({ foodName: food.food_name, portion: food.portion });
};


  const foodDatabase = {
    apple: 95,
    banana: 105,
    bread: 80,
    rice: 200,
    chicken: 165,
    egg: 78,
    milk: 120,
    yogurt: 150,
    pasta: 220,
    salad: 40,
    beef: 250,
    orange: 62,
    cheese: 110,
    fish: 180,
    avocado: 160,
    soup: 120,
  };

  const recipeData = {
    general: [
      {
        name: "Mediterranean Quinoa Bowl",
        calories: 420,
        time: "25 min",
        description:
          "Protein-rich quinoa with fresh vegetables, olives, and feta cheese",
        ingredients: [
          "1 cup quinoa",
          "Cherry tomatoes",
          "Cucumber",
          "Feta cheese",
          "Olive oil",
          "Lemon juice",
        ],
      },
      {
        name: "Grilled Salmon with Vegetables",
        calories: 380,
        time: "20 min",
        description: "Omega-3 rich salmon with roasted seasonal vegetables",
        ingredients: [
          "Salmon fillet",
          "Broccoli",
          "Bell peppers",
          "Olive oil",
          "Herbs",
          "Lemon",
        ],
      },
      {
        name: "Chicken and Avocado Salad",
        calories: 350,
        time: "15 min",
        description: "Lean protein with healthy fats and fresh greens",
        ingredients: [
          "Grilled chicken",
          "Avocado",
          "Mixed greens",
          "Cherry tomatoes",
          "Balsamic vinegar",
        ],
      },
    ],
    diabetes: [
      {
        name: "Low-Carb Zucchini Noodles",
        calories: 280,
        time: "20 min",
        description:
          "Spiralized zucchini with lean turkey meatballs and sugar-free marinara",
        ingredients: [
          "Zucchini",
          "Ground turkey",
          "Sugar-free marinara",
          "Herbs",
          "Parmesan cheese",
        ],
      },
      {
        name: "Cauliflower Rice Stir-Fry",
        calories: 320,
        time: "18 min",
        description: "Low-carb alternative with plenty of fiber and protein",
        ingredients: [
          "Cauliflower rice",
          "Chicken breast",
          "Mixed vegetables",
          "Soy sauce",
          "Ginger",
        ],
      },
    ],
    hypertension: [
      {
        name: "DASH Diet Vegetable Soup",
        calories: 180,
        time: "30 min",
        description: "Low-sodium soup packed with potassium-rich vegetables",
        ingredients: [
          "Mixed vegetables",
          "Low-sodium broth",
          "Beans",
          "Herbs",
          "No added salt",
        ],
      },
    ],
    "weight-loss": [
      {
        name: "High-Protein Egg White Scramble",
        calories: 220,
        time: "10 min",
        description: "Low-calorie, high-protein breakfast with vegetables",
        ingredients: [
          "Egg whites",
          "Spinach",
          "Mushrooms",
          "Bell peppers",
          "Herbs",
          "Cooking spray",
        ],
      },
    ],
  };

  const calculateCalorieGoal = () => {
    const { userAge, userGender, userHeight, userWeight, activityLevel, goal } =
      setupData;

    if (!userAge || !userHeight || !userWeight) {
      alert("Please fill in all fields to calculate your calorie goal.");
      return;
    }

    let bmr;
    if (userGender === "male") {
      bmr =
        10 * parseFloat(userWeight) +
        6.25 * parseFloat(userHeight) -
        5 * parseInt(userAge) +
        5;
    } else {
      bmr =
        10 * parseFloat(userWeight) +
        6.25 * parseFloat(userHeight) -
        5 * parseInt(userAge) -
        161;
    }

    let tdee = bmr * parseFloat(activityLevel);
    let newDailyGoal;

    if (goal === "lose") newDailyGoal = Math.round(tdee - 500);
    else if (goal === "gain") newDailyGoal = Math.round(tdee + 500);
    else newDailyGoal = Math.round(tdee);

    setDailyGoal(newDailyGoal);
    setShowSetup(false);

    localStorage.setItem("setupData", JSON.stringify(setupData));
    localStorage.setItem("setupCompleted", "true");
  };

  const addFood = async (e) => {
  e.preventDefault();
  const foodName = foodForm.foodName.trim().toLowerCase();
  let calories = foodDatabase[foodName];

  if (!calories) {
    const userInput = prompt(
      "We couldn't find this food. Please enter the calories manually:"
    );
    calories = parseInt(userInput);
    if (isNaN(calories)) {
      alert("Invalid calorie value.");
      return;
    }
  }

  try {
     if (editingFood) {
      // Update existing food
     const res = await axios.put(
    `http://localhost:5000/api/nutrition/${editingFood.id}`,
    { food_name: foodForm.foodName, calories, portion: foodForm.portion || "1 serving" },
    { headers: { Authorization: localStorage.getItem("token") } }
  );

  const updatedEntries = foodEntries.map(f => f.id === editingFood.id ? res.data : f);
  setFoodEntries(updatedEntries);

  // Recalculate total calories based on updated entries
  const total = updatedEntries.reduce((sum, f) => sum + f.calories, 0);
  setTotalCalories(total);

  setEditingFood(null);
   setFoodForm({ foodName: "", portion: "" });
    } else {
    const res = await axios.post(
      "http://localhost:5000/api/nutrition",
      { food_name: foodForm.foodName, calories, portion: foodForm.portion || "1 serving" },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    setFoodEntries([...foodEntries, res.data]);
    setTotalCalories(totalCalories + calories);
    
    setFoodForm({ foodName: "", portion: "" });
  }
  } catch (err) {
    console.error(err);
    alert("Error adding food entry");
  }
};


 const removeFood = async (id, calories) => {
  try {
    await axios.delete(`http://localhost:5000/api/nutrition/${id}`, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setFoodEntries(foodEntries.filter((entry) => entry.id !== id));
    setTotalCalories(totalCalories - calories);
  } catch (err) {
    console.error(err);
    alert("Error deleting food entry");
  }
};




  const showRecipes = () => {
    setRecipes(recipeData[selectedCondition] || recipeData.general);
  };

  const remaining = dailyGoal - totalCalories;
  const percentage = Math.min((totalCalories / dailyGoal) * 100, 100);
  //useEffect
  useEffect(() => {
  const fetchFoodEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/nutrition", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setFoodEntries(res.data);
      const total = res.data.reduce((sum, item) => sum + item.calories, 0);
      setTotalCalories(total);
    } catch (err) {
      console.error(err);
      alert("Error fetching food entries");
    }
  };
  fetchFoodEntries();
}, []);


  return (
    <main className="nutrition-page">
      <div className="nutrition-container">
        <h1>Nutrition Tracker & Meal Recipes</h1>

        <div className="nutrition-content">
          {/* left part */}
          <div className="nutrition-left">
            <div className="card nutrition-card">
              <h4 className="section-title">Daily Calorie Tracker</h4>

              {showSetup && (
                <div className="setup-box">
                  <h5>Set Your Personal Goal</h5>
                  <form className="nutrition-form">
                    <label>Age</label>
                    <input
                      type="number"
                      placeholder="your age"
                      value={setupData.userAge}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          userAge: e.target.value,
                        })
                      }
                    />

                    <label>Gender</label>
                    <select
                      value={setupData.userGender}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          userGender: e.target.value,
                        })
                      }
                    >
                     
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    <label>Height (cm)</label>
                    <input
                      type="number"
                      placeholder="your height"
                      value={setupData.userHeight}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          userHeight: e.target.value,
                        })
                      }
                    />

                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="your weight"
                      value={setupData.userWeight}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          userWeight: e.target.value,
                        })
                      }
                    />

                    <label>Activity Level</label>
                    <select
                      value={setupData.activityLevel}
                      onChange={(e) =>
                        setSetupData({
                          ...setupData,
                          activityLevel: e.target.value,
                        })
                      }
                    >
                      <option value="1.2">Sedentary</option>
                      <option value="1.375">Lightly Active</option>
                      <option value="1.55">Moderately Active</option>
                      <option value="1.725">Very Active</option>
                      <option value="1.9">Extremely Active</option>
                    </select>

                    <label>Goal</label>
                    <select
                      value={setupData.goal}
                      onChange={(e) =>
                        setSetupData({ ...setupData, goal: e.target.value })
                      }
                    >
                      <option value="lose">Lose Weight</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="gain">Gain Weight</option>
                    </select>

                    <button
                      type="button"
                      className="bmi-btn"
                      onClick={calculateCalorieGoal}
                    >
                      Calculate Goal
                    </button>
                  </form>
                </div>
              )}

              {!showSetup && (
                <>
                  <div className="progress-section">
                    <div className="progress-info">
                      <span>Goal: {dailyGoal} cal</span>
                      <span>
                        {totalCalories} / {dailyGoal}
                      </span>
                    </div>
                    <div className="progress">
                      <div
                        className={`progress-bar ${
                          remaining < 0
                            ? "bg-danger"
                            : remaining < 200
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="progress-info">
                      <span>Consumed: {totalCalories}</span>
                      <span>
                        {remaining < 0
                          ? `Over by ${Math.abs(remaining)}`
                          : `Remaining: ${remaining}`}{" "}
                        cal
                      </span>
                    </div>
                  </div>

                 
                  <form onSubmit={addFood} className="nutrition-form">
                    <label>Food</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chicken, Apple"
                      value={foodForm.foodName}
                      onChange={(e) =>
                        setFoodForm({ ...foodForm, foodName: e.target.value })
                      }
                    />

                    <label>Portion</label>
                    <input
                      type="text"
                      placeholder="1 serving"
                      value={foodForm.portion}
                      onChange={(e) =>
                        setFoodForm({ ...foodForm, portion: e.target.value })
                      }
                    />

                    <button type="submit" className="bmi-btn">
                      Add Food
                    </button>
                  </form>

                  
                  <div className="food-list">
                    <h5>Today's Meals</h5>
                    {foodEntries.length === 0 ? (
                      <p className="text-muted">No meals logged yet</p>
                    ) : (
                      foodEntries.map((food) => (
                        <div key={food.id} className="food-entry">
                          <div>
                            <strong>{food.food_name}</strong>
                            <br />
                            <small>{food.portion}</small>
                          </div>
                          <div>
                            <span>{food.calories} cal</span>
                            <button
                              type="button"
                              onClick={() => startEditFood(food)}
                              className="edit-btn"
                            >
                                 ✎
                             </button>
                            <button
                              type="button"
                              onClick={() =>
                                removeFood(food.id,food.calories)
                              }
                              className="remove-btn"
                             >
                              ✖
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          
          <div className="nutrition-right">
            <div className="card nutrition-card">
              <h4 className="section-title">Healthy Recipes</h4>

              <label>Select Focus</label>
              <select
                value={selectedCondition}
                onChange={(e) => {
                  setSelectedCondition(e.target.value);
                  setRecipes([]);
                }}
              >
                <option value="general">General Health</option>
                <option value="diabetes">Diabetes-Friendly</option>
                <option value="hypertension">Heart-Healthy</option>
                <option value="weight-loss">Weight Loss</option>
              </select>

              <button onClick={showRecipes} className="bmi-btn mt-2">
                Show Recipes
              </button>

              {recipes.length === 0 ? (
                <p className="text-muted">Select a focus to view recipes</p>
              ) : (
                recipes.map((r, i) => (
                  <div key={i} className="recipe-entry">
                    <div className="d-flex justify-content-between mb-1">
                      <h6 className="mb-0">{r.name}</h6>
                      <small>
                        {r.calories} cal • {r.time}
                      </small>
                    </div>
                    <p className="small text-muted mb-1">{r.description}</p>
                    <p className="small">
                      <strong>Ingredients:</strong> {r.ingredients.join(", ")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nutrition;
