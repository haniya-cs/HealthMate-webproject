import React, { useState } from 'react';
import'../pages/dietplan.css';
const Dietplan = () => {
    

    const [formData, setFormData] = useState({
        dietAge: '',
        dietGender: '',
        dietHeight: '',
        dietWeight: '',
        dietActivity: '',
        dietGoal: '',
        dietRestrictions: 'none',
        allergies: '',
        diseases:""
    });
    const [planData, setPlanData] = useState(null);

    const dietPlans = {
        'weight-loss': {
            breakfast: [
                { name: 'Greek Yogurt with Berries', calories: 180, protein: 15, carbs: 20, fats: 5, ingredients: ['Greek yogurt', 'Mixed berries', 'Honey', 'Chia seeds'] },
                { name: 'Vegetable Omelet', calories: 220, protein: 18, carbs: 8, fats: 12, ingredients: ['Eggs', 'Spinach', 'Mushrooms', 'Bell peppers', 'Low-fat cheese'] },
                { name: 'Overnight Oats', calories: 200, protein: 8, carbs: 35, fats: 6, ingredients: ['Rolled oats', 'Almond milk', 'Banana', 'Cinnamon', 'Walnuts'] }
            ],
            lunch: [
                { name: 'Grilled Chicken Salad', calories: 350, protein: 35, carbs: 15, fats: 18, ingredients: ['Grilled chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil vinaigrette'] },
                { name: 'Quinoa Buddha Bowl', calories: 380, protein: 16, carbs: 45, fats: 15, ingredients: ['Quinoa', 'Roasted vegetables', 'Chickpeas', 'Avocado', 'Tahini dressing'] },
                { name: 'Turkey Lettuce Wraps', calories: 280, protein: 25, carbs: 12, fats: 14, ingredients: ['Ground turkey', 'Lettuce leaves', 'Bell peppers', 'Onions', 'Asian sauce'] }
            ],
            dinner: [
                { name: 'Baked Salmon with Vegetables', calories: 420, protein: 35, carbs: 20, fats: 22, ingredients: ['Salmon fillet', 'Broccoli', 'Sweet potato', 'Olive oil', 'Herbs'] },
                { name: 'Zucchini Noodles with Turkey', calories: 320, protein: 28, carbs: 15, fats: 16, ingredients: ['Zucchini noodles', 'Ground turkey', 'Marinara sauce', 'Parmesan', 'Basil'] },
                { name: 'Stuffed Bell Peppers', calories: 300, protein: 22, carbs: 25, fats: 12, ingredients: ['Bell peppers', 'Lean ground beef', 'Brown rice', 'Onions', 'Tomatoes'] }
            ]
        },
        'weight-gain': {
            breakfast: [
                { name: 'Protein Pancakes', calories: 450, protein: 25, carbs: 45, fats: 18, ingredients: ['Oats', 'Protein powder', 'Banana', 'Eggs', 'Peanut butter'] },
                { name: 'Avocado Toast with Eggs', calories: 420, protein: 20, carbs: 35, fats: 24, ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cheese', 'Nuts'] },
                { name: 'Smoothie Bowl', calories: 380, protein: 18, carbs: 50, fats: 15, ingredients: ['Protein powder', 'Banana', 'Berries', 'Granola', 'Almond butter'] }
            ],
            lunch: [
                { name: 'Chicken Rice Bowl', calories: 550, protein: 40, carbs: 60, fats: 18, ingredients: ['Grilled chicken', 'Brown rice', 'Black beans', 'Avocado', 'Salsa'] },
                { name: 'Pasta with Meat Sauce', calories: 520, protein: 35, carbs: 55, fats: 20, ingredients: ['Whole wheat pasta', 'Ground beef', 'Marinara sauce', 'Parmesan', 'Vegetables'] },
                { name: 'Tuna Sandwich', calories: 480, protein: 30, carbs: 45, fats: 22, ingredients: ['Whole grain bread', 'Tuna', 'Avocado', 'Cheese', 'Vegetables'] }
            ],
            dinner: [
                { name: 'Steak with Sweet Potato', calories: 620, protein: 45, carbs: 40, fats: 28, ingredients: ['Lean steak', 'Sweet potato', 'Green beans', 'Olive oil', 'Herbs'] },
                { name: 'Salmon with Quinoa', calories: 580, protein: 38, carbs: 45, fats: 26, ingredients: ['Salmon fillet', 'Quinoa', 'Roasted vegetables', 'Nuts', 'Olive oil'] },
                { name: 'Chicken Curry with Rice', calories: 550, protein: 35, carbs: 55, fats: 20, ingredients: ['Chicken breast', 'Basmati rice', 'Coconut milk', 'Vegetables', 'Spices'] }
            ]
        },
        'maintain': {
            breakfast: [
                { name: 'Balanced Breakfast Bowl', calories: 320, protein: 18, carbs: 35, fats: 12, ingredients: ['Eggs', 'Whole grain toast', 'Avocado', 'Tomatoes', 'Spinach'] },
                { name: 'Protein Smoothie', calories: 280, protein: 20, carbs: 30, fats: 10, ingredients: ['Protein powder', 'Banana', 'Spinach', 'Almond milk', 'Berries'] },
                { name: 'Oatmeal with Nuts', calories: 300, protein: 12, carbs: 40, fats: 12, ingredients: ['Steel-cut oats', 'Almonds', 'Banana', 'Cinnamon', 'Greek yogurt'] }
            ],
            lunch: [
                { name: 'Mediterranean Wrap', calories: 420, protein: 25, carbs: 40, fats: 18, ingredients: ['Whole wheat tortilla', 'Grilled chicken', 'Hummus', 'Vegetables', 'Feta cheese'] },
                { name: 'Lentil Soup with Bread', calories: 380, protein: 20, carbs: 50, fats: 12, ingredients: ['Red lentils', 'Vegetables', 'Whole grain bread', 'Olive oil', 'Herbs'] },
                { name: 'Fish Tacos', calories: 400, protein: 28, carbs: 35, fats: 16, ingredients: ['White fish', 'Corn tortillas', 'Cabbage slaw', 'Avocado', 'Lime'] }
            ],
            dinner: [
                { name: 'Grilled Chicken with Vegetables', calories: 450, protein: 35, carbs: 30, fats: 20, ingredients: ['Chicken breast', 'Mixed vegetables', 'Brown rice', 'Olive oil', 'Herbs'] },
                { name: 'Vegetarian Stir-fry', calories: 380, protein: 15, carbs: 45, fats: 18, ingredients: ['Tofu', 'Mixed vegetables', 'Brown rice', 'Soy sauce', 'Sesame oil'] },
                { name: 'Baked Cod with Quinoa', calories: 420, protein: 30, carbs: 35, fats: 16, ingredients: ['Cod fillet', 'Quinoa', 'Roasted vegetables', 'Lemon', 'Herbs'] }
            ]
        },
        'muscle-gain': {
            breakfast: [
                { name: 'High-Protein Scramble', calories: 480, protein: 35, carbs: 25, fats: 25, ingredients: ['Eggs', 'Egg whites', 'Cheese', 'Spinach', 'Whole grain toast'] },
                { name: 'Protein Oatmeal', calories: 420, protein: 30, carbs: 45, fats: 15, ingredients: ['Oats', 'Protein powder', 'Banana', 'Peanut butter', 'Milk'] },
                { name: 'Greek Yogurt Parfait', calories: 380, protein: 25, carbs: 35, fats: 16, ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Nuts', 'Honey'] }
            ],
            lunch: [
                { name: 'Chicken and Rice', calories: 580, protein: 45, carbs: 55, fats: 18, ingredients: ['Grilled chicken', 'Brown rice', 'Vegetables', 'Olive oil', 'Herbs'] },
                { name: 'Protein-Packed Salad', calories: 520, protein: 40, carbs: 25, fats: 28, ingredients: ['Mixed greens', 'Grilled chicken', 'Quinoa', 'Nuts', 'Avocado'] },
                { name: 'Turkey Burger with Sweet Potato', calories: 550, protein: 38, carbs: 45, fats: 22, ingredients: ['Turkey burger', 'Sweet potato fries', 'Vegetables', 'Whole grain bun'] }
            ],
            dinner: [
                { name: 'Lean Beef with Vegetables', calories: 650, protein: 50, carbs: 35, fats: 30, ingredients: ['Lean beef', 'Brown rice', 'Broccoli', 'Olive oil', 'Herbs'] },
                { name: 'Salmon with Quinoa', calories: 620, protein: 42, carbs: 40, fats: 28, ingredients: ['Salmon fillet', 'Quinoa', 'Asparagus', 'Nuts', 'Olive oil'] },
                { name: 'Chicken Breast with Pasta', calories: 580, protein: 45, carbs: 50, fats: 20, ingredients: ['Chicken breast', 'Whole wheat pasta', 'Vegetables', 'Parmesan', 'Olive oil'] }
            ]
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { dietAge, dietGender, dietHeight, dietWeight, dietActivity, dietGoal } = formData;

        if (!dietGoal) return;

        // BMR Calculation
        let bmr = dietGender === 'male'
            ? 10 * parseFloat(dietWeight) + 6.25 * parseFloat(dietHeight) - 5 * parseInt(dietAge) + 5
            : 10 * parseFloat(dietWeight) + 6.25 * parseFloat(dietHeight) - 5 * parseInt(dietAge) - 161;

        const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extreme: 1.9 };
        let tdee = bmr * activityMultipliers[dietActivity];

        // Adjust calories based on goal
        let targetCalories;
        if (dietGoal === 'weight-loss') targetCalories = Math.round(tdee - 500);
        else if (dietGoal === 'weight-gain') targetCalories = Math.round(tdee + 500);
        else if (dietGoal === 'muscle-gain') targetCalories = Math.round(tdee + 300);
        else targetCalories = Math.round(tdee);

        // 🩺 Adjust based on health condition
        if (formData.diseases === "diabetes") {
  // Lower carb ratio, increase protein slightly
        carbRatio = Math.max(0.30, carbRatio - 0.15);
        proteinRatio = proteinRatio + 0.05;
        }
        if (formData.diseases === "hypertension" || formData.diseases === "heart") {
        // Encourage less fat
         fatRatio = Math.max(0.20, fatRatio - 0.05);
       }
      if (formData.diseases === "kidney") {
      // Limit protein
       proteinRatio = Math.min(0.20, proteinRatio - 0.05);
        }


        // Macro Ratios
        let proteinRatio = 0.25, carbRatio = 0.45, fatRatio = 0.30;
        if (dietGoal === 'weight-loss') [proteinRatio, carbRatio, fatRatio] = [0.35, 0.35, 0.30];
        else if (dietGoal === 'muscle-gain') [proteinRatio, carbRatio, fatRatio] = [0.30, 0.45, 0.25];
        else if (dietGoal === 'weight-gain') [proteinRatio, carbRatio, fatRatio] = [0.25, 0.50, 0.25];

        const protein = Math.round((targetCalories * proteinRatio) / 4);
        const carbs = Math.round((targetCalories * carbRatio) / 4);
        const fats = Math.round((targetCalories * fatRatio) / 9);

        setPlanData({ calories: targetCalories, protein, carbs, fats, goal: dietGoal });
    };

    const generateWeeklyPlan = () => {
        if (!planData) return [];
        const plan = dietPlans[planData.goal] || dietPlans['maintain'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.map((day, index) => {
            const breakfast = plan.breakfast[index % plan.breakfast.length];
            const lunch = plan.lunch[index % plan.lunch.length];
            const dinner = plan.dinner[index % plan.dinner.length];

            return {
                day,
                breakfast,
                lunch,
                dinner,
                totalCalories: breakfast.calories + lunch.calories + dinner.calories,
                totalProtein: breakfast.protein + lunch.protein + dinner.protein,
                totalCarbs: breakfast.carbs + lunch.carbs + dinner.carbs,
                totalFats: breakfast.fats + lunch.fats + dinner.fats
            };
        });
    };

    const createMealCard = (mealType, meal, bgColor, textColor) => {
        const mealIcons = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙' };
        if (!meal) return null;
        return (
            <div className={`${bgColor} rounded-lg p-4`}>
                <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{mealIcons[mealType]}</span>
                    <h4 className={`font-semibold ${textColor}`}>{mealType}</h4>
                </div>
                <h5 className="font-bold mb-1">{meal.name}</h5>
                <div className="text-sm text-gray-600 mb-2">
                    {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs | {meal.fats}g fats
                </div>
                <div className="text-xs text-gray-500">
                    <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                </div>
            </div>
        );
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-8">7-Day Personalized Diet Planner</h1>
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label>Age</label>
                                <input type="number" name="dietAge" value={formData.dietAge} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" required />
                            </div>
                            <div>
                                <label>Gender</label>
                                <select name="dietGender" value={formData.dietGender} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label>Height (cm)</label>
                                <input type="number" name="dietHeight" value={formData.dietHeight} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" required />
                            </div>
                            <div>
                                <label>Weight (kg)</label>
                                <input type="number" name="dietWeight" value={formData.dietWeight} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" required />
                            </div>
                        </div>
                   <div>
                      <label>Health Conditions</label>
                            <select
                             name="diseases"
                              value={formData.diseases}
                                onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded-lg"
                          >
                               <option value="">None</option>
                             <option value="diabetes">Diabetes</option>
                             <option value="hypertension">Hypertension (High Blood Pressure)</option>
                               <option value="heart">Heart Disease</option>
                             <option value="cholesterol">High Cholesterol</option>
                             <option value="thyroid">Thyroid Disorder</option>
                             <option value="pcos">PCOS / PCOD</option>
                             <option value="obesity">Obesity</option>
                             <option value="celiac">Celiac Disease (Gluten Intolerance)</option>
                             <option value="lactose">Lactose Intolerance</option>
                             <option value="kidney">Kidney Disease</option>
                                </select>
                    </div>

                        <div>
                            <label>Activity Level</label>
                            <select name="dietActivity" value={formData.dietActivity} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" required>
                                <option value="">Select Activity</option>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="very">Very</option>
                                <option value="extreme">Extreme</option>
                            </select>
                        </div>

                        <div>
                            <label>Health Goal</label>
                            <select name="dietGoal" value={formData.dietGoal} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" required>
                                <option value="">Select Goal</option>
                                <option value="weight-loss">Weight Loss</option>
                                <option value="weight-gain">Weight Gain</option>
                                <option value="maintain">Maintain Weight</option>
                                <option value="muscle-gain">Muscle Gain</option>
                            </select>
                        </div>

                        <div>
                            <label>Dietary Restrictions</label>
                            <select name="dietRestrictions" value={formData.dietRestrictions} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg">
                                <option value="none">None</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="keto">Keto</option>
                                <option value="paleo">Paleo</option>
                            </select>
                        </div>


                        <div>
                            <label>Food Allergies (Optional)</label>
                            <input type="text" name="allergies" value={formData.allergies} onChange={handleInputChange} className="w-full border px-3 py-2 rounded-lg" placeholder="e.g., nuts, dairy" />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-2 hover:bg-blue-700">
                            Generate My 7-Day Plan
                        </button>
                    </form>
                </div>

                {/* Plan Display */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 max-h-[80vh] overflow-y-auto">
                    {!planData ? (
                        <p className="text-gray-500 text-center mt-12">Fill the form to see your 7-day meal plan.</p>
                    ) : (
                        <>
                            <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                                <div className="bg-blue-100 rounded-lg py-2 font-semibold">{planData.calories} cal <div className="text-sm">Calories</div></div>
                                <div className="bg-green-100 rounded-lg py-2 font-semibold">{planData.protein}g <div className="text-sm">Protein</div></div>
                                <div className="bg-yellow-100 rounded-lg py-2 font-semibold">{planData.carbs}g <div className="text-sm">Carbs</div></div>
                                <div className="bg-purple-100 rounded-lg py-2 font-semibold">{planData.fats}g <div className="text-sm">Fats</div></div>
                            </div>

                            {generateWeeklyPlan().map((dayPlan, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-4 mb-4">
                                    <div className="bg-blue-600 text-white p-2 rounded-lg mb-2">
                                        <h3 className="font-bold">{dayPlan.day}</h3>
                                        <p className="text-sm">Total: {dayPlan.totalCalories} cal | {dayPlan.totalProtein}g protein</p>
                                    </div>
                                    <div className="grid gap-3">
                                        {createMealCard('Breakfast', dayPlan.breakfast, 'bg-yellow-50', 'text-yellow-700')}
                                        {createMealCard('Lunch', dayPlan.lunch, 'bg-orange-50', 'text-orange-700')}
                                        {createMealCard('Dinner', dayPlan.dinner, 'bg-purple-50', 'text-purple-700')}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

            </div>
        </main>
    );
};

export default Dietplan;
