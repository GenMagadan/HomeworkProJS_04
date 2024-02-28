import { trainingSchedule } from './data.js';

const localStorageKey = 'trainingList';

document.addEventListener('DOMContentLoaded', function () {
  let trainingList =
    JSON.parse(localStorage.getItem('trainingList')) ||
    JSON.parse(trainingSchedule);
  console.log(trainingList);
  if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, trainingList);
  }

  const trainings = document.querySelector(
    '.container__schedule-box'
  );

  function postSchedule() {
    trainings.innerHTML = '';
    trainingList.forEach((elem) => {
      const rowEl = document.createElement('li');
      rowEl.innerHTML = `
      <li class="${elem.id}">
      <h3 class="schedule-name">${elem.name}</h3>
      <h4 class="schedule-time">Время: ${elem.time}</h4>
      <p class="maxParticipants">Максимальный размер группы: ${elem.maxParticipants} чел.</p>
      <p class="currentParticipants">Записалось: ${elem.currentParticipants} чел.</p>
      <button data-id="${elem.id}" class="add-btn">Записаться</button>
      <button data-id="${elem.id}" class="delete-btn">Отменить запись</button> 
     </li>
    `;

      const joinBtn = rowEl.querySelector('.add-btn');
      const cancelBtn = rowEl.querySelector('.delete-btn');

      if (
        elem.currentParticipants >= elem.maxParticipants ||
        personalSchedule(elem.id)
      ) {
        joinBtn.disabled = true;
      } else {
        cancelBtn.disabled = true;
      }

      trainings.appendChild(rowEl);
    });
  }

  function personalSchedule(id) {
    const personalData =
      JSON.parse(localStorage.getItem('personalData')) || [];
    return personalData.includes(id);
  }

  trainings.addEventListener('click', function ({ target }) {
    if (target.classList.contains('add-btn')) {
      const id = parseInt(target.getAttribute('data-id'));
      const selectedItem = trainingList.find(
        (item) => item.id === id
      );
      console.log(selectedItem.currentParticipants);
      console.log(selectedItem.maxParticipants);
      if (
        selectedItem.currentParticipants <
        selectedItem.maxParticipants
      ) {
        selectedItem.currentParticipants++;
        const personalData =
          JSON.parse(localStorage.getItem('personalData')) || [];
        personalData.push(id);
        localStorage.setItem(
          'personalData',
          JSON.stringify(personalData)
        );
        localStorage.setItem(
          'trainingList',
          JSON.stringify(trainingList)
        );
        postSchedule();
      }
    }
  });

  trainings.addEventListener('click', function ({ target }) {
    if (target.classList.contains('delete-btn')) {
      const id = parseInt(target.getAttribute('data-id'));
      const selectItem = trainingList.find((item) => item.id === id);
      if (personalSchedule(id)) {
        selectItem.currentParticipants--;
        const personalData =
          JSON.parse(localStorage.getItem('personalData')) || [];
        const index = personalData.indexOf(id);
        if (index !== -1) {
          personalData.splice(index, 1);
        }
        localStorage.setItem(
          'personalData',
          JSON.stringify(personalData)
        );
        localStorage.setItem(
          'trainingList',
          JSON.stringify(trainingList)
        );
        postSchedule();
      }
    }
  });

  postSchedule();
});
