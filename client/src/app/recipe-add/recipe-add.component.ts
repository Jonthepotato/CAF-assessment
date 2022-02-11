import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../RecipeService';
import { RecipeDetails } from '../recipe-detail/recipe-detail.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  form!:FormGroup
  ingredientsArray!:FormArray
  message!:string

  constructor(private fb:FormBuilder, private recipeSvc:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm():FormGroup{
    this.ingredientsArray= this.fb.array([],[Validators.required,Validators.minLength(3)])
    return this.fb.group({
      title:this.fb.control('',[Validators.required, Validators.minLength(3)]),
      image:this.fb.control('',[Validators.required]),
      instructions:this.fb.control('',[Validators.required,Validators.minLength(3)]),
      ingredients:this.ingredientsArray
    })



  }

  addIngredient(){
    this.ingredientsArray.push(this.fb.control('',[Validators.required,Validators.minLength(3)]))
  }

  removeIngredient(i:number){
    this.ingredientsArray.removeAt(i)
  }

  async addRecipe(){
    const data = this.form.value as RecipeDetails
    console.log("data>>>",data)
    this.message =  await this.recipeSvc.postRecipe(data)
    this.router.navigate(['/'])

  }

}
