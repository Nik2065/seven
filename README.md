ProjectSeven

Функционал корзины:
содержимое корзины храним в глобальном state приложения
при этом в апи ничего не передается

общение с апи начинается тогда, когда идет оформление заказа
оформление заказа будет состоять из шагов:
Содержимое корзины -> запиваем контактные данные -> способы оплаты -> финиш
- в базу по апи уходит заказ
- админу уходит письмо о новом заказе
- пользователю уходит письмо о новом заказе


Апи отдает список продуктов по категориям
(для текущей версии будет использоваться moq)



