package ibf2021.assessment.csf.server.controllers;

import java.io.StringReader;
import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;

@RestController
@RequestMapping(path="/api/recipe", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

    @Autowired
    RecipeService recipeSvc;
    
    @GetMapping("{id}")
    public ResponseEntity<String> getRecipes(@PathVariable String id){
        Optional<Recipe> recipeDetails= recipeSvc.getRecipeById(id);
        if(recipeDetails.isPresent()){
            return ResponseEntity.ok(jsonObjectBuilder(recipeDetails).toString());
        }else{
            JsonObjectBuilder payload = Json.createObjectBuilder();
            payload.add("message", "Non-existent recipe id");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(payload.build().toString());
        }

    }

    public JsonObject jsonObjectBuilder(Optional<Recipe> recipeDetails){
        Recipe recipe = recipeDetails.get();
        JsonArrayBuilder joa = Json.createArrayBuilder();
        for (int index=0; index<recipe.getIngredients().size(); index++)
        {
            String recipeIngredients = recipe.getIngredients().get(index);
            joa.add(recipeIngredients);
        }

        JsonObject jo = Json.createObjectBuilder()
        .add("title", recipe.getTitle())
        .add("image", recipe.getImage())
        .add("instructions", recipe.getInstruction())
        .add("ingredients", joa.build())
        .build();
        return jo;
    }

    @PostMapping(consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getRecipeDetails(@RequestBody String data){
        // String title = data.getFirst("title");
        // String image = data.getFirst("image");
        // String instruction = data.getFirst("instructions");
        // String ingredients = data.getFirst("ingredients");
        JsonReader jsonReader = Json.createReader(new StringReader(data));
        JsonObject object = jsonReader.readObject();
        System.out.println(object);
        Recipe saveRecipe = new Recipe();
        saveRecipe.setTitle(object.getString("title"));
        saveRecipe.setImage(object.getString("image"));
        saveRecipe.setInstruction(object.getString("instructions"));
        saveRecipe.addIngredient(object.getString("ingredients"));
        recipeSvc.addRecipe(saveRecipe);
        JsonObjectBuilder payload = Json.createObjectBuilder();
        payload.add("message", "Recipe saved");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(payload.build().toString());

    }
}