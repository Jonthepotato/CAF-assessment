package ibf2021.assessment.csf.server.controllers;

import java.util.List;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path="/api/recipes", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

    @Autowired
    RecipeService recipeSvc;
    

    @GetMapping
    
    public ResponseEntity<String> getRecipeLists(){
        List<Recipe> recipeList=recipeSvc.getAllRecipes();
        JsonArrayBuilder recipeArray = Json.createArrayBuilder();
        for (int index = 0; index < recipeList.size(); index++) {
            Recipe recipe=recipeList.get(index);
            JsonObject jo = Json.createObjectBuilder()
            .add("id", recipe.getId())
            .add("title",recipe.getTitle()).build();
            recipeArray.add(jo);
        }
        return ResponseEntity.ok(recipeArray.build().toString());
    }

    

    
}
