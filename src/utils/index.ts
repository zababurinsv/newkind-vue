import Respose from '@/models/interface/Response'

const error = (msg: string) => {
    alert(msg)
}

export const verify = (item: Respose) :boolean => {
    if(item.title.length < 3) {
        error('Введите название')
        return false
    }
    if(!item.year) {
        error('Введите год')
      return false
    }
    if(item.description.length < 3) {
        error('Введите описание')
        return false
    }
    if(!item.price) {
        error('Введите цену')
        return false
    }
    if(item.color.length < 3) {
        error('Укажите цвет')
        return false
    }
    if(item.status.length < 3) {
        error('Поставьте статус')
        return false
    }

    return true
}