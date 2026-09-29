# Fetch Recipe

A small recipe browser built with plain JavaScript (ES modules). Recipes come from the
[DummyJSON recipes API](https://dummyjson.com/docs/recipes).

## Run locally

ES modules do not load from `file://`, so serve the folder over HTTP, for example with
the VS Code "Live Server" extension, the IntelliJ built-in preview server, or:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html          recipe list
recipe.html         recipe details (recipe.html?id=1)
CSS/                base.css, recipes.css, recipe-detail.css
JS/api.js           all calls to the API
JS/recipes.js       list page
JS/recipe-detail.js detail page
```