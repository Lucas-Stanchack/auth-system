import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

enableProdMode();
let inactivityTimer: any;
const TIMEOUT_LIMIT = 10 * 60 * 1000; // 10 min

function resetTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = '/login';
    alert('Sessão encerrada por inatividade.');
  }, TIMEOUT_LIMIT);
}

window.addEventListener('mousemove', resetTimer);
window.addEventListener('keypress', resetTimer);
window.addEventListener('click', resetTimer);
resetTimer();

bootstrapApplication(AppComponent, appConfig);