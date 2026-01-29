import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../shared/entry.models';
import { EntryService } from '../shared/entry.service';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

interface Categoria {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  categorias: Categoria[] = []; // lista de categorias

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadCategorias();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') this.createEntry();
    else this.updateEntry();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      data: [new Date(), [Validators.required]],
      pago: [false, [Validators.required]],
      categoriaId: [null, [Validators.required]]
    });
  }

  private loadCategorias() {
  this.categorias = [
    { id: 1, nome: 'Alimentação' },
    { id: 2, nome: 'Transporte' },
    { id: 3, nome: 'Saúde' }
  ];
}


  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      ).subscribe(
        entry => this.entryForm.patchValue(entry),
        error => toastr.error('Ocorreu um erro no servidor')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') this.pageTitle = 'Cadastro de novo lançamento';
    else {
      const entryName = this.entryForm.get('nome')?.value || '';
      this.pageTitle = `Editando lançamento: ${entryName}`;
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry).subscribe(
      e => this.actionForSuccess(e),
      err => this.actionsForError(err)
    );
  }

  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry).subscribe(
      e => this.actionForSuccess(e),
      err => this.actionsForError(err)
    );
  }

  private actionForSuccess(entry: Entry) {
    toastr.success('Solicitação processada com sucesso');
    this.router.navigateByUrl('entries', { skipLocationChange: true }).then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    );
  }

  private actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao processar sua solicitação');
    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde!'];
  }
}
