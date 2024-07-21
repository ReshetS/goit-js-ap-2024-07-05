import axios from 'axios';
import elements from './refs'; // витягуємо елементи кнопки та спану в змінну
import { axiosURL, LS_KEY } from './variables';

axios.defaults.baseURL = axiosURL; //задаємо базову адресу нашого бекенду для аксіос

function addBablo(user) {
  // створюємо функцію для обробки кліку по кнопці, приймаємо об'єкт юзера і посилання на спан у змінну element
  elements.button.disabled = true; //блокуємо кнопку
  elements.button.innerHTML =
    '<span class="loader"></span>&nbsp;&nbsp;&nbsp;Нарахування бабла...'; //змінюємо текст кнопки і додаємо спіннер
  setTimeout(() => {
    // Імітуємо затримку відповіді бекенду
    user.bablo += 1; // збільшуємо значення бабла у об'єкта юзера на 1
    axios
      .put(`user/${user.userID}`, user) // змінюємо значення бабла у юзера на бекенді (нажаль, mockapi не приймає метод PATCH, тому використовуємо PUT і скидаємо весь об'єкт)
      .then(function () {
        elements.countSpan.innerHTML = user.bablo.toString(); // якщо успішно змінилось значення бабла на бекенді, то змінюємо значення і у спанчику на фронтенді
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        elements.button.innerHTML = 'Бабло!'; //Повертаємо значення кнопки
        elements.button.disabled = false; //Розблокуємо кнопку
      });
  }, Math.random() * 3000); // Рандомна затримка до 3 секунд
}
function startFromScratch(user) {
  axios
    .post('user', { bablo: 0 }) // створюємо нового юзера на бекенді
    .then(function (response) {
      user.userID = Number(response.data.userID); // в об'єкт юзера заносимо його новостворений ІД у числовому форматі
      user.bablo = 0; // обнуляємо кількість бабла у об'єкті юзера
      elements.countSpan.innerHTML = '0'; //обнуляємо кількість бабла на сторінці
      localStorage.setItem(LS_KEY, JSON.stringify(user.userID)); // зберігаємо ІД юзера у ЛС
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { addBablo, startFromScratch };
