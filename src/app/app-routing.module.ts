import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, UrlSegment } from '@angular/router';

import { HomeComponent } from 'core/pages';


/**
 * Função para entrar na rota que começe com 'feature'
 * @param url Url Digitada
 */
export function matcher (url: UrlSegment[]) {
  console.log(url);
  return url.length >= 1 && url[0].path.startsWith('feature') ? ({consumed: url}) : null;
}

const appRoutes: Routes = [
  { path: 'feature', loadChildren: './modules/feature/feature.module#FeatureModule'},
  { matcher: matcher, loadChildren: './modules/feature/feature.module#FeatureModule'},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    /** preloadingStrategy: Carrega primeiro os módulos necessários para iniciar
     o app e depois carrega os que podem ser acessados pelo usuário
     */
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],

})
export class AppRoutingModule {

}
