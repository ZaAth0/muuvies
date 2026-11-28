import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Pelicula {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
}

@Injectable({ providedIn: 'root' })
export class MiListaService {

  //nombre con el que se guarda 
  private clave = 'muuvies-mi-lista';

  private guardadas: Pelicula[] = this.leerGuardadas();

  //para que la lista se actualice sola
  private peliculasSubject = new BehaviorSubject<Pelicula[]>(this.guardadas);

  peliculas$ = this.peliculasSubject.asObservable();

  private leerGuardadas(): Pelicula[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }

  obtenerPeliculas(): Pelicula[] { return this.peliculasSubject.value; }

  estaGuardada(id: number): boolean { return this.peliculasSubject.value.some(p => p.id === id); }

  agregar(pelicula: Pelicula): void {
    if (!this.estaGuardada(pelicula.id)) {
      const nueva = [...this.peliculasSubject.value, pelicula];
      this.actualizarLista(nueva);
    }
  }

  quitar(id: number): void {
    const nueva = this.peliculasSubject.value.filter(p => p.id !== id);
    this.actualizarLista(nueva);
  }

  private actualizarLista(lista: Pelicula[]): void {
    this.peliculasSubject.next(lista);
    localStorage.setItem(this.clave, JSON.stringify(lista));
  }
}