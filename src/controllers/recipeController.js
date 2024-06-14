require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.homepage = async(req, res) => {
    try {
      const limitNumber = 5;
      const categories = await Category.find({}).limit(limitNumber);
      const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
      const thai = await Recipe.find({ 'category': 'Thailandesa' }).limit(limitNumber);
      const american = await Recipe.find({ 'category': 'Americana' }).limit(limitNumber);
      const chinese = await Recipe.find({ 'category': 'Chinesa' }).limit(limitNumber);
      const mexican = await Recipe.find({ 'category': 'Mexicana' }).limit(limitNumber);
      const indian = await Recipe.find({ 'category': 'Indiana' }).limit(limitNumber);
      const spanish = await Recipe.find({ 'category': 'Espanhola' }).limit(limitNumber);

      const food = { latest, thai, american, chinese, mexican, indian, spanish };

      res.render('index', { title: 'CookBook - Inicio', categories, food} );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }

exports.exploreCategories = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'CookBook - Categorias', categories } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }

  exports.exploreRecipe = async(req, res) => {
    try {
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('recipe', { title: 'CookBook - Receita', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

  exports.exploreCategoriesById = async(req, res) => { 
    try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
      res.render('categories', { title: 'CookBook - Categorias', categoryById } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }   


  exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'CookBook - Busca', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    } 
  }

  exports.exploreLatest = async(req, res) => {
    try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { title: 'CookBook - Explore Recentes', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 
  
  exports.exploreRandom = async(req, res) => {
    try {
      let count = await Recipe.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let recipe = await Recipe.findOne().skip(random).exec();
      res.render('explore-random', { title: 'CookBook - Explore Uma Receita Aleatória', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  }

  exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'CookBook - Envie sua Receita', infoErrorsObj, infoSubmitObj  } );
  }

  exports.submitRecipeOnPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('Nenhum Arquivo Inserido.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Receita adicionada.')
      res.redirect('/enviar-receita');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/enviar-receita');
    }
  }