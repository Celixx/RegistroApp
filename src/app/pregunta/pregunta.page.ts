import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/usuario';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuesta: string;

  constructor(private activeroute: ActivatedRoute
    , private router: Router) { 

      this.usuario = new Usuario('', '', '', '', '', '', 0, null);
      this.respuesta = ""
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

  ngOnInit() {
  }


  public respuestaRecuperada(): void{
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


  public respuestaPregunta(): void{
    if(this.respuesta === this.usuario.respuestaSecreta){
      
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
        
      };

      this.router.navigate(['/correcto'],navigationExtras);
    }else{
      
    }
      
  } 
}
