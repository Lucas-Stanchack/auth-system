import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form: any;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      senha: ['']
    });
  }

  login() {
    const body = {
      email: this.form.value.email,
      senha: this.form.value.senha // renomeia para backend
    };

    this.http.post('http://localhost:3001/login', body).subscribe({
      next: (res: any) => {
        console.log("Resposta do servidor:", res)
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_data', JSON.stringify({ nome: res.nome }));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Erro: token não recebido');
        }
      },
      error: (err) => {
        if (err.status === 400) alert('Senha é obrigatória');
        else if (err.status === 401) alert('Email ou senha inválidos');
        else alert('Erro no login');
        console.error(err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    alert('Logout realizado');
  }
  irCriarConta() {
    this.router.navigate(['/create-user']);
  }
  irParaRecuperacao() {
    this.router.navigate(['/recuperar-senha']);
  }
  ngOnInit() {
    // Verifica se já existe um token
    if (localStorage.getItem('token')) {
      // Se existir, manda direto pro dashboard
      this.router.navigate(['/dashboard']);
    }
  }

}