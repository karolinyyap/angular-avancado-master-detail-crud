import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Entry } from './entry.models';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

private entries: Entry[] = [
  {
    id: 1,
    nome: 'Cinema',
    descricao: 'Ingresso',
    tipo: 'despesa',
    valor: '50',
    data: '2026-10-28',
    pago: true,
    categoriaId: 3
  } as Entry,
  {
    id: 2,
    nome: 'Salário',
    descricao: 'Mensal',
    tipo: 'receita',
    valor: '2500',
    data: '2026-10-28',
    pago: true,
    categoriaId: 4
  } as Entry
];


  getAll(): Observable<Entry[]> {
    return of(this.entries);
  }

  getById(id: number): Observable<Entry> {
    return of(this.entries.find(e => e.id === id));
  }

  create(entry: Entry): Observable<Entry> {
    const maxId = this.entries.length
      ? Math.max(...this.entries.map(e => e.id))
      : 0;

    entry.id = maxId + 1;
    this.entries.push(entry);

    return of(entry);
  }

  update(entry: Entry): Observable<Entry> {
    const index = this.entries.findIndex(e => e.id === entry.id);
    this.entries[index] = entry;
    return of(entry);
  }

  delete(id: number): Observable<any> {
    this.entries = this.entries.filter(e => e.id !== id);
    return of(null);
  }
}

