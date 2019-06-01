import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedHttpService } from 'src/app/shared/services';
import { DynamicComponentCreatorService } from 'core/services';
import { DynamicComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-feature-root',
  templateUrl: './feature-root.component.html',
  styleUrls: ['./feature-root.component.scss']
})
export class FeatureRootComponent implements OnInit {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sharedHttp: SharedHttpService,
    private _viewContainerRef: ViewContainerRef,
    private _dynamicComponentCreator: DynamicComponentCreatorService
  ) {

  }

  ngOnInit() {
    this._dynamicComponentCreator.defineRootContainerRef(this._viewContainerRef);
    console.log('Route Snapshot: ', this._activatedRoute.snapshot);
    console.log('QueryParams: ', this._activatedRoute.snapshot.queryParams);
    console.log('Params :', this._activatedRoute.snapshot.params);
    this._sharedHttp.postTest();
    const omg = () => {
      console.log('omg');
    }
    const component: DynamicComponent = this._dynamicComponentCreator.create(DynamicComponent, { title: 'testes' }, omg);
    // Destroi o componente 2 segundos após a sua criação
    setTimeout(() => {
      console.log('Componente destruído');
      component.pop();
    }, 2000);
  }

  navToHome() {
    this._router.navigate(['']);
  }

}
