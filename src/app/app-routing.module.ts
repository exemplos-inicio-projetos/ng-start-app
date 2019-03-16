import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, UrlSegment } from '@angular/router';

import { CoreComponent } from 'core/core.component';


/**
 * Função para entrar na rota que começe com 'feature'
 * @param url Url Digitada
 */
export function matcher (url: UrlSegment[]) {
  console.log(url);
  return url.length >= 1 && url[0].path.startsWith('feature') ? ({consumed: url}) : null;
}

const appRoutes: Routes = [
  { matcher, loadChildren: './modules/feature/feature.module#FeatureModule'},
  { path: 'feature', loadChildren: './modules/feature/feature.module#FeatureModule'},
  { path: '', component: CoreComponent, pathMatch: 'full' },
  { path: '**', component: CoreComponent, pathMatch: 'full' },
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
