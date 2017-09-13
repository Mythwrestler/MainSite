import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    templateUrl : 'login.component.html'
})

export class LoginComponent {
    title = 'Login';
    loginForm: any = null;
    loginError = false;
    response: any;
    loggedIn: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService) {

        this.authService.loggedIn$.subscribe(
            loggedIn => this.loggedIn = loggedIn,
            error => this.response = error
        );

        // reroute from login screen if account is logged in.
        if (this.loggedIn) {
            this.router.navigate(['']);
        }

        this.loginForm = formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        // this.loginForm = this.formBuilder.group({
        //     username: ['', [Validators.required]],
        //     password: ['', [Validators.required]],
        // });
    }



    onSubmit() {
        this.authService.login(this.loginForm.value)
            .subscribe(() => {
                this.ngOnInit();
                this.response = 'Successfully loggedin';
                this.loginError = false;
                this.router.navigate(['']);
            },
            (error: any) => {
              console.log(JSON.stringify(error));
              this.loginError = true;
            });
    }

    // performLogin(e: Event) {
    //     e.preventDefault();
    //     let username = this.loginForm.value.username;
    //     let password = this.loginForm.value.password;
    //     this.authService.login(this.loginForm.value)
    //         .subscribe((data: any) => {
    //             // login successful
    //             this.loginError = false;
    //             let auth = this.authService.getAuth();
    //             alert('Our token is: ' + auth.access_token);
    //             this.router.navigate(['']);
    //         },
    //         (err: any) => {
    //             console.log(err);
    //             this.loginError = true;
    //         });
    // }

}
