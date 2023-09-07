import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.page.html',
  styleUrls: ['./mi-clase.page.scss'],
})
export class MiClasePage implements OnInit {

  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
  }

  ngOnInit() {
  }

  public homeRedirect(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };

    this.router.navigate(['/home'],navigationExtras)
  }

  public miClaseRedirect(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };

    this.router.navigate(['/mi-clase'],navigationExtras)
  }

}
