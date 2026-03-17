import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // Centralizador de Headers (O padrão que você deve usar sempre)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // --- MÉTODOS BASE ---
  login(body: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`, { headers: this.getAuthHeaders() });
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}`, data, { headers: this.getAuthHeaders() });
  }

  put(path: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${path}`, data, { headers: this.getAuthHeaders() });
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${path}`, { headers: this.getAuthHeaders() });
  }

  // --- MÉTODOS ESPECÍFICOS ---
  getUsers(): Observable<any> { return this.get('/users'); }
  
  getUserById(id: string): Observable<any> { return this.get(`/users/${id}`); }
  
  updateUser(id: string, data: any): Observable<any> { return this.put(`/users/${id}`, data); }
  
  deleteUser(id: string): Observable<any> { return this.delete(`/users/${id}`); }


  
}