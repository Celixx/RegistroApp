import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { QrComponent } from '../components/qr/qr.component';
import { MiClaseComponent } from '../components/mi-clase/mi-clase.component';
import { MisDatosComponent } from '../components/mis-datos/mis-datos.component';
import { ForoComponent } from '../components/foro/foro.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'qr',
        component: QrComponent
      },
      {
        path: 'mi-clase',
        component: MiClaseComponent
      },
      {
        path: 'mis-datos',
        component: MisDatosComponent
      },
      {
        path: 'foro',
        component: ForoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
