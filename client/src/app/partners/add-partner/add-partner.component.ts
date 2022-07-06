import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit, AfterViewInit {
  form: any;
  tabs: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]), 
    });

    MaterialService.updateTextInputs();

}

ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement)
    MaterialService.updateTextInputs();
  }


}