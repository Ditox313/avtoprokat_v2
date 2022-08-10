import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientsService } from '../../services/clients.service';
import { Client, MaterialDatepicker } from 'src/app/shared/types/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css'],
})
export class ShowClientComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('passport__date') passport__date__info!: ElementRef;
  @ViewChild('prava__date') prava__date__info!: ElementRef;
  // Забираем дом элемент input загрузки файла и ложим его в переменную inputgRef
  @ViewChild('input') inputRef!: ElementRef;
  @ViewChild('input2') inputRef2!: ElementRef;
  @ViewChild('input3') inputRef3!: ElementRef;
  @ViewChild('input4') inputRef4!: ElementRef;

  clientId!: string;
  xsActualClient!: Client;
  form: any;
  // tabs: any;

  // Храним дату выдачи пасспорта
  passport__date__x: MaterialDatepicker | any;

  // Храним дату выдачи прав
  prava__date__x: MaterialDatepicker | any;

  // Храним фалы загруженных документов
  passport__1!: File;
  passport__2!: File;
  prava__1!: File;
  prava__2!: File;

  // Превью загруженных документов
  passport_1_preview: any = '';
  passport_2_preview: any = '';
  prava_1_preview: any = '';
  prava_2_preview: any = '';

  // Храним  даты из ответа для форматирования
  passport__date_responce!: any;
  prava__date_responce!: any;

  constructor(
    private clients: ClientsService,
    private router: Router,
    private rote: ActivatedRoute,
    public datePipe: DatePipe
  ) {}

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
      prava_date: new FormControl(''),
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

    // Достаем параметры
    this.rote.params.subscribe((params) => {
      this.clientId = params['id'];
    });

    this.clients.getById(this.clientId).subscribe((res) => {
      this.xsActualClient = res;

      if (res.passport_1_img) {
        this.passport_1_preview = res.passport_1_img;
      }

      if (res.passport_2_img) {
        this.passport_2_preview = res.passport_2_img;
      }

      if (res.prava_1_img) {
        this.prava_1_preview = res.prava_1_img;
      }

      if (res.prava_2_img) {
        this.prava_2_preview = res.prava_2_img;
      }

      this.form.patchValue({
        name: res.name,
        surname: res.surname,
        lastname: res.lastname,
        passport_seria: res.passport_seria,
        passport_number: res.passport_number,
        passport_date: res.passport_date,
        passport_who_take: res.passport_who_take,
        code_podrazdeleniya: res.code_podrazdeleniya,
        passport_register: res.passport_register,
        passport_address_fact: res.passport_address_fact,
        prava_seria: res.prava_seria,
        prava_number: res.prava_number,
        prava_date: res.prava_date,
        phone_main: res.phone_main,
        phone_1_dop_name: res.phone_1_dop_name,
        phone_1_dop_number: res.phone_1_dop_number,
        phone_2_dop_name: res.phone_2_dop_name,
        phone_2_dop_number: res.phone_2_dop_number,
        phone_3_dop_name: res.phone_3_dop_name,
        phone_3_dop_number: res.phone_3_dop_number,
        phone_4_dop_name: res.phone_4_dop_name,
        phone_4_dop_number: res.phone_4_dop_number,
      });
    });

    MaterialService.updateTextInputs();
  }

  ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement);
    MaterialService.updateTextInputs();

    this.passport__date__x = MaterialService.initDatepicker(
      this.passport__date__info,
      this.validate.bind(this)
    );
    this.prava__date__x = MaterialService.initDatepicker(
      this.prava__date__info,
      this.validate.bind(this)
    );
  }
  // Валидация
  validate() {}

  // Отправка формы
  onSubmit() {
    // this.form.disable();
    const client = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      lastname: this.form.value.lastname,
      passport_seria: this.form.value.passport_seria,
      passport_number: this.form.value.passport_number,
      passport_date:  this.passport__date__x.date === undefined ? this.xsActualClient.passport_date: new Date(this.passport__date__x.date).toLocaleDateString('ru-RU'),
      passport_who_take: this.form.value.passport_who_take,
      code_podrazdeleniya: this.form.value.code_podrazdeleniya,
      passport_register: this.form.value.passport_register,
      passport_address_fact: this.form.value.passport_address_fact,
      prava_seria: this.form.value.prava_seria,
      prava_number: this.form.value.prava_number,
      prava_date: this.prava__date__x.date === undefined ? this.xsActualClient.prava_date: new Date(this.prava__date__x.date).toLocaleDateString('ru-RU'),
      phone_main: this.form.value.phone_main,
      phone_1_dop_name: this.form.value.phone_1_dop_name,
      phone_1_dop_number: this.form.value.phone_1_dop_number,
      phone_2_dop_name: this.form.value.phone_2_dop_name,
      phone_2_dop_number: this.form.value.phone_2_dop_number,
      phone_3_dop_name: this.form.value.phone_3_dop_name,
      phone_3_dop_number: this.form.value.phone_3_dop_number,
      phone_4_dop_name: this.form.value.phone_4_dop_name,
      phone_4_dop_number: this.form.value.phone_4_dop_number,
    };

    this.clients
      .update(
        this.clientId,
        client,
        this.passport__1,
        this.passport__2,
        this.prava__1,
        this.prava__2
      )
      .subscribe((car) => {
        MaterialService.toast('Клиент Изменен');
      });
  }

  // Обрабатываем загрузку картинок
  onFileUpload(event: any) {
    const file = event.target.files['0'];
    this.passport__1 = file;

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();

    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.passport_1_preview = reader.result;
    };

    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }
  onFileUpload2(event: any) {
    const file = event.target.files['0'];
    this.passport__2 = file;

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();

    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.passport_2_preview = reader.result;
    };

    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }
  onFileUpload3(event: any) {
    const file = event.target.files['0'];
    this.prava__1 = file;

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();

    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.prava_1_preview = reader.result;
    };

    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }
  onFileUpload4(event: any) {
    const file = event.target.files['0'];
    this.prava__2 = file;

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();

    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.prava_2_preview = reader.result;
    };

    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }

  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClick() {
    this.inputRef.nativeElement.click();
  }
  triggerClick2() {
    this.inputRef2.nativeElement.click();
  }
  triggerClick3() {
    this.inputRef3.nativeElement.click();
  }
  triggerClick4() {
    this.inputRef4.nativeElement.click();
  }
}
