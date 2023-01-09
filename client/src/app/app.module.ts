import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseComponent } from './components/database/database.component';

import { AuthLayotsComponent } from './components/shared/layouts/auth-layots/auth-layots.component';
import { SiteLayotsComponent } from './components/shared/layouts/site-layots/site-layots.component';

import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptor } from './components/shared/classes/token.interceptor';
import { PasswordCreateComponent } from './components/register-page/password-create/password-create.component';
import { AuthGuard } from './components/shared/classes/auth.guard';
import { AuthService } from './components/shared/services/auth.service';
import { LoaderComponent } from './components/shared/components/loader/loader.component';
import { ProductItemComponent } from './components/database/product-item/product-item.component';
import { NewItemComponent } from './components/database/product-item/new-item/new-item.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SelectImageComponent } from './components/database/product-item/select-image/select-image.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { FilterProductsPipe } from './components/shared/pipes/filter-products.pipe';
import { SorterProductsPipe } from './components/shared/pipes/sorter-products.pipe';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SelectUserImageComponent } from './components/user-profile/select-user-image/select-user-image.component';
import { CheckPasswordComponent } from './components/user-profile/check-password/check-password.component';
import { ChangePasswordComponent } from './components/user-profile/change-password/change-password.component';

import { AddNewCategoryComponent } from './components/database/menu/add-new-category/add-new-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DatabaseComponent,
    AuthLayotsComponent,
    SiteLayotsComponent,

    RegisterPageComponent,
    LoginPageComponent,
    PasswordCreateComponent,
    LoaderComponent,
    ProductItemComponent,
    NewItemComponent,
    SelectImageComponent,
    FilterProductsPipe,
    SorterProductsPipe,
    UserProfileComponent,
    SelectUserImageComponent,
    CheckPasswordComponent,
    ChangePasswordComponent,

    AddNewCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatInputModule,
    NgImageSliderModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },

    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
