import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dogovor } from 'src/app/shared/types/interfaces';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-dogovor-list',
  templateUrl: './dogovor-list.component.html',
  styleUrls: ['./dogovor-list.component.css']
})
export class DogovorListComponent implements OnInit {
  @Input() clientId: string | undefined;
  xs_dogovors: Dogovor[];


  constructor(
    private router: Router,
    private documentsServices: DocumentsService,
  ) { }

  ngOnInit(): void {
    this.documentsServices.getDogovorsById(this.clientId).subscribe((res) => {
      this.xs_dogovors = res;
      
      
    });
    
  }

}
