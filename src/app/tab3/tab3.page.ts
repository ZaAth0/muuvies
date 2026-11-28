import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardContent, IonButton} from '@ionic/angular';

import { MiListaService } from '../services/miLista.services';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardContent, IonButton, DecimalPipe]
})
export class Tab3Page {

  peliculasGuardadas: any[] = [];

  constructor(private miListaService: MiListaService) {}

   //cada vez que entro a la pestaña se refresca la lista
  ionViewWillEnter() {
    this.peliculasGuardadas = this.miListaService.obtenerPeliculas();
  }

  //saco una pelicula
  eliminarPelicula(id: number) {
    this.miListaService.quitar(id);
    this.peliculasGuardadas = this.miListaService.obtenerPeliculas();
  }

}
