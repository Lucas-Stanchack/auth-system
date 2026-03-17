import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './recuperar-senha.html',
  styleUrls: ['./recuperar-senha.css']
})
export class RecuperarSenhaComponent {

  form: FormGroup;
  isSending = false;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    public router: Router
  ) {
    this.form = this.fb.group({
      email: ['']
    });
  }

  enviarEmail() {
  const email = this.form.value.email;
  this.http.post('http://localhost:3001/recuperar-senha', { email }).subscribe({
    next: (res: any) => {
      // Salva o e-mail temporariamente para identificar o usuário na próxima tela
      localStorage.setItem('email_recuperacao', email); 
      this.router.navigate(['/nova-senha']);
    },
    error: (err) => alert('Erro ao processar.')
  });
}

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}