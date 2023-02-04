
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActualOrderComponent } from './components/order/actual-order/actual-order.component';
import { AuthGuard } from './components/shared/classes/auth.guard';
import { AuthLayotsComponent } from './components/shared/layouts/auth-layots/auth-layots.component';

import { ChangePasswordComponent } from './components/user-profile/change-password/change-password.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/companies/company/company.component';

import { DatabaseComponent } from './components/database/database.component';

import { LoginPageComponent } from './components/login-page/login-page.component';

import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderComponent } from './components/order/order.component';

import { ProductItemComponent } from './components/database/product-item/product-item.component';

import { RegisterPageComponent } from './components/register-page/register-page.component';

import { SiteLayotsComponent } from './components/shared/layouts/site-layots/site-layots.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '', component: AuthLayotsComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }


    ]
  },
  {
    path: '', component: SiteLayotsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'companies', component: CompaniesComponent, title: 'Companies' },
      { path: 'companies/company/:idCompany', component: CompanyComponent, title: 'Company' },

      { path: 'database', component: DatabaseComponent, title: 'Database' },
      { path: 'database/product-item/:idPosition', component: ProductItemComponent, title: 'Database' },

      { path: 'user-profile', component: UserProfileComponent, title: 'User Profile' },
      { path: 'user-profile/change-password', component: ChangePasswordComponent, title: 'Change password' },

      { path: 'orders', component: OrderComponent, title: 'Orders' },
      { path: 'orders/actual-order/:idOrder', component: ActualOrderComponent, title: 'Actual order' },
      { path: 'orders/order-detail/:idOrder', component: OrderDetailComponent, title: 'Order detail' }





    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
