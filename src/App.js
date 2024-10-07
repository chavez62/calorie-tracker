import { useState } from 'react';
import FoodInput from './components/FoodInput';
import FoodList from './components/FoodList';
import { useLocalStorage } from './useLocalStorage';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

function App() {
  const [items, setItems] = useLocalStorage('calorie-tracker-items', []);
  const [caloricGoal, setCaloricGoal] = useState(2000);
  const [editingIndex, setEditingIndex] = useState(null);

  // Calculate totals
  const totalCalories = items.reduce((total, item) => total + item.calories, 0);
  const totalProtein = items.reduce((total, item) => total + (item.protein || 0), 0);
  const totalCarbs = items.reduce((total, item) => total + (item.carbs || 0), 0);
  const totalFats = items.reduce((total, item) => total + (item.fats || 0), 0);
  
  const progressPercentage = Math.min((totalCalories / caloricGoal) * 100, 100);

  let progressColor = '';
  if (progressPercentage <= 60) {
    progressColor = '#76c7c0'; // Green
  } else if (progressPercentage <= 75) {
    progressColor = '#f1c40f'; // Yellow
  } else {
    progressColor = '#e74c3c'; // Red
  }

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
  };

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = [...items];
    updatedItems[editingIndex] = updatedItem;
    setItems(updatedItems);
    setEditingIndex(null); // Clear editing mode after update
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        
        {/* Flex container for Title and Caloric Goal input */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-700 mx-auto">Calorie Tracker</h1>
          <div className="flex items-center">
            <label className="text-lg font-semibold mr-2">Set Daily Caloric Goal:</label>
            <input 
              type="number" 
              value={caloricGoal} 
              onChange={(e) => setCaloricGoal(Number(e.target.value))} 
              className="p-1 border rounded"
              aria-label="Set caloric goal"
            />
          </div>
        </div>

        <FoodInput 
          onAdd={handleAddItem}
          onUpdate={handleUpdateItem}
          editingItem={items[editingIndex]}
          clearEditing={() => setEditingIndex(null)}
        />
        
        <FoodList
          items={items}
          onEdit={handleEditItem} // Pass handleEditItem as onEdit prop
          onDelete={handleDeleteItem}
        />

        {/* Circular Progress Bar */}
        <div className="w-32 h-32 mx-auto my-4">
          <CircularProgressbar
            value={progressPercentage}
            text={`${Math.round(progressPercentage)}%`}
            styles={buildStyles({
              pathColor: progressColor,
              textColor: '#333',
              trailColor: '#d6d6d6',
              backgroundColor: '#f8f9fa'
            })}
          />
        </div>

        {/* Total Calories Section */}
        <div className="mt-4 text-lg font-semibold text-center">
          <strong>Total Calories:</strong> {totalCalories} kcal / {caloricGoal} kcal
        </div>

        {/* Total Protein, Carbs, Fats Section */}
        <div className="text-center text-lg font-semibold mt-4">
          <p className="total-protein"><strong>Total Protein:</strong> {totalProtein} g</p>
          <p className="total-carbs"><strong>Total Carbs:</strong> {totalCarbs} g</p>
          <p className="total-fats"><strong>Total Fats:</strong> {totalFats} g</p>
        </div>
      </div>
    </div>
  );
}

export default App;
