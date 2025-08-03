import React, { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../services/recipeService";

export default function Body() {
    // State for the list of ingredients
    const [ingredients, setIngredients] = useState([
        "all the main spices", "pasta", "ground beef", "tomato paste"
    ]);
    
    // State for the input field for a new ingredient
    const [newIngredient, setNewIngredient] = useState("");
    
    // State to hold the recipe content from the API
    const [recipe, setRecipe] = useState("");
    
    // State to manage the loading status of the API call
    const [isGenerating, setIsGenerating] = useState(false);

    /**
     * Handles the API call to fetch a recipe.
     */
    async function getRecipe() {
        setIsGenerating(true);
        try {
            const recipeFromApi = await getRecipeFromMistral(ingredients);
            setRecipe(recipeFromApi);
        } catch (error) {
            console.error("Failed to fetch recipe:", error);
            setRecipe("Sorry, something went wrong. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    }

    /**
     * Adds a new ingredient to the list from the form submission.
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    function addIngredient(e) {
        e.preventDefault();
        if (newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            setNewIngredient(""); // Clear the input field after adding
        }
    }
    
    /**
     * Removes an ingredient from the list by its index.
     * @param {number} indexToRemove - The index of the ingredient to remove.
     */
    function removeIngredient(indexToRemove) {
        setIngredients(prevIngredients =>
            prevIngredients.filter((_, index) => index !== indexToRemove)
        );
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeIngredient={removeIngredient}
                    isGenerating={isGenerating}
                />
            }

            <ClaudeRecipe recipe={recipe} isGenerating={isGenerating} />
        </main>
    );
}
