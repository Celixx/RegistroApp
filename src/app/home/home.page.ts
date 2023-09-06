import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute
  , private router: Router
  , private alertController: AlertController
  , private animationController: AnimationController) {

    this.usuario = new Usuario('', '', '', '', '', '', 0, null);

    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      // Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      // intentó entrar directamente a la página home sin pasar por el login,
      // de modo que el sistema debe enviarlo al login para que inicie sesión.
      this.router.navigate(['/login']);

    });

  }

  public ngOnInit(): void {

  }

}
