function isElement(object) {
  // return true if it is an element
  try {
    return object instanceof HTMLElement;
  } catch (e) {
    return (
      object &&
      typeof object === "object" &&
      object !== null &&
      object.nodeType === 1 &&
      typeof object.nodeName === "string"
    );
  }
}

(async function() {
  function getTodayTodoList() {
    /*const daysAheadOS = await getOS(['days_ahead']);
    const daysAheadCursorReq = daysAheadOS[0].openCursor(_Date('en-US'));
    const daysAheadCursor = await daysAheadCursorReq;
    console.log(daysAheadCursor.result);
    if (daysAheadCursor) {
      const today = daysAheadCursor.value, numberOfTasks = today.tasks.length;
      const todoItemsOS = await getOS(['todo_items']);
      let i;
      const todoItems = [];
      for (i = 0; i < numberOfTasks; i++) {
        const todoItemsCursorReq = todoItemsOS.openCursor(today.tasks[i]);
        const todoItemsCursor = await todoItemsCursorReq.result;
        if (todoItemsCursor) {
          const todoItem = ToDoItem.restore(todoItemsCursor.value.id);
          await todoItems.push(todoItem);
          console.log(todoItems);
        }
      }
      return todoItems;
    } else {
      const today = await new Day();
      console.log(today);
      return [];
    }*/
    const loading = getOS(['days_ahead', 'todo_items']);
    loading.then(objectStores => {
      const daysAheadOS = objectStores[0];
      const todoItemsOS = objectStores[1];
      const daysAheadCursorReq = daysAheadOS.openCursor(_Date('en-US'));
      daysAheadCursorReq.onsuccess = event => {
        const daysAheadCursor = event.target.result;
        const todoItems = [];
        if (daysAheadCursor) {
          const today = daysAheadCursor.value, numberOfTasks = today.tasks.length;
          let i = 0;
          while (numberOfTasks > i && 2 > i) {
            const todoItemsCursorReq = todoItemsOS.openCursor(today.tasks[i]);
            todoItemsCursorReq.onsuccess = async (event) => {
              const todoItemsCursor = event.target.result;
              if (todoItemsCursor) {
                const todoItem = await ToDoItem.restore(todoItemsCursor.value.id);
                todoItems.push(todoItem);
                console.log(todoItems);
              }
            };
            i++;
          }
          console.log(todoItems);
        } else {
          // Could not find the date in days_ahead (didn't create and schedule)
          const today = new Day();
          console.log(today.tasks);
        }
        console.log(loading);
        loading.constructor.resolve(todoItems);
      };
    });
    return loading;
  }

  const preloadSection = document.querySelector('.preload');
  const mainApp = document.querySelector('.main-app');
  preloadSection.classList.add('moveSection-prevElement');
  mainApp.classList.add('moveSection-nextElement-right');
  const todoList = await getTodayTodoList();
  console.log(todoList);
  moveSection(preloadSection, mainApp, 'toLeft', 700);
  /*loading.then(response => {
    console.log(response);
    moveSection(preloadSection, mainApp, 'toLeft', 700);
    const viewTodaySection = renderElement('div', '', 'view-today');
    document.body.appendChild(viewTodaySection);
  }).catch(exception => {

    throw exception;
  });*/
})();
