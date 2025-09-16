
import { saveTasks } from './storage.js';

export function initDragDrop(tasks, render) {
  const lists = document.querySelectorAll('.column-content');

  lists.forEach(list => {
    list.addEventListener('dragover', e => {
      e.preventDefault();
      list.classList.add('drag-over');
    });

    list.addEventListener('dragleave', () => {
      list.classList.remove('drag-over');
    });

    list.addEventListener('drop', e => {
      e.preventDefault();
      list.classList.remove('drag-over');

      const id = e.dataTransfer.getData('text/plain');
      const card = document.querySelector(`.task-card[data-id="${id}"]`);

      if (card) {
        const newStatus = list.dataset.column;
        const task = tasks.find(t => t.id === id);
        if (task) {
          task.status = newStatus;
          saveTasks(tasks);
          render();
        }
      }
    });
  });

  const cards = document.querySelectorAll('.task-card');
  cards.forEach(card => {
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.dataset.id);
      setTimeout(() => card.classList.add('hide'), 0);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('hide');
    });
  });
}
