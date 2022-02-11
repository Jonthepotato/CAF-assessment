import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../RecipeService';
import { RecipeList } from './recipe-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList!:RecipeList
  recipes!:RecipeList[]

  constructor(private recipeSvc:RecipeService, private router:Router) { }

  async ngOnInit(): Promise<void> {
    this.recipes = await this.recipeSvc.getAllRecipes()
    console.log("Recipe List>>>" , this.recipes)
    console.log("Recipe id>>>" , this.recipes[0].id)
    console.log("Recipe name>>>" , this.recipes[1].title)

  }

  chooseRecipe(i:number){
    this.router.navigate(['/recipe', this.recipes[i].id])
  }

  addRecipe(){
    this.router.navigate(['/add'])
  }

}
