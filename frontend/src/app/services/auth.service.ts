import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ access: string, refresh: string }> {
    return this.http.post<{ access: string, refresh: string }>(
      'http://127.0.0.1:8000/api/token/',
      { username, password }
    );
  }
}

