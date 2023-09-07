import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  
  public correo: string;

  constructor() {
    this.correo = ""
   }

  ngOnInit() {
  }
  
  public Recuperar (): void{
    console.log(this.correo);

  }

}
