import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { MaterialDatepicker } from 'src/app/shared/interfaces';
import { PartnersService } from 'src/app/shared/services/partners.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('passport__date') passport__date__info!: ElementRef;
  @ViewChild('prava__date') prava__date__info!: ElementRef;
  
  form: any;
  // tabs: any;

   // Храним дату выдачи пасспорта
  passport__date__x: MaterialDatepicker | any;

  // Храним дату выдачи прав
  prava__date__x: MaterialDatepicker | any;

  constructor(private partners: PartnersService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]), 
      surname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      passport_seria: new FormControl('', [Validators.required]),
      passport_number: new FormControl('', [Validators.required]),
      passport_date: new FormControl(''),
      passport_who_take: new FormControl('', [Validators.required]),
      code_podrazdeleniya: new FormControl('', [Validators.required]),
      passport_register: new FormControl('', [Validators.required]),
      passport_address_fact: new FormControl('', [Validators.required]),
      prava_seria: new FormControl('', [Validators.required]),
      prava_number: new FormControl('', [Validators.required]),
      prava_date: new FormControl('',),
      phone_main: new FormControl('', [Validators.required]),
      phone_1_dop_name: new FormControl('', [Validators.required]),
      phone_1_dop_number: new FormControl('', [Validators.required]),
      phone_2_dop_name: new FormControl('', [Validators.required]),
      phone_2_dop_number: new FormControl('', [Validators.required]),
      phone_3_dop_name: new FormControl('', []),
      phone_3_dop_number: new FormControl('', []),
      phone_4_dop_name: new FormControl('', []),
      phone_4_dop_number: new FormControl('', []),
    });

    MaterialService.updateTextInputs();

  }

  ngAfterViewInit(): void {
      MaterialService.initTabs(this.tabs.nativeElement)
      MaterialService.updateTextInputs();

      this.passport__date__x = MaterialService.initDatepicker(this.passport__date__info, this.validate.bind(this));
      this.prava__date__x = MaterialService.initDatepicker(this.prava__date__info, this.validate.bind(this));
  }
// Валидация
  validate() {}

  // Отправка формы
  onSubmit(){
    // this.form.disable();


    // Создаем авто
    const partner = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      lastname: this.form.value.lastname,
      passport_seria: this.form.value.passport_seria,
      passport_number: this.form.value.passport_number,
      passport_date: this.passport__date__x.date,
      passport_who_take: this.form.value.passport_who_take,
      code_podrazdeleniya: this.form.value.code_podrazdeleniya,
      passport_register: this.form.value.passport_register,
      passport_address_fact: this.form.value.passport_address_fact,
      prava_seria: this.form.value.prava_seria,
      prava_number: this.form.value.prava_number,
      prava_date: this.prava__date__x.date,
      phone_main: this.form.value.phone_main,
      phone_1_dop_name: this.form.value.phone_1_dop_name,
      phone_1_dop_number: this.form.value.phone_1_dop_number,
      phone_2_dop_name: this.form.value.phone_2_dop_name,
      phone_2_dop_number: this.form.value.phone_2_dop_number,
      phone_3_dop_name: this.form.value.phone_3_dop_name,
      phone_3_dop_number: this.form.value.phone_3_dop_number,
      phone_4_dop_name: this.form.value.phone_4_dop_name,
      phone_4_dop_number: this.form.value.phone_4_dop_number,
    }

    
    
   this.partners.create(partner).subscribe((partner) =>{
        MaterialService.toast('Автомобиль добавлен')
        this.router.navigate(['/partners-page'])
    });    
  }


}