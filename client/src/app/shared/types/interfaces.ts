

// Интерфейсы


// Интерфейс для юзера
export interface User
{
    email: string,
    password?: string
    _id?: string
}





// Интерфейс для материалайза
export interface MaterialInstance
{
    open?(): void
    close?(): void
    destroy?(): void
}




//Интерфейс для сообщения
export interface Message
{
    message: string
}




// Интерфейс для датепикера
export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}




//Интерфейс для автомобиля
export interface Car {
  price: string;
  marka: string;
  model: string;
  probeg: string;
  start_arenda: any;
  end_arenda: any;
  vladelec: string;
  category: string;
  status: string;
  previewSrc?: any;
  number: any;
  _id?: any;
  imagePreview?: any;
  sts_seria?: any;
  sts_number?: any;
  sts_date?: any;
  osago_seria?: any;
  osago_number?: any;
  osago_date_finish?: any;
  vin?: any;
  color?: any;
  year_production?: any;
  price_ocenka?: any;
  to_date?: any;
  to_probeg_prev?: any;
  to_probeg_next?: any;
  to_interval?: any;
  oil_name?: any;
  stoa_name?: any;
  stoa_phone?: any;
  days_1_2?: any;
  days_3_7?: any;
  days_8_14?: any;
  days_15_30?: any;
  days_31_more?: any;
  mezgorod?: any;
  russia?: any;
  price_dop_hour?: any;
  zalog?: any;
}


//Интерфейс для клиента
export interface Client
{
    name: string
    surname: string
    lastname: string
    passport_seria: string
    passport_number: string
    passport_date: string
    passport_who_take: string
    code_podrazdeleniya: string
    passport_register: string
    passport_address_fact: string
    prava_seria: string
    prava_number: string
    prava_date: string
    phone_main: string
    phone_1_dop_name: string
    phone_1_dop_number: string
    phone_2_dop_name: string
    phone_2_dop_number: string
    phone_3_dop_name?: any
    phone_3_dop_number?: any
    phone_4_dop_name?: any
    phone_4_dop_number?: any
    passport_1_img?: any
    passport_2_img?: any
    prava_1_img?: any
    prava_2_img?: any
    _id?: any
}




//Интерфейс для партнера
export interface Partner
{
    name: string
    surname: string
    lastname: string
    passport_seria: string
    passport_number: string
    passport_date: string
    passport_who_take: string
    code_podrazdeleniya: string
    passport_register: string
    phone_main: string
    phone_1_dop_name: string
    phone_1_dop_number: string
    phone_2_dop_name: string
    phone_2_dop_number: string
    passport_1_img?: any
    passport_2_img?: any
    _id?: any
}





// Интерфейс для state auth
export interface AuthStateInterface {
  currentUser: User | null;
  isLoggedIn: boolean | null;
  token: string | null;
}


// Интерфейс для state cars
export interface CarsStateInterface {
  cars: Car[]
}

// Интерфейс для state clients
export interface ClientsStateInterface {
  clients: Client[];
}


// Интерфейс для state partners
export interface PartnersStateInterface {
  partners: Partner[];
}




// Интерфейс для глобального state
export interface AppStateInterface {
  auth: AuthStateInterface;
}



// Ответ с сервера для login
export interface LoginResponse {
  token: string,
  currentUser: User
}



// Запрос для fetch в cars
export interface CarsFetcRequest {
  offset: any;
  limit: any;
}



// Интерфейс для брони
export interface Booking {
  car: any;
  client: any;
  place_start: any;
  place_end: any;
  tariff: any;
  comment?: any;
  booking_start: any;
  booking_end: any;
  _id?: any;
  car_meta?: any;
  client_meta?: any;
  date?: any;
  booking_days?: any;
  summa?: any
  summaFull?: any
  order?: any
  status?: any
  dop_hours?: any
}



// Интерфейс для суммы брони
export interface Summa {
  car: any;
  tariff: any;
  booking_start: any;
  booking_end: any;
  summa: any;
  booking_days: any;
  summaFull: any,
  dop_hours: any
}







