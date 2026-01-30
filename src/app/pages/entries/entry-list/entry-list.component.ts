import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.models';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  categorias = [
    { id: 1, nome: 'Alimentação' },
    { id: 2, nome: 'Transporte' },
    { id: 3, nome: 'Lazer' },
    { id: 4, nome: 'Estudos' }
  ];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.carregarEntradas();
  }

  carregarEntradas() {
  this.entryService.getAll().subscribe(
    entries => {
      this.entries = entries.map(entry => {
        const e = Object.assign(new Entry(), entry);
        e.categoria = this.getCategoria(e.categoriaId);
        return e;
      });
    },
    () => alert('Erro ao carregar a lista')
  );
}


  getCategoria(categoriaId: number) {
    return this.categorias.find(c => c.id === categoriaId);
  }

  excluir(entry: Entry) {
    if (confirm('Deseja realmente excluir?')) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(e => e.id !== entry.id),
        () => alert('Erro ao excluir')
      );
    }
  }

  trackById(index: number, entry: Entry) {
    return entry.id;
  }
}
