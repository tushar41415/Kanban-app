// dom.js
export function createEl(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') el.className = v;
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else el[k] = v;
  });
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  });
  return el;
}

// create a task card element
export function createTaskCard(task) {
  const title = createEl('h4', { class: 'task-title' }, [task.title]);
  const desc = task.description
    ? createEl('p', { class: 'task-desc' }, [task.description])
    : null;

  const date = new Date(parseInt(task.id)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short'
  });

  const meta = createEl('div', { class: 'task-meta' }, [
    createEl('span', {}, [date]),
    createEl('span', { class: `status status-${task.status}` }, [task.status])
  ]);

  const card = createEl(
    'div',
    { class: 'task-card', dataset: { id: task.id } },
    [title, desc, meta]
  );

  card.draggable = true;
  return card;
}
