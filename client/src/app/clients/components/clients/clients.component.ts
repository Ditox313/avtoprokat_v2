import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Client } from 'src/app/shared/types/interfaces';
import { ClientsService } from '../../services/clients.service';

// Шаг пагинации
  const STEP = 15

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription; 
  xsclients: Client[] = []
  offset: any = 0
  limit: any = STEP
  loading = false;
  noMoreCars: Boolean = false
  constructor(private clients: ClientsService, private router: Router, private rote: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetch()    
  }




  // Получаем все кейсы
  public fetch()
  {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit
    }

    this.loading = true
    this.Sub = this.clients.fetch(params).subscribe((clients) =>{

    if(clients.length < STEP)
    {
      this.noMoreCars = true
    }
      
    this.loading = false
    this.xsclients = this.xsclients.concat(clients)

    
    });    
  }



  loadmore()
  {
    this.loading = true
    this.offset += STEP
    this.fetch()
    this.loading = false
  }




  
  onDeleteCar(event: Event, xsclient: Client): void
  {
    event.stopPropagation();


    const dicision = window.confirm(`Удалить клиента?`);

    if (dicision) {
      this.clients.delete(xsclient._id).subscribe(res => {
        const idxPos = this.xsclients.findIndex((p) => p._id === xsclient._id);
        this.xsclients.splice(idxPos, 1);
        MaterialService.toast(res.message)
        
      }, error => {
        MaterialService.toast(error.error.message);
      })
    }
  }

}
