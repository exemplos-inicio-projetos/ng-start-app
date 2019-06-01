import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureRootComponent } from './feature-root.component';
import { featurePages } from './pages';
import { featureComponents } from './components';
import { featureDirectives } from './directives';
import { featurePipes } from './pipes';
import { featureServices } from './services';

/**
 * Este módulo é apenas para servir como base para criação de outro
 */
@NgModule({
    declarations: [
        ... featureComponents,
        ... featureDirectives,
        ... featurePages,
        ... featurePipes,
        FeatureRootComponent
    ],
    imports: [
        FeatureRoutingModule,
        SharedModule
    ],
    entryComponents: [
        /**
         * Entry components não funcionam em módulos lazy loaded adicionar no entry components
         * do shared ou do core module
         * https://github.com/angular/angular/issues/14324#issuecomment-433389833
         */
    ],
    providers: [
        ... featureServices
    ]
})
export class FeatureModule { }
