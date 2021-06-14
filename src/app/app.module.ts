import { AuthGuard } from './shared/auth-guard.guard';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoviesComponent } from './movies/movies.component';
import { ApiService } from './shared/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoaderComponent } from './loader/loader.component';
import { LoadingInterceptor } from './shared/interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { DescriptionPipe } from './shared/description.pipe';
import {MatGridListModule} from '@angular/material/grid-list';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    LoaderComponent,
    ErrorMessageComponent,
    DescriptionPipe,
    ErrorDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    OverlayModule
  ],
  providers: [ApiService,AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
},],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
