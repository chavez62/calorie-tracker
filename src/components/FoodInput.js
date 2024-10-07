import { useState, useEffect } from 'react';

function FoodInput({ onAdd, onUpdate, editingItem, clearEditing }) {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingItem) {
      setFood(editingItem.food);
      setCalories(String(editingItem.calories));
      setProtein(String(editingItem.protein));
      setCarbs(String(editingItem.carbs));
      setFats(String(editingItem.fats));
    } else {
      setFood('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cal = parseInt(calories, 10);
    const prot = parseInt(protein, 10);
    const carb = parseInt(carbs, 10);
    const fat = parseInt(fats, 10);
    
    if (
      isNaN(cal) || cal <= 0 ||
      isNaN(prot) || prot < 0 ||
      isNaN(carb) || carb < 0 ||
      isNaN(fat) || fat < 0
    ) {
      setError('Please enter valid positive values for all fields.');
      return;
    }

    const newItem = { food, calories: cal, protein: prot, carbs: carb, fats: fat };
    
    if (editingItem) {
      onUpdate({ ...editingItem, ...newItem });
    } else {
      onAdd(newItem);
    }

    // clearEditing();
    setFood('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Food name"
          className="border p-2 mr-2 mb-2 rounded w-full"
          required
          aria-label="Food name"
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
          className="border p-2 mr-2 mb-2 rounded w-full"
          required
          aria-label="Calories"
          step="1"
        />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein (g)"
          className="border p-2 mr-2 mb-2 rounded w-full"
          required
          aria-label="Protein"
          step="1"
        />
        <input
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          placeholder="Carbs (g)"
          className="border p-2 mr-2 mb-2 rounded w-full"
          required
          aria-label="Carbs"
          step="1"
        />
        <input
          type="number"
          value={fats}
          onChange={(e) => setFats(e.target.value)}
          placeholder="Fats (g)"
          className="border p-2 mr-2 mb-2 rounded w-full"
          required
          aria-label="Fats"
          step="1"
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors w-full"
          aria-label={editingItem ? 'Update food item' : 'Add food item'}
        >
          {editingItem ? 'Update' : 'Add'}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={clearEditing}
            className="bg-gray-500 text-white p-2 rounded mt-2 w-full"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default FoodInput;
