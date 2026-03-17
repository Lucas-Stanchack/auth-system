import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nova-senha.html',
  styleUrls: ['../login/login.css']
})
export class NovaSenhaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({ novaSenha: [''] });
  }

  atualizarSenha() {
  const novaSenha = this.form.value.novaSenha;
  const email = localStorage.getItem('email_recuperacao'); // Recupera o e-mail

  if (!email) {
    alert('Sessão expirada. Tente novamente.');
    this.router.navigate(['/login']);
    return;
  }

  this.http.post('http://localhost:3001/atualizar-senha', { novaSenha, email }).subscribe({
    next: () => {
      alert('Senha atualizada com sucesso!');
      localStorage.removeItem('email_recuperacao'); // Limpa o e-mail após o uso
      this.router.navigate(['/login']);
    },
    error: (err) => alert('Erro: ' + (err.error.message || 'Erro ao atualizar'))
  });
}
}