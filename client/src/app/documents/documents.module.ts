import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LoaderModule } from '../shared/loader/loader.module';
import { SiteLayoutComponent } from '../shared/layouts/components/site-layout/site-layout.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { BookingDogovorComponent } from './components/booking-dogovor/booking-dogovor.component';
import { BookingActComponent } from './components/booking-act/booking-act.component';
import { AddClientDogovorComponent } from './components/add-client-dogovor/add-client-dogovor.component';
import { DocumentsService } from './services/documents.service';
import { DogovorListComponent } from './components/dogovor-list/dogovor-list.component';
import { ShowClientDogovorComponent } from './components/show-client-dogovor/show-client-dogovor.component';
import { AddClientLawfaseDogovorComponent } from './components/add-client-lawfase-dogovor/add-client-lawfase-dogovor.component';


const routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
    children: [
      { path: 'booking-dogovor/:id', component: BookingDogovorComponent },
      { path: 'add-client-dogovor/:id', component: AddClientDogovorComponent },
      { path: 'add-client-lawfase-dogovor/:id', component: AddClientLawfaseDogovorComponent },
      { path: 'booking-act/:id', component: BookingActComponent },
      { path: 'show-client-dogovor/:id', component: ShowClientDogovorComponent },
      { path: 'dogovors-client/:id', component: DogovorListComponent },
    ],
  },
];



@NgModule({
  declarations: [
    BookingDogovorComponent,
    BookingActComponent,
    AddClientDogovorComponent,
    DogovorListComponent,
    ShowClientDogovorComponent,
    AddClientLawfaseDogovorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(routes),
    LoaderModule,
    LayoutsModule,
  ],
  exports: [
    DogovorListComponent
  ],
  providers: [DocumentsService],
})
export class DocumentsModule { }
