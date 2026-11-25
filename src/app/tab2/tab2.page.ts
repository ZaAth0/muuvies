
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonSpinner} from '@ionic/angular';
import { MuuviesService, Genero } from '../services/muuvies.service';

@Component({ selector: 'app-tab2', templateUrl: 'tab2.page.html', styleUrls: ['tab2.page.scss'],
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonSpinner],
})
export class Tab2Page implements OnInit {
  generos: Genero[] = [];
  cargando: boolean = false;
  errorCarga: boolean = false;

  constructor( private muuviesService: MuuviesService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarGeneros();
  }

  //cargar generos desde la api
  cargarGeneros() {
    this.cargando = true;
    this.errorCarga = false;

    this.muuviesService.getGeneros().subscribe({

      next: (respuesta) => {
        console.log('Respuesta de géneros:', respuesta);

        this.generos = respuesta.genres || [];

        console.log('Generos recibidos:', this.generos.length);
        console.log('Lista de generos:', this.generos);

        this.cargando = false;

        //actualiza la vista dp de recibir la respuesta
        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Error al cargar los géneros:', error);

        this.cargando = false;
        this.errorCarga = true;
        this.changeDetector.detectChanges();
      }

    });
  }
}
