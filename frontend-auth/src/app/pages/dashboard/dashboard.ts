import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  nomeUsuario: string = '';
  filtro: string = '';

  usuarios: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

 ngOnInit() {
    // Busca o dado que salvamos no login
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      this.nomeUsuario = user.nome || 'Usuário'; 
    } 
    this.carregarUsuarios(); // Carrega os usuários ao iniciar o dashboard
  }


  carregarUsuarios() {
  this.api.get('/users').subscribe({
    next: (res: any) => {
      this.usuarios = res;
      console.log('Dados no array:', this.usuarios);
      this.cdr.detectChanges(); // <--- FORÇA O ANGULAR A ATUALIZAR A TELA
    },
    error: (err) => console.error(err)
  });
}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get usuariosFiltrados() {
  return this.usuarios.filter(u => 
    u.nome.toLowerCase().includes(this.filtro.toLowerCase()) || 
    u.email.toLowerCase().includes(this.filtro.toLowerCase())
  );
}
}