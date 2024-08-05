# Flower Shop

Flower Shop - це онлайн-магазин квітів, де ви можете купити найкрасивіші квіти для будь-якої події. Ми пропонуємо швидку доставку, свіжі квіти та чудові ціни.

## Особливості

- **Широкий вибір квітів:** Ми пропонуємо різноманітні букети та квіти для будь-якої події.
- **Швидка доставка:** Отримайте ваші квіти свіжими і вчасно.
- **Висока якість:** Ми гарантуємо свіжість і якість наших квітів.

## Технології

Цей проект побудований з використанням таких технологій:

- **React:** JavaScript бібліотека для побудови користувацьких інтерфейсів.
- **Firebase:** Платформа для розробки мобільних та веб-додатків.
- **React Router:** Бібліотека для маршрутизації в React додатках.
- **Material-UI:** Бібліотека компонентів для React, яка реалізує дизайн-систему Material Design від Google.

## Встановлення

Щоб запустити цей проект локально, виконайте наступні кроки:

1. Клонуйте репозиторій:

    ```bash
    git clone https://github.com/your-username/flower-shop.git
    ```

2. Перейдіть до директорії проекту:

    ```bash
    cd flower-shop
    ```

3. Встановіть залежності:

    ```bash
    npm install
    ```

4. Запустіть додаток:

    ```bash
    npm start
    ```

Додаток буде доступний за адресою `http://localhost:3000`.

## Налаштування Firebase

Для роботи з Firebase, вам потрібно налаштувати свій проект Firebase:

1. Створіть новий проект у [Firebase Console](https://console.firebase.google.com/).
2. Додайте веб-додаток до свого проекту.
3. Скопіюйте конфігурацію Firebase та вставте її у файл `src/firebase.js`:

    ```javascript
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from "firebase/storage";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const auth = getAuth(app);

    export { db, storage, auth };
    ```

4. Замість значень `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, `YOUR_STORAGE_BUCKET`, `YOUR_MESSAGING_SENDER_ID` та `YOUR_APP_ID`, використовуйте значення з Firebase Console.

## Деплой

Цей проект розгорнутий на [Vercel](https://vercel.com/). Щоб розгорнути свій власний проект, виконайте наступні кроки:

1. Зареєструйтеся на Vercel і підключіть свій репозиторій.
2. Виберіть налаштування проекту і натисніть "Deploy".

## Ліцензія

Цей проект ліцензований за [MIT License](LICENSE).

## Контакти

Якщо у вас є питання або пропозиції, будь ласка, зв'яжіться з нами за адресою pytulyalybomyr@gmail.com
