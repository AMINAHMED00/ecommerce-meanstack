import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , RouterLink , JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

      registerForm = new FormGroup({
      name : new FormControl('' ,[Validators.required]) ,
      age : new FormControl('' , [Validators.required]) ,
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    errorMessage : string = '' ;

    constructor(private authService : AuthService , private router : Router){}

    onSubmit(){
      if(this.registerForm.invalid){
        this.errorMessage = 'Please fill all fields correctly.';
        return ;
      }

      this.authService.register(this.registerForm.value as any).subscribe({
        next : (response) =>{
          console.log('Registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error : (err) =>{
          console.error('Registration failed:', err);
          this.errorMessage = err.error?.msg || 'Something went wrong. Please try again.';
        }
      });
    }
}
