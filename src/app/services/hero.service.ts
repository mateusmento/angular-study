import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/hero-list';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  )
  {
  }

  getHeroes(): Observable<Hero[]>
  {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log("fetched heroes")),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero>
  {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(() => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError('getHeroes', null))
      );
  }

  updateHero(hero: Hero): Observable<any>
  {
    let headers = this.headers;
    return this.http.put(this.heroesUrl, hero, {headers})
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError('updateHero', null))
      );
  }

  addHero(hero: Hero): Observable<Hero>
  {
    let headers = this.headers;
    return this.http.post(this.heroesUrl, hero, {headers})
      .pipe(
        tap(() => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError('addHero', null))
      );
  }

  deleteHero(hero: Hero | number): Observable<any>
  {
    let id = typeof hero === 'number' ? hero : hero.id;
    let headers = this.headers;
    return this.http.delete(`${this.heroesUrl}/${id}`, {headers})
      .pipe(
        tap(() => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError('deleteHero', null))
      );
  }

  searchHero(term: string): Observable<Hero[]>
  {
    if (!term.trim()) return of([]);
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap(() => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError('searchHero', []))
      );
  }

  private log(message: string): void
  {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
