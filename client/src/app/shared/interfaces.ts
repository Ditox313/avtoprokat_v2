

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
    marka: string
    model: string
    probeg: string
    start_arenda: Date
    end_arenda: Date
    vladelec: string
    category: string
    status: string
}
