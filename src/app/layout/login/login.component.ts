import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    ValidationErrors
  } from '@angular/forms';
import { Observable, Observer, Subject} from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;  // 登录表单
    registerForm: FormGroup; // 注册表单

    tabActiveIndex: number; // tab激活序列号

    usernameValidator$: Observable<any>;  // 用户验证
    userNameText$ = new Subject<string>();  // 用户名

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        userName: [ null, [ Validators.required ] ],
        password: [ null, [ Validators.required ] ],
        remember: [ false ]
      });

      this.registerForm = this.fb.group({
        userName: [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
        email   : [ '', [ Validators.email, Validators.required ]],
        password: [ '', [ Validators.required ] ],
        confirm : [ '', [ this.confirmValidator ] ]
      });

      // this.usernameValidator$ = this.userNameText$.pipe(
      //   debounceTime(500),
      //   distinctUntilChanged(),
      //   switchMap (name => this.userService.userNameValidator(name))
      // )
    }

    /**
     * tab面板序列号值变化回调
     * @param $event 
     */
    tabActiveIndexChange($event: number) {
      this.tabActiveIndex = $event;
    }

    /**
     * 切换tab到指定的序列号位置
     */
    switchToLogin(val: number) {
      this.tabActiveIndex = val;
    }

    /**
     * 检测密码与确认密码是否一致
     */
    validateConfirmPassword(): void {
        setTimeout(() => this.registerForm.controls.confirm.updateValueAndValidity());
    }
    /**
     * 用户名是否注册异步验证
     */
    userNameAsyncValidator = (control: FormControl) =>{
      return Observable.create((observer: Observer<ValidationErrors>) => {
       setTimeout(() => {
        if (control.value === 'asdfas') {
          observer.next({error: true, duplicated: true});
        } else {
          observer.next(null);
        }
        observer.complete();
       }, 1000);
      })
    }
    
   
    /**
     * 注册密码一致性验证 --用此种写法，用来解决this指向问题。
     */
    // confirmValidator(control: FormControl): {[s: string]: boolean}{
    //   if (!control.value) {
    //     return { required: true};
    //   } else if (control.value !== this.registerForm.controls.password.value){
    //     return { confirm: true, error: true}
    //   }
    // }
    confirmValidator = (control: FormControl): {[s: string]: boolean} => {
      if (!control.value) {
        return { required: true};
      } else if (control.value !== this.registerForm.controls.password.value){
        return { confirm: true, error: true}
      }
    }
    /**
     * 提交登录表单
     */
    submitLogin(): void {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[ i ].markAsDirty();
        this.loginForm.controls[ i ].updateValueAndValidity();
      }
    }
    /**
     * 提交注册表单
     * @param $event 
     * @param val 
     */
    submitRegister($event, val): void {
      console.log($event, val);
      console.log(this.registerForm.get('email'));
    }
}