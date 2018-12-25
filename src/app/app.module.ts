import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

/** 拦截器 **/ 
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TestInterceptor } from './layout/interceptors/test-interceptor';

const httpInterceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TestInterceptor, multi: true}
];

import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './layout/login/login.component';
import { ListComponent } from './layout/main/list/list.component';
import { TestComponent } from './layout/test/test.component';

const COMPONENTS = [MainComponent, LoginComponent, ListComponent, TestComponent];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers   : [ { provide: NZ_I18N, useValue: zh_CN } , httpInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
