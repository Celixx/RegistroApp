import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr/qr.component';
import { MiClaseComponent } from './mi-clase/mi-clase.component';
import { ForoComponent } from './foro/foro.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    QrComponent,
    MiClaseComponent,
    MiClaseComponent,
    ForoComponent
  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    QrComponent,
    MiClaseComponent,
    MiClaseComponent,
    ForoComponent
  ]
})
export class ComponentsModule { }
