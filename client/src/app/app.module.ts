import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RouterModule } from '@angular/router';
import { RecipeService } from './RecipeService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'


const appRoutes=[{path:'',component: RecipeListComponent},
{path:'recipe/:id',component:RecipeDetailComponent},
{path:'add',component:RecipeAddComponent},
{path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeAddComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule
    ,HttpClientModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
