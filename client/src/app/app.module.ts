// modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptor } from './components/shared/classes/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { ActualOrderComponent } from './components/order/actual-order/actual-order.component';
import { AddNewCategoryComponent } from './components/database/menu/add-new-category/add-new-category.component';
import { AddToOrderComponent } from './components/database/product-item/add-to-order/add-to-order.component';
import { AuthGuard } from './components/shared/classes/auth.guard';
import { AuthLayotsComponent } from './components/shared/layouts/auth-layots/auth-layots.component';
import { AuthService } from './components/shared/services/auth.service';

import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/companies/company/company.component';
import { CheckPasswordComponent } from './components/user-profile/check-password/check-password.component';
import { ChangePasswordComponent } from './components/user-profile/change-password/change-password.component';

import { DatabaseComponent } from './components/database/database.component';

import { FooterComponent } from './components/footer/footer.component';

import { HeaderComponent } from './components/header/header.component';

import { LoaderComponent } from './components/shared/components/loader/loader.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { NewItemComponent } from './components/database/product-item/new-item/new-item.component';


import { OrderComponent } from './components/order/order.component';
import { OrderCompliteComponent } from './components/order/order-complite/order-complite.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';

import { PasswordCreateComponent } from './components/register-page/password-create/password-create.component';
import { ProductItemComponent } from './components/database/product-item/product-item.component';

import { RegisterPageComponent } from './components/register-page/register-page.component';

import { SelectImageComponent } from './components/database/product-item/select-image/select-image.component';
import { SelectUserImageComponent } from './components/user-profile/select-user-image/select-user-image.component';
import { SiteLayotsComponent } from './components/shared/layouts/site-layots/site-layots.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

// pipes
import { FilterProductsPipe } from './components/shared/pipes/filter-products.pipe';
import { SorterProductsPipe } from './components/shared/pipes/sorter-products.pipe';





@NgModule({
  declarations: [
    AppComponent,
    AuthLayotsComponent,
    AddNewCategoryComponent,
    AddToOrderComponent,
    ActualOrderComponent,
    CheckPasswordComponent,
    ChangePasswordComponent,
    CompaniesComponent,
    CompanyComponent,
    DatabaseComponent,
    FilterProductsPipe,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    LoginPageComponent,
    NewItemComponent,
    OrderComponent,
    OrderCompliteComponent,
    OrderDetailComponent,
    PasswordCreateComponent,
    ProductItemComponent,
    RegisterPageComponent,
    SelectImageComponent,
    SelectUserImageComponent,
    SiteLayotsComponent,
    SorterProductsPipe,
    UserProfileComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    NgxSpinnerModule,
    ReactiveFormsModule

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
