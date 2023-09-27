import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, provideRouter} from "@angular/router";
import {ROUTES} from "./app/app.routes";
import {ReactiveFormsModule} from "@angular/forms";
import {provideStore} from '@ngrx/store';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, MatSnackBarModule, HttpClientModule, ActivatedRoute, BrowserAnimationsModule, ReactiveFormsModule),
    provideAnimations(),
    provideRouter(ROUTES),
    provideStore()
  ]
})
  .catch(err => console.error(err));
