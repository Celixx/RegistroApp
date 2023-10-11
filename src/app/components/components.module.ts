import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr/qr.component';
import { MiClaseComponent } from './mi-clase/mi-clase.component';
import { ForoComponent } from './foro/foro.component';
import { IonicModule } from '@ionic/angular';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QrComponent,
    MiClaseComponent,
    MiClaseComponent,
    ForoComponent,
    MisDatosComponent
  ],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [
    QrComponent,
    MiClaseComponent,
    MiClaseComponent,
    ForoComponent,
    MisDatosComponent
  ]
})
export class ComponentsModule { }
