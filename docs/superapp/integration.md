---
outline: deep
---

# Интеграция с AITU Superapp

Для начала интеграции с **AITU Superapp** необходимо создать веб-приложение на любом фреймворке. Мы **рекомендуем использовать Next.js (React)** — он даёт отличную производительность и поддержку SSR.

### Создание проекта

::: details Инструкция по созданию проекта
Создаём новое Next-приложение:

```bash
npx create-next-app@latest
```

Запускаем локально:

```bash
npm run dev
```
:::

## Типизация объектов

Для надёжной работы с API, рекомендуется использовать следующую типизацию:

### Объект ответа от API

```ts:line-numbers
interface ApiResponse<T> {
    statusCode: number,
    message?: string,
    data: T
}
```

### Объект студента

```ts:line-numbers
interface Student {
    token: string,

    barcode: number,
    name: string,
    surname: string,

    group: {
        name: string
    }
}
```

## Регистрация слушателя

После запуска, **AITU Superapp отправляет вашему приложению JWT-токен** студента через `postMessage`.

::: danger Важно!
**Нельзя хранить JWT-токен** на клиенте или сервере — токен обновляется каждую неделю (а может и каждый день).  
Используйте **barcode студента как уникальный ключ**.
:::

### Пример регистрации слушателя

```ts:line-numbers {7}
const [token, setToken] = useState("");

useEffect(() => {
   const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "INIT") {
         console.log("Получен токен:", event.data.data); // debug
         setToken(event.data.data);
      }
   };

   window.addEventListener("message", handleMessage);

   return () => {
      window.removeEventListener("message", handleMessage);
   };
}, []);
```

## Идентификация студента

После получения токена, необходимо отправить запрос на **наш API**, чтобы получить данные о студенте.

> Рекомендуем использовать [xior](https://github.com/aklump/xior) или **axios** для выполнения HTTP-запросов.

```ts:line-numbers {11}
xior.get('https://api.yeunikey.dev/v1/auth/profile', {
   headers: {
      Authorization: 'Bearer ' + token
   }
}).then((response) => {

   if (response.data.statusCode == 400) {
      return;
   }

   console.log(response.data.data); // Объект студента
}).then(err => {
   console.log(err);
});
```

## Итоговая реализация

Вот как может выглядеть готовый компонент страницы с интеграцией в Next.js:

> Репозиторий на GitHub:  
> [GitHub — AITU Superapp Test Service](https://github.com/AITUSA-Digitalization-Committee/test-service)

::: code-group
```ts:line-numbers [page.tsx]
export default function Home() {

  const [student, setStudent] = useState<Student | null>(null);
  const [token, setToken] = useState("");

  { /* Получаем token */ }
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (event.data.type === "INIT") {
        console.log("Received token:", event.data.data)
        setToken(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  { /* Получаем студента */ }
  const fetchStudent = async () => {

    if (!token) {
      return;
    }

    await api.get<ApiResponse<Student>>('/auth/profile', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {

      if (response.data.statusCode == 400) {
        return;
      }

      setStudent(response.data.data);
      console.log(response.data.data)
    }).then(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchStudent();
  }, [token])

  return (
    <div>
      Данные студента {student.name + ' ' + student.surname}
    <div/>
  );
}
```
:::
