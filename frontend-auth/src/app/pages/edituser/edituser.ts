import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edituser.html',
  styleUrls: ['./edituser.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {this.form = this.fb.group({
    nome: [''],
    email: ['']
  });}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.api.getUserById(this.userId).subscribe(user => {
      this.form.patchValue(user); // Preenche o formulário com os dados do servidor
    });
  }

  salvar() {
    this.api.updateUser(this.userId, this.form.value).subscribe(() => {
      alert('Usuário atualizado!');
      this.router.navigate(['/dashboard']);
    });
  }

  deletar() {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.api.deleteUser(this.userId).subscribe(() => {
        alert('Usuário removido!');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}