import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../RecipeService';
import { RecipeDetails } from './recipe-detail.model';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id:string=''
  recipeDetails!:RecipeDetails


  constructor(private recipeSvc:RecipeService, private activatedRoute:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.id = this.activatedRoute.snapshot.params['id']
    this.recipeSvc.getRecipe(this.id)
    this.recipeDetails = await this.recipeSvc.getRecipe(this.id)
    console.log("Recipe Details" , this.recipeDetails)
    console.log("Recipe image", this.recipeDetails.image)
    console.log("Recipe title", this.recipeDetails.title)
    console.log("Recipe Ingredients", this.recipeDetails.ingredients)
    console.log("Recipe instructions", this.recipeDetails.instructions)

  }

}
