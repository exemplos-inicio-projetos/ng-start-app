import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { FeatureRootComponent } from './feature-root.component';
import { FeatureComponent } from './pages';

const defaultRoutes: Routes = [
  { path: '', component: FeatureRootComponent, canActivate: [AuthGuard], children: [
    { path: '', component: FeatureComponent, canActivate: [AuthGuard] },
    // { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    // { path: ':id', component: RecipeDetailComponent },
    // { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
  ]},
  // Módulos aninhados devem ser colocados fora para funcionar!
  // { path: 'nested', loadChildren: './modules/feature-nested/feature-nested.module#FeatureNestedModule'},
];


@NgModule({
  imports: [
    RouterModule.forChild(defaultRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class FeatureRoutingModule {

}
