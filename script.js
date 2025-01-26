document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const ingredientInputs = document.getElementById("ingredient-inputs");
    const addIngredientButton = document.getElementById("add-ingredient");
    const outputDiv = document.getElementById("output");
  
    // Function to add a new ingredient row
    const addIngredientRow = () => {
      const row = document.createElement("div");
      row.className = "row g-3 ingredient-group";
      row.innerHTML = `
        <div class="col-md-5">
          <input type="text" class="form-control" placeholder="Ingredient Name" required>
        </div>
        <div class="col-md-3">
          <input type="number" class="form-control" placeholder="Quantity (e.g., 2)" required>
        </div>
        <div class="col-md-3">
          <input type="number" class="form-control" placeholder="Cost per Unit ($)" required>
        </div>
        <div class="col-md-1 text-center">
          <button type="button" class="btn btn-danger remove-ingredient">✖</button>
        </div>
      `;
      ingredientInputs.appendChild(row);
      enableRemoveButtons();
    };
  
    // Enable remove buttons when there are multiple rows
    const enableRemoveButtons = () => {
      const removeButtons = document.querySelectorAll(".remove-ingredient");
      removeButtons.forEach((button, index) => {
        button.classList.toggle("d-none", ingredientInputs.children.length === 1);
        button.addEventListener("click", () => {
          if (ingredientInputs.children.length > 1) {
            ingredientInputs.removeChild(button.closest(".ingredient-group"));
            enableRemoveButtons();
          }
        });
      });
    };
  
    // Handle adding new ingredient
    addIngredientButton.addEventListener("click", addIngredientRow);
  
    // Calculate total cost
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let totalCost = 0;
  
      Array.from(ingredientInputs.children).forEach((group) => {
        const [nameInput, quantityInput, costInput] = group.querySelectorAll("input");
        const quantity = parseFloat(quantityInput.value);
        const costPerUnit = parseFloat(costInput.value);
  
        if (!isNaN(quantity) && !isNaN(costPerUnit)) {
          totalCost += quantity * costPerUnit;
        }
      });
  
      outputDiv.innerHTML = `<div class="alert alert-info">Total Recipe Cost: <strong>$${totalCost.toFixed(2)}</strong></div>`;
    });
  
    enableRemoveButtons(); // Initialize remove buttons
  });
  