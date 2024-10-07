import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function FoodList({ items, onEdit, onDelete }) {
  console.log("onEdit function:", onEdit); // Check if onEdit is defined
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <li key={index} className="flex flex-col py-2">
          <div className="flex justify-between">
            <span className="w-1/2 font-semibold">{item.food}</span>
            <span className="w-1/4 text-right font-semibold">{item.calories} kcal</span>
            <div className="w-1/4 flex justify-end">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-500 mr-2"
                aria-label="Edit item"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500"
                aria-label="Delete item"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            <span className="w-1/3 text-right">{item.protein}g Protein</span>
            <span className="w-1/3 text-right">{item.carbs}g Carbs</span>
            <span className="w-1/3 text-right">{item.fats}g Fats</span>
          </div>
        </li>
      ))}
    </ul>
  );
}


export default FoodList;
