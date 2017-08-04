import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { 
  AngularMaterialModules,
  appRoutes,
  Components,
  Modules,
  Services,
  Pages
} from '../appstuff';

@NgModule({
  declarations: [
    Components,
    Pages
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ...Modules,
    ...AngularMaterialModules
  ],
  providers: [ Services ],
  bootstrap: [Components[0]]
})
export class AppModule { }
