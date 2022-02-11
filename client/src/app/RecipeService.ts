import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { RecipeDetails } from "./recipe-detail/recipe-detail.model";

@Injectable()
export class RecipeService{

  constructor(private http:HttpClient){}


  public getAllRecipes():Promise<any>{
    return lastValueFrom(this.http.get<any>('http://localhost:8080/api/recipes'))
  }

  public getRecipe(recipeId:string):Promise<any>{
    return lastValueFrom(this.http.get<any>(`http://localhost:8080/api/recipe/${recipeId}`))
  }

  public postRecipe(recipe:RecipeDetails):Promise<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json')
    return lastValueFrom(this.http.post<any>("http://localhost:8080/api/recipe",JSON.stringify(recipe),{headers:headers}))
  }
}

