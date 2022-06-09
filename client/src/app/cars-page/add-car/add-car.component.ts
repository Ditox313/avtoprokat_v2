import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialDatepicker } from 'src/app/shared/interfaces';
import { MaterialService } from '../../shared/classes/material.service';
import { CarsService } from '../../shared/services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit,AfterViewInit,OnDestroy  {

  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('start_arenda') start_arenda_avto!: ElementRef;
  @ViewChild('end_arenda') end_arenda_avto!: ElementRef;


  //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription; 

  // Валидность
  isValid: any = true;

  //Инициализируем нашу форму
  form!: FormGroup; 


   // Храним дату начала
  start: MaterialDatepicker | any;

  // Храним дату конца
  end: MaterialDatepicker | any;

  // Задаем переменную для хранения картинки после пото как загрузили с устройтста
  image!: File


  // Превью изображения авто
  imagePreview : any = '';


  // Забираем дом элемент input загрузки файла и ложим его в переменную inputgRef
  @ViewChild('input') inputRef!: ElementRef;

  constructor(private cars: CarsService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      marka: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      probeg: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      start_arenda: new FormControl(null),
      end_arenda: new FormControl(null),
      vladelec: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.start.destroy()
  }

  

  ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement)
    this.start = MaterialService.initDatepicker(this.start_arenda_avto, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.end_arenda_avto, this.validate.bind(this));
    MaterialService.updateTextInputs();
  }



  // Валидация
  validate() {
    if(!this.start.date || !this.end.date)
    {  
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }



  // Обрабатываем загрузку картинок
  onFileUpload(event: any)
  {
    const file = event.target.files['0'];
    this.image = file;

    

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();


    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {

      // Переменная для хранения информации об изображении
      this.imagePreview = reader.result;
    };


    // Читаем нужный нам файл
      reader.readAsDataURL(file);
  }



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClick()
  {
    this.inputRef.nativeElement.click();
  }



  // Отправка формы
  onSubmit(){
    // this.form.disable();


    // Создаем авто
    const car = {
      marka: this.form.value.marka,
      model:  this.form.value.model,
      number:  this.form.value.number,
      probeg:  this.form.value.probeg,
      price:  this.form.value.price,
      start_arenda:  this.start.date,
      end_arenda:  this.end.date,
      vladelec:  this.form.value.vladelec,
      category:  this.form.value.category,
      status:  this.form.value.status,
    }
    
   this.Sub = this.cars.create(car, this.image).subscribe((car) =>{
        MaterialService.toast('Автомобиль добавлен')
        this.router.navigate(['/cars-page'])
    });    
  }

  

}
