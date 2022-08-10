

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
export interface Car
{
    price: string
    marka: string
    model: string
    probeg: string
    start_arenda: any
    end_arenda: any
    vladelec: string
    category: string
    status: string
    previewSrc?: any
    number: any
    _id?: any
    imagePreview?: any
    sts_seria?: any
    sts_number?: any
    sts_date?: any
    osago_seria?: any
    osago_number?: any
    osago_date_finish?: any
    vin?: any
    color?: any
    year_production?: any
    price_ocenka?: any
    to_date?: any
    to_probeg_prev?: any
    to_probeg_next?: any
    to_interval?: any
    oil_name?: any
    stoa_name?: any
    stoa_phone?: any
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




// Интерфейс для глобального state
export interface AppStateInterface {
  auth: AuthStateInterface;
}




export interface LoginResponse {
  token: string,
  currentUser: User
}


