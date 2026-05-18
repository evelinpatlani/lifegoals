import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  metas: Meta[] = [];
  newMeta: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private metaService: MetaServiceService) {}

  ngOnInit(): void {
    this.metaService.getMetas().subscribe({
      next: (data) => {
        this.metas = data;
      },
      error: (err) => {
        this.error = 'Error al cargar las metas.';
        console.error(err);
      }
    });
  }

  addMeta(): void {
    if (!this.newMeta.trim()) return;

    const meta: Meta = { meta: this.newMeta.trim() };
    this.loading = true;

    this.metaService.addMeta(meta)
      .then(() => {
        this.newMeta = '';
        this.loading = false;
      })
      .catch((err) => {
        this.error = 'Error al agregar la meta.';
        this.loading = false;
        console.error(err);
      });
  }

  deleteMeta(id: string | undefined): void {
    if (!id) return;

    this.metaService.deleteMeta(id)
      .catch((err) => {
        this.error = 'Error al eliminar la meta.';
        console.error(err);
      });
  }
}
