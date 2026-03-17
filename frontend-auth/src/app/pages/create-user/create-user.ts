import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css']
})
export class CreateUserComponent {
  form: any;
  

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {this.form = this.fb.group({
    nome: [''],
    email: [''],
    senha: ['']
  });}

  criarUsuario() {
    if (this.form.invalid) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.api.post('/users', this.form.value).subscribe({
      next: (res: any) => {
        alert('Usuário criado com sucesso!');
        this.router.navigate(['/login']); // redireciona para login
      },
      error: (err: any) => {
        console.error('Erro ao criar usuário:', err);
        alert('Não foi possível criar o usuário. Tente novamente.');
      }
    });
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}