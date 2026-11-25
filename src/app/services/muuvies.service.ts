import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Genero { id: number; name: string; }
interface ResGeneros { genres: Genero[]; }

@Injectable({
    providedIn: 'root'
})
export class MuuviesService {

    //se define la url de la api
    private apiUrl = 'https://api.themoviedb.org/3';
    private apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGZiNzY1NDI0ODM2NGI2ZmE1MWE4NTg5MDA0MzIyMCIsIm5iZiI6MTc0NzQ5NzE2OC4wNzcsInN1YiI6IjY4MjhiMGQwMTdmNGI5Y2ZjOGRiMjI5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LmCRP_7QXbNiRn0ZTdI-fVp_WnXq_AQWPuI9v_1Odfw';

    constructor(private http: HttpClient) {}

    //paginacion de top de peliculas
    getTopMovies(pagina: number = 1): Observable<any> {
        const cabeceras = new HttpHeaders().set('Authorization', `Bearer ${this.apiToken}`);

        return this.http.get(`${this.apiUrl}/movie/popular?language=es-ES&page=${pagina}`, { headers: cabeceras });
    }

    //buscar por nombre
    buscar(nombre: string, pagina: number = 1): Observable<any> {
        const cabeceras = new HttpHeaders({ Authorization: `Bearer ${this.apiToken}` });

        return this.http.get(`${this.apiUrl}/search/movie?query=${encodeURIComponent(nombre)}&language=es-ES&page=${pagina}`, { headers: cabeceras });
    }

    //listado de generos
    getGeneros(): Observable<ResGeneros> {
        const cabeceras = new HttpHeaders().set('Authorization', `Bearer ${this.apiToken}`);

        return this.http.get<ResGeneros>(`${this.apiUrl}/genre/movie/list?language=es-ES`, { headers: cabeceras });
    }
}