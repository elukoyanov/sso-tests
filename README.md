## Тест кейсы для SSO

### Задание
1.   В цепочку авторизации по ссылке https://login.mts.ru/amserver/UI/Login?service=login была добавлена капча.
2.   Согласно требованиям, она должна появляться для пользователей, которые три раза подряд ввели неверный пароль.
3.   Необходимо для этого функционала:
    a.   Расписать тест-кейсы;
    b.   Определить 1-2, которые, по Вашему мнению, имеет смысл добавить в регрессионное тестирование;
    c.   Автоматизировать эти тест-кейсы.

### Тест кейсы
Предусловия для всех тест-кейсов:
- Пользователь открыл в браузере страницу `https://login.mts.ru/amserver/UI/Login?service=login`

Кейсы:

A. Капча появляется после 3-х вводов неправильных паролей.

Действия:
1. Пользователь вводит номер телефона.
1. Пользователь подтверждает номер телефона.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль 2 раз.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль 3 раз.

Результат:
- Появляется элемент Капча.

B. Капча не появляется после 2-х вводов неправильных паролей на 3-й правильный.

Действия:
1. Пользователь вводит номер телефона.
1. Пользователь подтверждает номер телефона.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль 2 раз.
1. Пользователь вводит правильный пароль.
1. Пользователь подтверждает правильный пароль

Результат:
- Не появляется элемент Капча.
- Пользователь заходит в личный кабинет.

C. Пользователь видит окно ввода пароля после прохождения Капчи.

Предусловие:
- Пользователь вводит 3 неправильных пароля и видит окно капчи.

Действия:
1. Пользователь вводит Капчу.

Результат:
- Пользователь видит окно ввода пароля.

D. Количество попыток ввода пароля сбрасывается после успешного входа.

Действия:

1. Пользователь вводит номер телефона.
1. Пользователь подтверждает номер телефона.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль.
1. Пользователь видит сообщение "Осталось попыток 2 из 3".
1. Пользователь вводит правильный пароль.
1. Пользователь подтверждает правильный пароль
1. Пользователь заходит в личный кабинет.
1. Пользователь выходит из личного кабинета.
1. Пользователь вводит номер телефона.
1. Пользователь подтверждает номер телефона.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль.

Результат:
- Пользователь видит сообщение "Осталось попыток 2 из 3".

E. Количество попыток ввода пароля не сбрасывается (или сбрасывается в зависимости от требований, которых не имелось в наличии) после успешного повторного ввода телефона.

Действия:

1. Пользователь вводит номер телефона.
1. Пользователь подтверждает номер телефона.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль.
1. Пользователь видит сообщение "Осталось попыток 2 из 3".
1. Пользователь возвращается назад к вводу телефона.
1. Пользователь вводит номер телефона.
1. Пользователь подтверждает номер телефона.
1. Пользователь вводит неправильный пароль.
1. Пользователь подтверждает неправильный пароль.

Результат:
- Пользователь видит сообщение "Осталось попыток 1 из 3".

### Реализация Автотестов

**Замечание**
На момент реализации 6/7 августа, не смог отловить появление Капчи.
Аккаунт при вводе 3 неправильных блокируется на час.
Тесты реализовал на проверку блокировки, вместо Капчи.
<br>Подозреваю, что функционал был заменён, т.к. ~1 августа Капча была.

Сделал на JS стеке, потому что сейчас работаю с таким стеком и сделать задание было быстрее.
Обернул в docker-compose, чтобы можно было запустить тесты без установленной локально NodeJS.

Среди реализованных тестов - кейсы A и D. А также проверка, что с правильными данными пользователь заходит в личный кабинет.

#### Запуск
Тестовых данных предоставлено не было.
Перед запуском нужно задать номер телефона и пароль от личного кабинета.

Делается это либо в файле `tests/data/logins.js`, либо через переменные среды `TEST_PHONE_NUMBER` - 10значный номер и `TEST_PASSWORD` - пароль.

#### 1. Локально.
Требования:
1. запущен Grid на `localhost:4444` с Chrome
2. установлен NodeJS `NodeJS >= 8.12` и `yarn >= ^1.9.4`

Из директории проекта запустить:
```
yarn test
```

Чтобы передать переменные среды на *nix машинах:
```
TEST_PHONE_NUMBER=xxxxxxxxxx TEST_PASSWORD=yyyyyy yarn test
```

#### 2. Docker Compose.
Требования:
Установлены docker, docker-compose.

Из директории проекта запустить:
```
docker-compose up --exit-code-from e2e --abort-on-container-exit
```

Чтобы задать пароль и номер телефона в docker-compose.yml нужно заполнить для сервиса e2e `TEST_PHONE_NUMBER` и `TEST_PASSWORD`:

```
...
    environment:
      - HOST=hub
      - TEST_PHONE_NUMBER=xxxxxxxxx
      - TEST_PASSWORD=yyyyy
```