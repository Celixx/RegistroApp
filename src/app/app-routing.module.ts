import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mi-clase',
    loadChildren: () => import('./mi-clase/mi-clase.module').then( m => m.MiClasePageModule)
  },

  {
    path: 'correo',
    loadChildren: () => import('./correo/correo.module').then( m => m.CorreoPageModule)
  },
  {
    path: 'correcto',
    loadChildren: () => import('./correcto/correcto.module').then( m => m.CorrectoPageModule)
  },
  {
    path: 'incorrecto',
    loadChildren: () => import('./incorrecto/incorrecto.module').then( m => m.IncorrectoPageModule)
  },

  {
    path: 'pregunta',
    loadChildren: () => import('./pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
