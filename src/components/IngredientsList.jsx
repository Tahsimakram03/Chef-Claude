import React from 'react';

// Make sure to use "export default" here
export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient, index) => (
    <li key={`${ingredient}-${index}`}>
      {ingredient}
      {/* Add a button to call the removeIngredient function passed in props */}
      <button 
        className="remove-btn" 
        onClick={() => props.removeIngredient(index)}
        aria-label={`Remove ${ingredient}`}
      >
        &times;
      </button>
    </li>
  ));

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button
            type="button"
            onClick={props.getRecipe}
            disabled={props.isGenerating} // Disable button when generating
          >
            {props.isGenerating ? 'Generating...' : 'Get a recipe'}
          </button>
        </div>
      )}
    </section>
  );
}
