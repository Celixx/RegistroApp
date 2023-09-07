import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/usuario';
import { NavigationExtras } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: Usuario;
  public escaneando = false;

  constructor(private activeroute: ActivatedRoute
  , private router: Router
  , private alertController: AlertController
  , private animationController: AnimationController) {

    this.usuario = new Usuario('', '', '', '', '', '', 0, null);

    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/login']);

    });

  }

  public ngOnInit(): void {

  }

  public miClaseRedirect(): void {

  }

  public homeRedirect(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };

    this.router.navigate(['/mi-clase'],navigationExtras)
  }

  public scanQR(): void {

  }

  public stopScanQR(): void {

  }

}
