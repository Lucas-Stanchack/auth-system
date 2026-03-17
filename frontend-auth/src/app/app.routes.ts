import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { CreateUserComponent } from './pages/create-user/create-user';
import { EditUserComponent } from './pages/edituser/edituser';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha';
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'edituser/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'nova-senha', component: NovaSenhaComponent },
  { path: '**', redirectTo: 'login' }
];