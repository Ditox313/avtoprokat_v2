

// Интерфейсы


// Интерфейс для юзера
export interface User
{
    email: string,
    password: string
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
