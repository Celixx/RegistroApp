import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/usuario';
import { NavigationExtras } from '@angular/router';
import { Asistencia } from 'src/app/asistencia';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  public usuario: Usuario;
  public escaneando = false;
  public asistencia: Asistencia = new Asistencia();
  public datosQR: string = '';

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

  public async scanQR() {

    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));

  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
    // ----------------------------------
    // TAREA PARA COMPLETAR POR EL ALUMNO
    // ----------------------------------
    // 1) Ejecutar el setter de la clase Asistencia:
    //     this.asistencia.setAsistencia(...parametros...)
    //    de modo que los parámetros los tome del objeto datosQR,
    //    por ejemplo: datosQR.nombreAsignatura contiene el valor 
    //    del nombre de la asignatura en la cual el alumno
    //    debe quedar presente.
    // 2) Hacer una interpolación entre las propiedades 
    //    de "this.asistencia" y la página HTML, de modo
    //    que la página muestre de manera ordenada estos datos.
  }

  public stopScanQR(): void {

  }

}
