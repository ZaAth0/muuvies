import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular';

import { MuuviesService } from '../services/muuvies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent, DecimalPipe],
})
export class Tab1Page implements OnInit {

  peliculas: any[] = [];
  pagina: number = 1;
  busqueda: string = '';
  cargando: boolean = false;
  hayMasPeliculas: boolean = true;

  //url para los posters de las peliculas
  imagenUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private muuviesService: MuuviesService) {}

  ngOnInit() {
    this.cargarPeliculas();
  }

  //cargar el top
  cargarPeliculas(event?: any) {
    if (this.cargando || !this.hayMasPeliculas) {
      if (event) { event.target.complete(); }
      return;
    }

    this.cargando = true;
    this.muuviesService.getTopMovies(this.pagina).subscribe({next: (respuesta) => {
      this.peliculas = [...this.peliculas, ...respuesta.results];
      this.pagina++;
      this.hayMasPeliculas = this.pagina <= respuesta.total_pages;
      this.cargando = false;
      event?.target.complete();
    },error: (error) => { console.error('Error al cargar las películas:', error); this.cargando = false; event?.target.complete(); }});
  }

  //buscar por nombre
  buscarPeliculas(event: any) {
    this.busqueda = event.detail.value?.trim() || '';
    this.pagina = 1;
    this.peliculas = [];
    this.hayMasPeliculas = true;

    if (this.busqueda === '') {
      this.cargarPeliculas();
      return;
    }

    this.muuviesService.buscar(this.busqueda, this.pagina).subscribe({next: (respuesta) => {
      this.peliculas = respuesta.results;
      this.pagina++;
      this.hayMasPeliculas = this.pagina <= respuesta.total_pages;
    },
    error: (error) => console.error('Upsi, hubo un error al buscar las películas', error)});
  }

  //cargar mas peliculas al llegar al final de la lista
  cargarMas(event: any) {
    if(this.busqueda){
      this.muuviesService.buscar(this.busqueda, this.pagina).subscribe({next: (respuesta) => {
        this.peliculas = [...this.peliculas, ...respuesta.results];
        this.pagina++;
        this.hayMasPeliculas = this.pagina <= respuesta.total_pages;
        event.target.complete();
      }, error: () => event.target.complete()});
    }
    else{
      this.cargarPeliculas(event);
    }
  }
}