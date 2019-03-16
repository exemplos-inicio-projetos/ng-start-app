import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './pages';
import { HeaderComponent } from './components';
import { DynamicComponentCreatorService } from './services';
import { AuthService } from 'guards/auth/services';
import { SharedModule } from 'shared/shared.module';
import { CustomHttpInterceptor } from '../interceptors/custom-http.interceptor';
import { AuthModule } from 'guards/auth/auth.module';
import { CoreComponent } from './core.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    CoreComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
  ],
  exports: [
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    DynamicComponentCreatorService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}
  ]
})
export class CoreModule {
}