import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public ingresar(): void {}

}
