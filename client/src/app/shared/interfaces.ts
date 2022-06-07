

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


