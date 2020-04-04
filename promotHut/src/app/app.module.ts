import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './auth/signup/signup.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from './services/user.service'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './openPages/landingPage/landingPage.component';
import { HeaderComponent } from './openPages/header/header.component';
import { AboutComponent } from './openPages/about/about.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DesignModalComponent } from './shared/designModal/desigModal';

@NgModule({
  declarations: [
    DesignModalComponent,
    AboutComponent,
    HeaderComponent,
    SignUpComponent,
    LoginComponent,
    AppComponent,
    AdminLayoutComponent,
    LandingPageComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    FormsModule,
    ReactiveFormsModule ,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule
  ],
  entryComponents: [DesignModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
