const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.homepage);
router.get('/receita/:id', recipeController.exploreRecipe );
router.get('/categorias', recipeController.exploreCategories);
router.get('/categorias/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-recente', recipeController.exploreLatest);
router.get('/explore-aleatorio', recipeController.exploreRandom);
router.get('/enviar-receita', recipeController.submitRecipe);
router.post('/enviar-receita', recipeController.submitRecipeOnPost);

module.exports = router;