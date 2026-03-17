import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:3001/login', {
      email,
      password
    })
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
  return !!localStorage.getItem("token");
}

logout() {
  localStorage.removeItem("token");
}
}