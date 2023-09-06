import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;

  constructor(private activeroute: ActivatedRoute
    , private router: Router) { 

      this.usuario = new Usuario('', '', '', '', '', '', 0, null);

      this.activeroute.queryParams.subscribe(params => { 

        const nav = this.router.getCurrentNavigation();
        if (nav) {
          if (nav.extras.state) {
            this.usuario = nav.extras.state['usuario'];
            return;
          }
        }
        // this.router.navigate(['/login']); 
      });
      
    }

  ngOnInit() {
  }

}
