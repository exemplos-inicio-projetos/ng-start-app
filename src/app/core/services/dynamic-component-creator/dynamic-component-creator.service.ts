import {
  Injectable, ViewContainerRef, ComponentFactoryResolver, Type
} from '@angular/core';

@Injectable()
export class DynamicComponentCreatorService {

  /**
   * É onde contém a fábrica de componentes é usado para criar e destruir os mesmos dinâmicamente
   * é necessário receber ele da pagina raiz do módulo a ser utilizado
   */
  protected viewContainerRef: ViewContainerRef;
  /** Array que contém as referências dos componentes */
  protected componentsReferences: Array<any> = [];

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  /**
   * Limpa a pilha do container
   */
  private clearStack() {
    this.viewContainerRef.clear();
    this.componentsReferences = [];
  }

  /**
   * Recupera a instância de um objeto na pilha.
   * @param index Número do objeto na pilha
   */
  private getComponentInstance<T>(index: number): T {
    return this.componentsReferences[index].instance;
  }

  /**
   * Recupera a lista de componentes
   */
  private getComponentList(): Array<any> {
    return this.componentsReferences;
  }

  /**
   * Recebe o viewContainerRef da pagina root do modulo para criar componentes dinâmicamente
   * @param viewContainerRef viewContainerRef do componente
   */
  defineRootContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  /**
   * Da um pop na lista de componentes criados se não for passado o indice ele vai dar pop no ultimo componente
   * @param index indice do componente
   */
  destroy(index?: number) {
    if (this.viewContainerRef.length < 1) { return; }

    // Se for passado um indice então
    if (index >= 0) {
      // Filtra o componente baseado no indice dele no array que contém as referencias dos mesmos
      const componentRef = this.componentsReferences.filter((element, indexFilter) => indexFilter === index)[0];
      componentRef.instance.callbackFn();
      // Salvando o indice do componente para remover na função do VCR
      const viewContainerRefIndex: number = this.viewContainerRef.indexOf(componentRef);
      // Remove o componente do DOM
      this.viewContainerRef.remove(viewContainerRefIndex);
      // Remove o componente da pilha de referencias
      this.componentsReferences = this.componentsReferences.filter((element, indexFilter) => indexFilter !== index);
    } else {
      const componentRef = this.componentsReferences[this.componentsReferences.length - 1];

      componentRef.instance.callbackFn();
      this.viewContainerRef.remove();
      this.componentsReferences.pop();
    }
  }

  /**
   * Cria um componente dinamico e retorna sua referência para executar métodos ou acessar propriedades do mesmo
   * @param component Componente que será criado
   * @param params parametros que serão passados ex: {title: 'titulo'}
   * @param callbackFn função para ser executada antes de destruir o componente
   * @returns retorna a instancia do componente criado
   */
  create<T = any>(component: Type<T>, params = {}, callbackFn?: Function): T {

    /** Define a fabrica do componente */
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
    /** Cria o componente e retorna sua referência */
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    /** Instancia do componente criado */
    const currentComponent = componentRef.instance as any;

    /** Recebendo as propriedades do objeto */
    const paramsArray = Reflect.ownKeys(params);

    // Definindo a propriedade da function de callback
    Reflect.defineProperty(currentComponent, 'callbackFn', { writable: true });
    // Caso não seja passada nenhuma function atriubui uma function vazia
    if (!callbackFn) { callbackFn = () => { }; }
    // Definindo a função de callback
    Reflect.set(currentComponent, 'callbackFn', callbackFn);
    // Verificando se existe algum parametro
    if (paramsArray.length) {
      // Percorrendo os parametros
      for (const param of paramsArray) {
        // Definindo a propriedade que ficará disponível para uso a partir do método ngOnInit
        Reflect.defineProperty(currentComponent, param, { writable: true });
        Reflect.set(currentComponent, param, params[param]);
      }
    }
    this.componentsReferences.push(componentRef);
    return currentComponent;
  }

  /**
   * Retorna o tamanho do indice do componente
   */
  private getComponentLength(): number {
    return this.componentsReferences.length;
  }

}
