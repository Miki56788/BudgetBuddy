import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    this.http.post('http://127.0.0.1:8000/api/user/register/', {
      first_name: this.firstName,
      last_name: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: () => {
        this.http.post('http://127.0.0.1:8000/api/token/', {
          username: this.username,
          password: this.password
        }).subscribe({
          next: (res: any) => {
            localStorage.setItem('access_token', res.access); 
            alert('Registered and logged in!');
            this.router.navigate(['/home']); 
          },
          error: () => {
            alert('Registered, but login failed');
          }
        });
      },
    });
  }
}
