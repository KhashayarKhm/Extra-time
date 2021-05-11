/* QUESTION: alan mn vas function "viewItems" vas pin ye gozine undefined hm gzashtm
alan momkne k toy sort moshkl pish biad? */
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

function moveSection(prevElement, nextElement, direction) {
  // Verify arguments
  switch (true) {
    case !isElement(prevElement):
      throw new TypeError(`\"${prevElement}\" is not an element`);
    case !isElement(nextElement):
      throw new TypeError(`\"${nextElement}\" is not an element`);
    case !prevElement.classList.contains("moveSection-prevElement-left") &&
      !prevElement.classList.contains("moveSection-prevElement-right") &&
      !prevElement.classList.contains("moveSection-prevElement"):
      throw new ReferenceError("\"prevElement\" does not have the target class");
    case !nextElement.classList.contains("moveSection-nextElement-left") &&
      !nextElement.classList.contains("moveSection-nextElement-right") &&
      !nextElement.classList.contains("moveSection-nextElement"):
      throw new ReferenceError("\"nextElement\" does not have the target class");
    case nextElement.nextElementSibling !== prevElement && prevElement.previousElementSibling !== nextElement:
      throw new ReferenceError("Elements are not in order");
    case typeof direction !== "string":
      throw new TypeError(`\"${direction}\" type is not string`);
    case direction !== "toLeft" && direction !== "toRight":
      throw new RangeError(`\"${direction}\" argument is not a valid code point`);
  }
  // Main code
  if (direction === "toRight") {
    let dir = {
      nextElementClass: "moveSection-nextElement-right",
      prevElementClass: "moveSection-prevElement-left",
    };

    nextElement.addEventListener("transitionend", () => {
      const parent = nextElement.parentElement;
      if (parent) {
        nextElement.style.display = "none";
        prevElement.classList.remove("moveSection-prevElement");
        parent.removeChild(nextElement);
      }
    });

    nextElement.addEventListener("transitionstart", () => {
      prevElement.classList.replace(
        dir.prevElementClass,
        "moveSection-prevElement"
      );
    });

    nextElement.classList.replace(
      "moveSection-nextElement",
      dir.nextElementClass
    );
  } else {
    // direction value is 'toLeft'
    let dir = {
      nextElementClass: "moveSection-nextElement-right",
      prevElementClass: "moveSection-prevElement-left",
    };

    prevElement.addEventListener("transitionend", () => {
      const parent = prevElement.parentElement;
      if (parent) {
        prevElement.style.display = "none";
        parent.removeChild(prevElement);
        nextElement.classList.remove("moveSection-nextElement");
      }
    });

    prevElement.addEventListener("transitionstart", () => {
      nextElement.classList.replace(
        dir.nextElementClass,
        "moveSection-nextElement"
      );
    });

    prevElement.classList.replace(
      "moveSection-prevElement",
      dir.prevElementClass
    );
  }
}

function renderElement(nodeObject, namespace = 'http://www.w3.org/1999/xhtml') {
  // Verify argument values
  if (nodeObject.constructor !== Object) {
    throw new TypeError('\"nodeObject\" is invalid argument')
  } else if (namespace !== 'http://www.w3.org/1999/xhtml' && namespace !== 'http://www.w3.org/2000/svg') {
    throw new TypeError('The namespace is invalid');
  } else {
    if (!Object.keys(nodeObject).includes('tagName')) {
      throw new TypeError('\"nodeObject\" tag name is undefined');
    }
    let attribute, value;
    const objEnt = Object.entries(nodeObject);
    for ([attribute, value] of objEnt) {
      switch (attribute) {
        case 'tagName':
          if (typeof value !== 'string') {
            throw new TypeError(`${value} is invalid value for tag name`);
          }
          break;
        case 'content':
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new TypeError(`${value} is invalid value for content`);
          }
          break;
        case 'className':
          if (typeof value !== 'string' && !(value instanceof Array)) {
            throw new TypeError(`${value} is invalid value for class name`);
          }
          break;
        case 'idName':
          if (typeof value !== 'string') {
            throw new TypeError(`${value} is invalid value for id name`);
          }
          break;
        default:
          // Custom attribute
          if (value && typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
            throw new TypeError(`${value} is invalid value for ${attribute} attribute`);
          }
      }
    }
  }
  // Main code
  const element = document.createElementNS(namespace, nodeObject.tagName);

  if (nodeObject.content) {
    element.textContent = nodeObject.content;
  }

  if (nodeObject.className) {
    if (nodeObject.className instanceof Array) {
      let value;
      for (value of nodeObject.className) {
        element.classList.add(value);
      }
    } else {
      element.classList.add(nodeObject.className);
    }
  }

  if (nodeObject.idName) {
    element.id = nodeObject.idName;
  }

  const customAttr = Object.keys(nodeObject).filter(attr => attr !== 'tagName' && attr !== 'content' && attr !== 'className' && attr !== 'idName');
  if (customAttr.length !== 0) {
    let attribute;
    for (attribute of customAttr) {
      element.setAttribute(attribute, nodeObject[attribute]);
    }
  }

  return element;
}

function viewTaskInfo(event) {
  const targetNode = event.target;
  const messageEnv = document.querySelector('.flip-env-inner > .todo-list > .todo-list-header > .message-env');
  const infoSection = messageEnv.querySelector('.task-info.message');
  const listItems = infoSection.querySelectorAll('.vertical-list > li');
  const todayArrange = userSetting('todayArrange');
  const targetObject = todayArrange[targetNode.id];
  if (messageEnv.classList.contains('hidden')) {
    messageEnv.classList.remove('hidden');
    infoSection.style.animationName = 'view-type1';
  } else {
    return;
  }
  let i;
  for (i = 1; i < 7; i++) {
    const blank = listItems[i].querySelectorAll('span');
    switch (i) {
      case 1:
        blank[0].innerHTML = targetObject.rootObject.subject;
        break;
      case 2:
        blank[0].innerHTML = `${targetObject.timer || targetObject.rootObject.timer} minutes`;
        break;
      case 3:
        blank[0].innerHTML = `${targetObject.rootObject.scheduledDays} days`;
        break;
      case 4:
        blank[0].innerHTML = typeof targetObject.pin === 'boolean' ? targetObject.pin ? 'Yes' : 'No' : targetObject.rootObject.pin ? 'Yes' : 'No';
        break;
      case 5:
        let index;
        for (index of targetObject.rootObject.pattern) {
          blank[index].style.color = '#E76166';
        }
        break;
      case 6:
        blank[0].innerHTML = targetObject.rootObject.description;
        break;
    }
  }
  const editButton = listItems[0].querySelector('button[name="edit"][data-them]');
  editButton.addEventListener('click', (e) => {
    // Prepare the environment
    workEnvPermission('addTaskEnv');
    const flipEnv = document.querySelector('.flip-env');
    flipEnv.classList.add('flip');
    const addTaskEnv = flipEnv.querySelector('.work-env > .add-task-env');
    addTaskEnv.classList.remove('hidden');
    // Change the headers
    const addTaskEnvHeader = addTaskEnv.querySelector('h3');
    const addTaskEnvDesc = addTaskEnv.querySelector('p');
    addTaskEnvHeader.innerText = 'Edit task';
    addTaskEnvDesc.innerText = `Target Task ID: ${targetObject.rootObject.id}`;
    // Fill the inputs with task values as default value
    const inputs = [...addTaskEnv.querySelectorAll('.add-task-form > .vertical-list > li > input'), addTaskEnv.querySelector('.add-task-form > .vertical-list > li > textarea')];
    const checkboxs = addTaskEnv.querySelectorAll('.add-task-form > .vertical-list > li > .options > li > label > input[type = "checkbox"]');
    inputs[0].value = targetObject.rootObject.subject;
    inputs[1].value = targetObject.timer;
    inputs[2].value = targetObject.rootObject.scheduledDays;
    inputs[3].value = targetObject.rootObject.description;
    let i;
    for (i = 0; i < 8; i++) {
      checkboxs[i].checked = targetObject.rootObject.pattern.includes(i) || (i === 7 && targetObject.pin) ? true : false;
    }
    // Set cancel event
    const backButton = flipEnv.querySelector('.work-env > button.symptomatic');
    backButton.addEventListener('click', hideNode.bind(undefined, addTaskEnv, 'flip', 800), { once: true, });
    // Set edit event
    const submitButton = addTaskEnv.querySelector('button[name = "submit"]');
    submitButton.addEventListener('click', () => {
      let input;
      for (input of inputs) {
        // REVIEW: byd class datePick ro avz krd o globalsh krd va inke toy addTaskEnv hm insert krd vas startDate
        // if () {
        //
        // }
      }
    }, { once: true, });
  }, { once: true, });
  const removeButton = listItems[0].querySelector('button[name="remove"][data-them]');
  removeButton.addEventListener('click', () => {
    const removeMessageEnv = listItems[0].querySelector('.message-env');
    if (removeMessageEnv.classList.contains('hidden')) {
      removeMessageEnv.classList.remove('hidden');
      const removeOptionsEnv = removeMessageEnv.querySelector('.remove-task.message');
      removeOptionsEnv.style.animationName = 'view-type1';
      const skipTaskButton = removeOptionsEnv.querySelector('button[name="skip"][data-them]');
      const rejectTaskButton = removeOptionsEnv.querySelector('button[name="reject"][data-them]');
      const deleteTaskButton = removeOptionsEnv.querySelector('button[name="delete"][data-them]');
      const cancelButton = removeOptionsEnv.querySelector('button[name="cancel"][data-them]');

      function removeOptions(event) {
        const targetButton = event.target;
        let command;
        switch (true) {
          case targetButton.isSameNode(skipTaskButton):
            command = 'Skip';
            break;
          case targetButton.isSameNode(rejectTaskButton):
            command = 'Reject';
            break;
          case targetButton.isSameNode(deleteTaskButton):
            command = 'Delete';
            break;
          default:
            skipTaskButton.removeEventListener('click', removeOptions);
            rejectTaskButton.removeEventListener('click', removeOptions);
            deleteTaskButton.removeEventListener('click', removeOptions);
            hideNode(removeOptionsEnv, 'fade-type1', 300, false, removeMessageEnv);
            return;
        }
        const makeSureMessageEnv = renderElement({
          tagName: 'div',
          className: 'message-env',
        });
        removeOptionsEnv.appendChild(makeSureMessageEnv);
        const makeSureMessage = renderElement({
          tagName: 'div',
          className: ['make-sure', 'message'],
        });
        makeSureMessageEnv.appendChild(makeSureMessage);
        const messageText = renderElement({
          tagName: 'p',
          content: `Are you sure to ${command.toLowerCase()}?`,
        });
        makeSureMessage.appendChild(messageText);
        const cancelMessageButton = renderElement({
          tagName: 'button',
          content: 'Cancel',
          type: 'button',
          name: 'cancel',
        });
        makeSureMessage.appendChild(cancelMessageButton);
        cancelMessageButton.addEventListener('click', hideNode.bind(undefined, makeSureMessage, 'fade-type1', 300, false, makeSureMessageEnv));
        const targetCommandButton = renderElement({
          tagName: 'button',
          content: command,
          type: 'button',
          name: command.toLowerCase(),
        });
        makeSureMessage.appendChild(targetCommandButton);
        targetCommandButton.addEventListener('click', () => {
          (command === 'Delete' ? ToDoItem.restore(targetNode.id) : new Day()).then(response => {
            switch (command) {
              case 'Skip':
                response.skipTask(targetNode.id).catch(exception => console.warn).finally(() => hideNode(makeSureMessage, 'fade-type1', 300, false, makeSureMessageEnv));
                break;
              case 'Reject':
                response.loseTask(targetNode.id).catch(exception => console.warn).finally(() => hideNode(makeSureMessage, 'fade-type1', 300, false, makeSureMessageEnv));
                break;
              case 'Delete':
                response.delete().catch(exception => console.warn).finally(() => hideNode(makeSureMessage, 'fade-type1', 300, false, makeSureMessageEnv));
                break;
            }
          });
        });
      }
      skipTaskButton.addEventListener('click', removeOptions);
      rejectTaskButton.addEventListener('click', removeOptions);
      deleteTaskButton.addEventListener('click', removeOptions);
      cancelButton.addEventListener('click', removeOptions);
    }
  });
}

function renderTodoItem(todoItemObj, shallowChanges = {}) {
  // Verify argument
  if (!todoItemObj || todoItemObj.constructor !== ToDoItem) {
    throw new TypeError('\"todoItemObj\" value is invalid, it should be object');
  } else if (shallowChanges.constructor !== Object) {
    throw new TypeError('\"shallowChanges\" should be object');
  }
  // Main code
  const pinStatus = typeof shallowChanges.pin === 'boolean' ? shallowChanges.pin : todoItemObj.pin;
  const taskBody = renderElement({
    tagName: 'div',
    className: ['inactive', 'task'],
    idName: todoItemObj.id,
    'data-pin': pinStatus,
  });
  const subject = renderElement({
    tagName: 'h4',
    content: todoItemObj.subject,
  });
  // Icon attribute standard
  const iconStd = {
    tagName: 'svg',
    className: 'icon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 64 64',
    role: 'img',
  };
  // Pin button
  const pinSVG = renderElement({
    tagName: 'svg',
    className: (pinStatus ? ['icon', 'pin'] : 'icon'),
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 64 64',
    role: 'img',
  }, 'http://www.w3.org/2000/svg');
  const pinPath1 = renderElement({
    tagName: 'path',
    d: 'M2.6 61.4l24.2-24.2',
  }, 'http://www.w3.org/2000/svg');
  const pinPath2 = renderElement({
    tagName: 'path',
    d: 'M43.1 45V33.7L53.7 23a5 5 0 0 0 6.3-.6l1.4-1.4L43.1 2.6 41.6 4a5 5 0 0 0-.6 6.3L30.3 20.9H19l-4.2 4.2 8.5 8.5 3 3 1 1 3 3 8.5 8.5z',
  }, 'http://www.w3.org/2000/svg');
  pinSVG.appendChild(pinPath1);
  pinSVG.appendChild(pinPath2);
  // Scheduled days section
  const scheduledDaysBody = renderElement({
    tagName: 'div',
    className: 'scheduled-days',
  });
  const scheduledDaysSVG = renderElement(iconStd, 'http://www.w3.org/2000/svg');
  const scheduledDaysPath1 = renderElement({
    tagName: 'path',
    d: 'M8 4.2c13.3-6.7 31.7 7.5 48 .2l-16 16 16 14c-15.7 7.7-34.7-6.5-48 .1',
  }, 'http://www.w3.org/2000/svg');
  const scheduledDaysPath2 = renderElement({
    tagName: 'path',
    d: 'M8 61.6V3.4',
  }, 'http://www.w3.org/2000/svg');
  const scheduledDaysSpan = renderElement({
    tagName: 'span',
    content: `${todoItemObj.scheduledDays}d`,
  });
  scheduledDaysSVG.appendChild(scheduledDaysPath1);
  scheduledDaysSVG.appendChild(scheduledDaysPath2);
  scheduledDaysBody.appendChild(scheduledDaysSVG);
  scheduledDaysBody.appendChild(scheduledDaysSpan);
  // Timer section
  const timerBody = renderElement({
    tagName: 'div',
    className: 'remaining-time'
  });
  const timerSVG = renderElement(iconStd, 'http://www.w3.org/2000/svg');
  const timerPath1 = renderElement({
    tagName: 'path',
    d: 'M16 55c4 0 9.959-5.608 12.984-8a5.114 5.114 0 0 1 6.024-.016C38.057 49.355 44 55 48 55M20.084 26c8-3.205 14.6 3.65 24.121-.216',
  }, 'http://www.w3.org/2000/svg');
  const timerPath2 = renderElement({
    tagName: 'path',
    d: 'M48 62V48.513a14 14 0 0 0-5.953-11.457l-5.527-3.881a1 1 0 0 1 0-1.637l5.526-3.881A14 14 0 0 0 48 16.2V2M16 2v14.2a14 14 0 0 0 5.954 11.457l5.526 3.881a1 1 0 0 1 0 1.637l-5.526 3.881A14 14 0 0 0 16 48.513V62m-3 0h38M13 2h38',
  }, 'http://www.w3.org/2000/svg');
  const timerPath3 = renderElement({
    tagName: 'path',
    d: 'M27.816 32.77C30.687 33.5 31.833 37 32 37c.132 0 .867-3.383 4.095-4.7',
  }, 'http://www.w3.org/2000/svg');
  const timerSpan = renderElement({
    tagName: 'span',
    content: `${shallowChanges.timer > 0 ? parseInt(shallowChanges.timer) : todoItemObj.timer}m`,
  });
  timerSVG.appendChild(timerPath1);
  timerSVG.appendChild(timerPath2);
  timerSVG.appendChild(timerPath3);
  timerBody.appendChild(timerSVG);
  timerBody.appendChild(timerSpan);
  // Assemble the nodes
  taskBody.appendChild(subject);
  taskBody.appendChild(pinSVG);
  taskBody.appendChild(scheduledDaysBody);
  taskBody.appendChild(timerBody);
  taskBody.addEventListener('click', viewTaskInfo);
  return taskBody;
}

function navigateUp(targetNode, nodeListQuery) {
  console.log('navigate up');
  let nodeList;
  // Verify arguments
  if (!isElement(targetNode)) {
    throw new TypeError('\"targetNode\" is not node object');
  } else if (typeof nodeListQuery !== 'string') {
    throw new TypeError('\"nodeListQuery\" is not string');
  } else {
    nodeList = document.querySelectorAll(nodeListQuery);
    nodeList = Array.from(nodeList);
    if (!nodeList.includes(targetNode)) {
      console.log(nodeListQuery);
      console.log(nodeList);
      console.log(targetNode);
      throw new RangeError('The target node does not exist in node list that referenced');
    }
  }
  nodeList.sort((n1, n2) => parseInt(getComputedStyle(n1).order) - parseInt(getComputedStyle(n2).order));
  // Check the condition
  const targetNodeOrder = parseInt(getComputedStyle(targetNode).order);
  const upperNodeOrder = targetNodeOrder - 1;
  const upperNode = nodeList.find(node => parseInt(getComputedStyle(node).order) === upperNodeOrder);
  // If the upper node doesn't have the "data-index" property, so we can find out that the target node is the first node
  if (targetNodeOrder === 0) {
    // console.info('null node');
    return;
  } else if ((upperNode.getAttribute('data-pin') === 'true') && (targetNode.getAttribute('data-pin') === 'false')) {
    // console.info('different pin status');
    return;
  }
  // Inner function
  function changeOrder() {
    targetNode.classList.remove('navigateUp');
    upperNode.classList.remove('navigateDown');
    targetNode.style.order = upperNodeOrder;
    upperNode.style.order = targetNodeOrder;
  }
  // Main code
  upperNode.classList.add('navigateDown');
  targetNode.classList.add('navigateUp');
  setTimeout(() => changeOrder(), 250);
}

function navigateDown(targetNode, nodeListQuery) {
  console.log('navigate down');
  let nodeList;
  // Verify arguments
  if (!isElement(targetNode)) {
    throw new TypeError('\"targetNode\" is not node object');
  } else if (typeof nodeListQuery !== 'string') {
    throw new TypeError('\"nodeListQuery\" is not string');
  } else {
    nodeList = document.querySelectorAll(nodeListQuery);
    nodeList = Array.from(nodeList);
    if (!nodeList.includes(targetNode)) {
      throw new RangeError('The target node does not exist in node list that referenced');
    }
  }
  nodeList.sort((n1, n2) => parseInt(getComputedStyle(n1).order) - parseInt(getComputedStyle(n2).order));
  // Check the condition
  const targetNodeOrder = parseInt(getComputedStyle(targetNode).order);
  const lowerNodeOrder = targetNodeOrder + 1;
  const lowerNode = nodeList.find(node => parseInt(getComputedStyle(node).order) === lowerNodeOrder);
  if (targetNodeOrder === nodeList.length - 1) {
    // console.info('last node');
    return;
  } else if ((lowerNode.getAttribute('data-pin') === 'false') && (targetNode.getAttribute('data-pin') === 'true')) {
    // console.info('different pin status');
    return;
  }
  // Inner function
  function changeOrder() {
    lowerNode.classList.remove('navigateUp');
    targetNode.classList.remove('navigateDown');
    targetNode.style.order = lowerNodeOrder;
    lowerNode.style.order = targetNodeOrder;
  }
  // Main code
  lowerNode.classList.add('navigateUp');
  targetNode.classList.add('navigateDown');
  setTimeout(() => changeOrder(), 250);
}

function changePinStatus(targetNode, nodeListQuery) {
  let nodeList;
  // Verify arguments
  if (!isElement(targetNode)) {
    throw new TypeError('\"targetNode\" is not node object');
  } else if (typeof nodeListQuery !== 'string') {
    throw new TypeError('\"nodeListQuery\" is not string');
  } else {
    nodeList = document.querySelectorAll(nodeListQuery);
    nodeList = Array.from(nodeList);
    if (!nodeList.includes(targetNode)) {
      console.log(nodeListQuery);
      console.log(nodeList);
      console.log(targetNode);
      throw new RangeError('The target node does not exist in node list that referenced');
    }
  }
  nodeList.sort((n1, n2) => parseInt(getComputedStyle(n1).order) - parseInt(getComputedStyle(n2).order));
  // Main code
  const currentPinStatus = targetNode.getAttribute('data-pin');
  const targetNodeIndex = nodeList.findIndex(node => node.id === targetNode.id);
  // If the index is more than the "boundIndex" means that the own node is pinned
  const boundIndex = nodeList.findIndex(node => node.getAttribute('data-pin') === 'false');
  const pinSVG = targetNode.querySelector('svg');
  if (currentPinStatus === 'false') {
    // The node should navigate up
    let interval = targetNodeIndex - boundIndex;
    console.log(`targetNodeIndex: ${targetNodeIndex}, boundIndex: ${boundIndex}, interval: ${interval}`);
    const loop = setInterval(() => {
      if (interval <= 0 || interval - 1 < 0) {
        clearInterval(loop);
      } else {
        interval--;
        console.log(`live i: ${interval}`);
        navigateUp(targetNode, nodeListQuery);
      }
    }, 810);
    targetNode.setAttribute('data-pin', true);
    pinSVG.classList.add('pin');
  } else {
    // The node should navigate down
    let interval = targetNodeIndex - boundIndex;
    console.log(`targetNodeIndex: ${targetNodeIndex}, boundIndex: ${boundIndex}, interval: ${interval}`);
    const loop = setInterval(() => {
      if (interval <= 0 || interval - 1 <= 0) {
        clearInterval(loop);
      } else {
        interval--;
        console.log(`live i: ${interval}`);
        navigateDown(targetNode, nodeListQuery);
      }
    }, 810);
    targetNode.setAttribute('data-pin', false);
    pinSVG.classList.remove('pin');
  }
}

function updateOverviewTable() {
  console.log('update overview table');
}

function viewItems(todayTasks, shallowChanges = {}) {
  // Verify the argument
  const todoListDiv = document.querySelector('.todo-list');
  const existingTasks = todoListDiv.querySelectorAll('.task');
  if (todayTasks.constructor === Array) {
    if (todayTasks.length === 0) {
      // There is nothing task to show
      if (existingTasks.length === 0 && !todoListDiv.querySelector('div.nothing-to-do')) {
        const nothingToDoZone = renderElement({
          tagName: 'div',
          className: 'nothing-to-do'
        });
        const h1 = renderElement({
          tagName: 'h1',
          content: 'There is nothing to do!',
          className: 'h3',
        });
        const img = renderElement({
          tagName: 'img',
          src: './Pics/man.png',
          alt: 'There is nothing to do image',
        });
        nothingToDoZone.appendChild(img);
        nothingToDoZone.appendChild(h1);
        todoListDiv.classList.add('single-content-mode');
        todoListDiv.appendChild(nothingToDoZone);
        return null;
      } else {
        throw new RangeError('There is no task sent to show');
      }
    } else if (existingTasks.length >= 3) {
      throw new RangeError('Task capacity in view list is full');
    } else {
      let item;
      for(item of todayTasks) {
        if (item.constructor !== ToDoItem) {
          throw new RangeError('Invalid value for task list');
        }
      }
    }
  } else {
    throw new TypeError('\"todayTasks\" should be array');
  }
  if (shallowChanges) {
    if (shallowChanges.constructor !== Object) {
      throw new TypeError('\"shallowChanges\" should be object');
    }
    const values = Object.entries(shallowChanges);
    let key, value;
    for ([key, value] of values) {
      if (value.pin && typeof value.pin !== 'boolean') {
        throw new TypeError(`The pin property value of ${key} ID is invalid`);
      }
      if (value.timer && (typeof value.timer !== 'number' || value.timer <= 0)) {
        throw new TypeError(`The timer property value of ${key} ID is invalid`);
      }
    }
  }
  // Main code
  // Remove the nothing to do section (if includes)
  const nothingToDoZone = document.querySelector('.todo-list .nothing-to-do');
  if (nothingToDoZone) {
    todoListDiv.removeChild(nothingToDoZone);
    todoListDiv.classList.remove('single-content-mode');
  }
  // Rendering the tasks
  let taskUI, i = 0;
  const length = todayTasks.length > 3 ? 3 : todayTasks.length;
  const viewLoop = setInterval(() => {
    taskUI = shallowChanges[todayTasks[i].id] ? renderTodoItem(todayTasks[i], shallowChanges[todayTasks[i].id]) : renderTodoItem(todayTasks[i]);
    taskUI.classList.add('viewItems-fade');
    taskUI.style.order = i;
    todoListDiv.appendChild(taskUI);
    setTimeout(() => {
      taskUI.classList.add('viewItems-show');
      taskUI.classList.remove('viewItems-fade');
      setTimeout(() => {
        taskUI.classList.remove('viewItems-show');
      }, 50);
    }, 200);
    if (i + 1 >= length) {
      if (todayTasks.length > 3) {
        const viewMoreButton = renderElement({
          tagName: 'button',
          name: 'view more',
          className: 'disregard-button',
          content: 'View all today tasks',
        });
        viewMoreButton.addEventListener('click', viewAllTasks);
        viewMoreButton.classList.add('viewItems-fade');
        viewMoreButton.style.order = 4;
        todoListDiv.appendChild(viewMoreButton);
        setTimeout(() => {
          // debugger;
          viewMoreButton.classList.add('viewItems-show');
          viewMoreButton.classList.remove('viewItems-fade');
          setTimeout(() => {
            viewMoreButton.classList.remove('viewItems-show');
          }, 50);
        }, 800);
      }
      clearInterval(viewLoop);
      return i + 1;
    } else {
      i++;
    }
  }, 300);
}

function clearWorkEnv() {
  const workEnv = document.querySelector('.flip-env > .filp-inner-env > .work-env');
  const addTaskEnv = workEnv.querySelector('div.add-task-env');
  const settingEnv = workEnv.querySelector('div.setting-env');
  const backButton = workEnv.querySelector('button.symptomatic');
  let child;
  for (child of workEnv.children) {
    switch (true) {
      case child.isSameNode(backButton):
      case child.isSameNode(addTaskEnv):
      case child.isSameNode(settingEnv):
        child.classList.add('hidden');
        break;
      default:
        workEnv.removeChild(child);
    }
  }
}

async function arrangeList(important = false) {
  // Verify argument and get permission
  if (typeof important !== 'boolean') {
    important = false;
  }
  if (!workEnvPermission('arrangeListEnv')) {
    const flipEnv = document.querySelector('.flip-env');
    if (flipEnv.classList.contains('flip')) {
      const arrangeListEnv = document.querySelector('.flip-env > .flip-env-inner > .work-env > .arrangeList');
      hideNode(arrangeListEnv, 'flip', 800, true);
    }
    // When call "workEnvPermission" without any argument, it clear the work environment
    workEnvPermission();
    return;
  }

  // Get and arrange today tasks
  let todayTasks;
  const todayObject = await new Day();
  if (!todayObject.tasks.length) {
    userSetting('todayArrange', {});
    return viewItems(todayObject.tasks);
  } else {
    const todayTasksReq = [];
    let taskId;
    for (taskId of todayObject.tasks) {
      todayTasksReq.push(ToDoItem.restore(taskId));
    }
    const messyTodoList = await Promise.all(todayTasksReq);
    // Arrange by default or last arrange
    if (important) {
      const goBackButton = document.querySelector('.flip-env > .flip-env-inner > .work-env > button.symptomatic');
      goBackButton.classList.add('hidden');
      todayTasks = messyTodoList.sort(sortTasks);
    } else {
      let lastArrange = userSetting('todayArrange');
      lastArrange = Object.values(lastArrange);
      lastArrange = lastArrange.sort((aObject, bObject) => aObject.order - bObject.order);
      todayTasks = lastArrange.map(task => messyTodoList.find(targetTask => targetTask.id === task.rootObject.id));
    }
  }

  // Inner functions
  function getArrange() {
    // Prepare arranged list
    let nodeList = document.querySelectorAll('.arrangeList > .arrangeList-task');
    nodeList = Array.from(nodeList);
    nodeList = nodeList.sort(sortTasks);
    const todayArrange = nodeList.map(node => todayTasks.find(task => task.id === node.id));
    const userShallowChanges = {};
    for(let node of nodeList) {
      // FIXME: age trf bkhad taqqir bde byd toy HTML input bzrim pas in code hm eshtbe
      let timer = node.querySelector('.remaining-time').innerText;
      timer = timer.replace('m', '');
      timer = parseInt(timer);
      userShallowChanges[node.id] = {
        pin: node.getAttribute('data-pin') === 'true' ? true : false,
        timer: timer,
        order: parseInt(getComputedStyle(node).order),
        rootObject: todayTasks.find(task => task.id === node.id),
      };
    }
    // Remove the arranging section and the todo list arranging mode
    const arrangeListSec = nodeList[0].parentNode;
    const workEnv = arrangeListSec.parentNode;
    workEnv.parentNode.parentNode.classList.remove('flip');
    setTimeout(() => {
      const goBackButton = workEnv.querySelector('button.symptomatic');
      goBackButton.classList.remove('hidden');
      workEnv.removeChild(arrangeListSec);
    }, 800);
    userSetting('todayArrange', userShallowChanges);
    viewItems(todayArrange, userShallowChanges);
  }
  // Main code
  const iconStd = {
    tagName: 'svg',
    className: 'icon',
    viewBox: '0 0 64 64',
    xmlns: 'http://www.w3.org/2000/svg',
    role: 'img',
  };
  // Render the arrange list section
  const mainZone = renderElement({
    tagName: 'div',
    className: 'arrangeList',
  });
  // Render and assemble the header
  const header = renderElement({
    tagName: 'h3',
    className: 'arrangeList-header',
    content: 'Task arrangement',
  });
  mainZone.appendChild(header);
  // Render and assemble the submit button
  const submitButtonEnv = renderElement({
    tagName: 'div',
    className: ['submit-button-env', 'dark-kit'],
  });
  const submitButton = renderElement({
    tagName: 'button',
    type: 'button',
    name: 'submit the arrangement',
    content: 'Submit',
  });
  submitButton.addEventListener('click', getArrange);
  submitButtonEnv.appendChild(submitButton);
  mainZone.appendChild(submitButtonEnv);
  // Prepare the todo list
  const flipEnv = document.querySelector('.flip-env');
  flipEnv.classList.add('flip');
  const workEnv = flipEnv.querySelector('.work-env');
  workEnv.appendChild(mainZone);
  if (!important) {
    const goBackButton = workEnv.querySelector('button.symptomatic');
    goBackButton.addEventListener('click', hideNode.bind(undefined, mainZone, 'flip', 800, true), { once: true, });
    mainZone.addEventListener('scroll', event => {
      if (event.target.scrollTop) {
        if (!goBackButton.classList.contains('hidden')) {
          hideNode(goBackButton, 'fade-type1', 300);
        }
      } else if (goBackButton.classList.contains('hidden')) {
        goBackButton.style.animationName = 'view-type1';
        goBackButton.classList.remove('hidden');
      }
    });
  }
  // Assemble and render the tasks
  let i = -1;
  const nodeListQuery = '.arrangeList .arrangeList-task';
  const viewLoop = setInterval(() => {
    if (i >= todayTasks.length) {
      clearInterval(viewLoop);
      // return i + 1;
    } else {
      i++;
    }
    // Render the task body
    const taskBody = renderElement({
      tagName: 'div',
      className: ['arrangeList-task', 'viewItems-fade'],
      idName: todayTasks[i].id,
      'data-pin': todayTasks[i].pin,
    });
    // Render and assemble the task header
    const taskHeader = renderElement({
      tagName: 'p',
      content: todayTasks[i].subject,
    });
    taskBody.appendChild(taskHeader);
    // Render and assemble the pin button
    const pinButton = renderElement({
      tagName: 'button',
      type: 'button',
      name: 'pin',
    });
    iconStd.className = todayTasks[i].pin ? ['pin', 'icon'] : 'icon';
    const pinSVG = renderElement(iconStd, iconStd.xmlns);
    iconStd.className = 'icon';
    const pinPath1 = renderElement({
      tagName: 'path',
      d: 'M2.6 61.4l24.2-24.2',
    }, iconStd.xmlns);
    const pinPath2 = renderElement({
      tagName: 'path',
      d: 'M43.1 45V33.7L53.7 23a5 5 0 0 0 6.3-.6l1.4-1.4L43.1 2.6 41.6 4a5 5 0 0 0-.6 6.3L30.3 20.9H19l-4.2 4.2 8.5 8.5 3 3 1 1 3 3 8.5 8.5z',
    }, iconStd.xmlns);
    pinSVG.appendChild(pinPath1);
    pinSVG.appendChild(pinPath2);
    pinButton.appendChild(pinSVG);
    pinButton.addEventListener('click', changePinStatus.bind(undefined, taskBody, nodeListQuery));
    taskBody.appendChild(pinButton);
    // Render the remaining time section
    const remainingTimeSec = renderElement({
      tagName: 'div',
      className: 'remaining-time',
    });
    const timerSVG = renderElement(iconStd, iconStd.xmlns);
    const timerPath1 = renderElement({
      tagName: 'path',
      d: 'M16 55c4 0 9.959-5.608 12.984-8a5.114 5.114 0 0 1 6.024-.016C38.057 49.355 44 55 48 55M20.084 26c8-3.205 14.6 3.65 24.121-.216',
    }, iconStd.xmlns);
    const timerPath2 = renderElement({
      tagName: 'path',
      d: 'M48 62V48.513a14 14 0 0 0-5.953-11.457l-5.527-3.881a1 1 0 0 1 0-1.637l5.526-3.881A14 14 0 0 0 48 16.2V2M16 2v14.2a14 14 0 0 0 5.954 11.457l5.526 3.881a1 1 0 0 1 0 1.637l-5.526 3.881A14 14 0 0 0 16 48.513V62m-3 0h38M13 2h38',
    }, iconStd.xmlns);
    const timerPath3 = renderElement({
      tagName: 'path',
      d: 'M27.816 32.77C30.687 33.5 31.833 37 32 37c.132 0 .867-3.383 4.095-4.7',
    }, iconStd.xmlns);
    const timerSpan = renderElement({
      tagName: 'span',
      content: `${todayTasks[i].timer}m`,
    });
    // Assemble the remaining time section
    timerSVG.appendChild(timerPath1);
    timerSVG.appendChild(timerPath2);
    timerSVG.appendChild(timerPath3);
    remainingTimeSec.appendChild(timerSVG);
    remainingTimeSec.appendChild(timerSpan);
    taskBody.appendChild(remainingTimeSec);
    // Render the navigate section
    const navigateSection = renderElement({
      tagName: 'div',
      className: 'arrangeList-navigate',
    });
    const navigateUpButton = renderElement({
      tagName: 'button',
      type: 'button',
      name: 'navigate up'
    });
    const navigateUpSVG = renderElement(iconStd, iconStd.xmlns);
    const navigateUpPath = renderElement({
      tagName: 'path',
      d: 'M55.5642 51.6231C54.7188 51.6239 53.8815 51.4577 53.1005 51.134C52.3195 50.8103 51.6101 50.3356 51.0131 49.737L31.9375 31.2087L12.9092 49.737C11.6951 50.9096 10.0691 51.5585 8.38126 51.5438C6.69345 51.5291 5.07892 50.8521 3.88541 49.6586C2.6919 48.4651 2.01491 46.8506 2.00024 45.1628C1.98558 43.475 2.63441 41.8489 3.807 40.6349L31.9375 13L60.1153 40.6349C61.0153 41.5351 61.6281 42.682 61.8764 43.9305C62.1246 45.179 61.9972 46.4731 61.5101 47.6492C61.023 48.8252 60.1981 49.8305 59.1398 50.5378C58.0814 51.2452 56.8371 51.6229 55.5642 51.6231V51.6231Z',
    }, iconStd.xmlns);
    const navigateDownButton = renderElement({
      tagName: 'button',
      type: 'button',
      name: 'navigate down',
    });
    const navigateDownSVG = renderElement(iconStd, iconStd.xmlns);
    const navigateDownPath = renderElement({
      tagName: 'path',
      d: 'M8.43582 13C9.28127 12.999 10.1186 13.1651 10.8996 13.4888C11.6807 13.8125 12.39 14.2874 12.9869 14.8861L32.0625 33.4166L51.0908 14.8861C52.3049 13.7135 53.9309 13.0647 55.6188 13.0793C57.3066 13.094 58.9211 13.771 60.1146 14.9645C61.3081 16.158 61.9851 17.7726 61.9998 19.4604C62.0144 21.1482 61.3656 22.7742 60.193 23.9883L32.0625 51.6232L3.88472 23.9883C2.98474 23.088 2.37188 21.9412 2.12362 20.6927C1.87535 19.4441 2.00282 18.15 2.48993 16.974C2.97703 15.7979 3.80189 14.7927 4.86023 14.0853C5.91856 13.378 7.16286 13.0003 8.43582 13V13Z',
    }, iconStd.xmlns);
    // Assemble the navigate section
    navigateUpSVG.appendChild(navigateUpPath);
    navigateUpButton.appendChild(navigateUpSVG);
    navigateDownSVG.appendChild(navigateDownPath);
    navigateDownButton.appendChild(navigateDownSVG);
    navigateSection.appendChild(navigateUpButton);
    navigateSection.appendChild(navigateDownButton);
    taskBody.appendChild(navigateSection);
    navigateDownButton.addEventListener('click', navigateDown.bind(undefined, taskBody, nodeListQuery));
    navigateUpButton.addEventListener('click', navigateUp.bind(undefined, taskBody, nodeListQuery));
    taskBody.style.order = i;
    mainZone.appendChild(taskBody);
    setTimeout(() => {
      taskBody.classList.add('viewItems-show');
      taskBody.classList.remove('viewItems-fade');
      setTimeout(() => {
        taskBody.classList.remove('viewItems-show');
      }, 100);
    }, 200);
    if (i + 1 >= todayTasks.length) {
      clearInterval(viewLoop);
    }
  }, 300);
}

function viewAllTasks() {
  // IDEA: vqti mizne ro task hay ayande mal ona ro hm nshon bde
  console.log('viewAllTasks');
}

function insertTask(newTask) {
  // Verify argument
  if (newTask.constructor !== ToDoItem) {
    throw new TypeError('The new task does not a todo object');
  }
  // Main code
  const todoListDiv = document.querySelector('.todo-list:first-child');
  const todayArrange = userSetting('todayArrange');
  const tasksIdList = Object.keys(todayArrange);
  if (!tasksIdList.length) {
    // There is no task
    const nothingToDoZone = todoListDiv.querySelector('.nothing-to-do');
    todoListDiv.removeChild(nothingToDoZone);
    todoListDiv.classList.remove('single-content-mode');
    viewItems([newTask]);
    todayArrange[newTask.id] = {
      pin: newTask.pin,
      timer: newTask.timer,
      order: 0,
      rootObject: newTask,
    };
    userSetting('todayArrange', todayArrange);
    return newTask;
  }
  const sortedTaskList = new Array(tasksIdList.length);
  let idKey;
  for (idKey of tasksIdList) {
    const targetObject = todayArrange[idKey];
    sortedTaskList[targetObject.order] = targetObject;
  }
  // The nodes before than the "boundTask" are pinned
  const boundTask = sortedTaskList.find(targetObject => !targetObject.pin);
  const boundTaskIndex = boundTask === -1 ? null : boundTask.order;
  const showMoreButton = todoListDiv.querySelector('.disregard-button');
  let newTaskOrder = !newTask.pin || boundTaskIndex === null ? sortedTaskList.length : boundTaskIndex;
  if (newTask.pin && boundTaskIndex !== null && boundTaskIndex < 3) {
    const newTaskUI = renderTodoItem(newTask);
    newTaskUI.style.order = newTaskOrder;
    const nodeList = document.querySelectorAll('.todo-list:first-child > .tasks');
    let boundNode = nodeList.find(node => parseInt(getComputedStyle(node).order) === newTaskOrder);
    if (boundNode?.classList?.contains('active')) {
      // Bound task is active and we can't do anything to it
      // Insert the task before the node that before the bound node
      newTaskOrder++;
      boundNode = nodeList.find(node => parseInt(getComputedStyle(node).order) === newTaskOrder);
      todoListDiv.insertBefore(newTaskUI, boundNode === -1 ? showMoreButton : boundNode);
      let i;
      for (i = 1; i < sortedTaskList.length; i++) {
        todayArrange[sortedTaskList[i].rootObject.id].order++;
      }
    } else {
      if (nodeList.length >= 3) {
        todoListDiv.replaceChild(newTaskUI, boundNode);
      } else {
        todoListDiv.insertBefore(newTaskUI, boundNode);
      }
      let i;
      for (i = 0; i < sortedTaskList.length; i++) {
        todayArrange[sortedTaskList[i].rootObject.id].order++;
      }
    }
    // WARNING: fk knm inja byd bishtr az 3 bzrm
    if (sortedTaskList.length === 3) {
      todoListDiv.removeChild(nodeList[nodeList.length - 1]);
      const viewMoreButton = renderElement({
        tagName: 'button',
        name: 'view more',
        className: 'disregard-button',
        content: 'View all today tasks',
      });
      viewMoreButton.addEventListener('click', viewAllTasks);
      todoListDiv.appendChild(viewMoreButton);
    }
  }
  todayArrange[newTask.id] = {
    pin: newTask.pin,
    timer: newTask.timer,
    order: newTaskOrder,
    rootObject: newTask,
  };
  userSetting('todayArrange', todayArrange);
}

function addTaskTo(date) {
  // Verify argument
  if (typeof date !== 'string') {
    throw new TypeError(`${date} is invalid argument`);
  } else if (date) {
    if (!new Date(date).getTime()) {
      throw new RangeError('Invalid date');
    } else {
      const _date = new Date(date).getTime();
      const now = new Date(_Date('en-US')).getTime();
      if (_date < now) {
        throw new RangeError('This date is over');
      }
    }
  }
  // Get execute permission
  if (!workEnvPermission('addTaskEnv')) {
    const flipEnv = document.querySelector('.flip-env');
    if (flipEnv.classList.contains('flip')) {
      const addTaskEnv = document.querySelector('.flip-env > .flip-env-inner > .work-env > .add-task-env');
      hideNode(addTaskEnv, 'flip', 800);
    }
    // When call "workEnvPermission" without any argument, it clear the work environment
    workEnvPermission();
    return;
  }
  // Main code
  const flipEnv = document.querySelector('.flip-env');
  const addTaskEnv = flipEnv.querySelector('.work-env > .add-task-env');
  flipEnv.classList.add('flip');
  addTaskEnv.classList.remove('hidden');
  const targetDate = addTaskEnv.querySelector('p');
  targetDate.innerText = `Target date: ${date}`;
  const targetDateWeekday = new Date(date).getDay();
  // Role of elements by index: [0-6]pattern | 7-pin
  const formCheckboxes = addTaskEnv.querySelectorAll('.add-task-form > .vertical-list > li > .options > li > label > input[type = "checkbox"]');
  let i;
  for (i = 0; i < formCheckboxes.length; i++) {
    if (i === targetDateWeekday) {
      formCheckboxes[i].checked = true;
      formCheckboxes[i].setAttribute('disabled', '');
    } else {
      formCheckboxes[i].removeAttribute('disabled');
    }
  }

  const backButton = flipEnv.querySelector('.work-env > button.symptomatic');
  backButton.addEventListener('click', hideNode.bind(undefined, addTaskEnv, 'flip', 300, false), { once: true, });
  const submitButton = addTaskEnv.querySelector('.add-task-form > button');
  submitButton.addEventListener('click', () => {
    // Role of elements by index: 0-subject | 1-timer | 2-scheduled days
    const formInputs = addTaskEnv.querySelectorAll('.add-task-form > .vertical-list > li > input');
    const newTask = {
      subject: null,
      timer: null,
      scheduledDays: null,
      pattern: [],
      startDate: date,
      pin: null,
      description: null,
    }
    let isValid = true;
    if (formInputs[0].value) {
      newTask.subject = formInputs[0].value;
    } else {
      formInputs[0].classList.add('warning');
      formInputs[0].addEventListener('change', () => {
        formInputs[0].classList.remove('warning');
      }, { once: true, });
      isValid = false;
    }

    if (Number(formInputs[1].value) > 0) {
      newTask.timer = parseInt(formInputs[1].value);
    } else {
      formInputs[1].classList.add('warning');
      formInputs[1].addEventListener('change', () => {
        formInputs[1].classList.remove('warning');
      }, { once: true, });
      isValid = false;
    }

    if (Number(formInputs[2].value) >= 0) {
      newTask.scheduledDays = parseInt(formInputs[2].value);
    } else {
      formInputs[2].classList.add('warning');
      formInputs[2].addEventListener('change', () => {
        formInputs[2].classList.remove('warning');
      }, { once: true, });
      isValid = false;
    }

    newTask.description = addTaskEnv.querySelector('.add-task-form > .vertical-list > li > textarea').value;

    for (i = 0; i < 7; i++) {
      formCheckboxes[i].checked ? newTask.pattern.push(i) : undefined;
    }
    if (!newTask.pattern.includes(targetDateWeekday)) {
      newTask.pattern.push(targetDateWeekday);
    }

    newTask.pin = formCheckboxes[7].checked ? true : false;

    if (isValid) {
      const newTaskAdded = new ToDoItem(newTask.subject, newTask.timer, newTask.scheduledDays, newTask.pattern,
      newTask.startDate, newTask.pin, newTask.description);
      newTaskAdded.then(response => {
        insertTask(response[0]);
        hideNode(addTaskEnv, 'flip', 300);
        console.info('Done!');
      }).catch(exception => {
        // FIXME: inja fk nknm etfaqi biofte (chon hmchi dige standard shde)
        console.error(exception);
      });
    }
  });
}

function hideNode(targetNode, animationType, delay = 0, kill = false, slain = targetNode) {
  // Verify arguments
  switch (true) {
    case !isElement(targetNode):
      throw new TypeError('The \"targetNode\" argument is not node object');
    case animationType !== 'flip' && animationType !== 'fade-type1':
      throw new RangeError('The animation type is undefined');
    case typeof delay !== 'number':
      throw new TypeError('The delay time is not number');
    case typeof kill !== 'boolean':
      kill = false;
      break;
    case !isElement(slain):
      slain = targetNode;
      break;
  }
  // Main code
  switch (animationType) {
    case 'fade-type1':
      targetNode.style.animationName = animationType;
      break;
    case 'flip':
      let flipNode = targetNode;
      while (!flipNode.classList.contains('flip')) {
        flipNode = flipNode.parentNode;
      }
      flipNode.classList.remove('flip');
      break;
  }
  const _setTimeout = setInterval(() => {
    if (kill) {
      slain.parentNode.removeChild(slain);
    } else {
      slain.classList.add('hidden');
    }
    clearInterval(_setTimeout);
  }, delay);
}

function viewPlan() {
  // Get execute permission
  if (!workEnvPermission('planEnv')) {
    const flipEnv = document.querySelector('.flip-env');
    if (flipEnv.classList.contains('flip')) {
      const planEnv = document.querySelector('.flip-env > .flip-env-inner > .work-env > .viewPlan');
      hideNode(planEnv, 'flip', 800, true);
    }
    // When call "workEnvPermission" without any argument, it clear the work environment
    workEnvPermission();
    return;
  }
  // Inner functions
  function standardize(yearInput, monthInput, dayInput) {
    yearInput.setAttribute('type', 'number');
    yearInput.setAttribute('min', today[0]);
    monthInput.setAttribute('type', 'number');
    monthInput.setAttribute('max', 12);
    dayInput.setAttribute('type', 'number');
    if (Number(today[0]) === yearInput.valueAsNumber) {
      monthInput.setAttribute('min', today[1]);
      dayInput.setAttribute('min', monthInput.valueAsNumber === Number(today[1]) ? today[2] : 1);
    } else if (Number(today[0]) < yearInput.valueAsNumber) {
      monthInput.setAttribute('min', 1);
      dayInput.setAttribute('min', 1);
    }
    if (yearInput.valueAsNumber && yearInput.validity.valid
      && monthInput.valueAsNumber && monthInput.validity.valid) {
      switch (monthInput.valueAsNumber) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          dayInput.setAttribute('max', 31);
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          dayInput.setAttribute('max', 30);
          break;
        case 2:
          dayInput.setAttribute('max', Number(today[0]) % 4 ? 28 : 29);
          break;
      }
    }
  }

  function findTargetDate(yearInput, monthInput, dayInput) {
    standardize(yearInput, monthInput, dayInput);
    if (!yearInput.validity.valid || !monthInput.validity.valid || !dayInput.validity.valid) {
      console.warn('!');
      return;
    }
    console.log('ok');
    const year = yearInput.valueAsNumber ? parseInt(yearInput.valueAsNumber) : Number(_Date('en-US').split('/')[0]);
    const dateList = [];
    let i;
    switch (true) {
      case !Boolean(dayInput.valueAsNumber) && Boolean(monthInput.valueAsNumber):
        // Show all days with specific month
        const days = parseInt(dayInput.getAttribute('max'));
        const month = monthInput.valueAsNumber * 10 >= 100 ? parseInt(monthInput.valueAsNumber) : ('0' + monthInput.valueAsNumber);
        for (i = parseInt(dayInput.getAttribute('min')); i <= days; i++) {
          if (i < 10) {
            dateList.push(`${year}/${month}/0${i}`);
          } else {
            dateList.push(`${year}/${month}/${i}`);
          }
        }
        break;
      case !Boolean(monthInput.valueAsNumber) && Boolean(dayInput.valueAsNumber):
        // Show all months with specific day
        const months = parseInt(monthInput.getAttribute('max'));
        const day = dayInput.valueAsNumber * 10 >= 100 ? parseInt(dayInput.valueAsNumber) : ('0' + dayInput.valueAsNumber);
        for (i = parseInt(monthInput.getAttribute('min')); i <= months; i++) {
          if (i < 10) {
            dateList.push(`${year}/0${i}/${day}`);
          } else {
            dateList.push(`${year}/${i}/${day}`);
          }
        }
        break;
      case Boolean(monthInput.valueAsNumber) && Boolean(dayInput.valueAsNumber):
        const _day = dayInput.valueAsNumber * 10 >= 100 ? parseInt(dayInput.valueAsNumber) : ('0' + dayInput.valueAsNumber);
        const _month = monthInput.valueAsNumber * 10 >= 100 ? parseInt(monthInput.valueAsNumber) : ('0' + dayInput.valueAsNumber);
        dateList.push(`${year}/${_month}/${_day}`);
        break;
      default:
        console.log('oops');
        return;
    }
    let element;
    const prevDateNodeList = document.querySelectorAll('.flip-env-inner > .work-env > .viewPlan > .item');
    for (element of prevDateNodeList) {
      hideNode(element, 'fade-type1', 300);
    }
    const dateListObjectReq = [];
    const newDateNodeList = [];
    for (element of dateList) {
      dateListObjectReq.push(Day.getDate(element));
      const item = renderElement({
        tagName: 'div',
        className: 'item',
      });
      const itemDate = renderElement({
        tagName: 'h5',
        className: 'viewPlan-header',
        content: element,
      });
      item.appendChild(itemDate);
      let iw;
      switch (new Date(element).getDay()) {
        case 0:
          iw = 'Sunday';
          break;
        case 1:
          iw = 'Monday';
          break;
        case 2:
          iw = 'Tuesday';
          break;
        case 3:
          iw = 'Wednesday';
          break;
        case 4:
          iw = 'Thursday';
          break;
        case 5:
          iw = 'Friday';
          break;
        case 6:
          iw = 'Saturday';
          break;
      }
      const itemWeekday = renderElement({
        tagName: 'p',
        className: 'viewPlan-header',
        content: iw,
      });
      item.appendChild(itemWeekday);
      const taskLabel = renderElement({
        tagName: 'div',
        className: 'label',
      });
      const taskLabelSpan = renderElement({
        tagName: 'span',
        content: 'Tasks',
      });
      const taskLabelIcon = renderElement(iconStd, iconStd.xmlns);
      const taskLabelIconPath1 = renderElement({
        tagName: 'path',
        d: 'M50 46V10a8 8 0 0 0-8-8H9.2c4.4 0 6.8 3.6 6.8 8v44a8 8 0 0 0 8 8',
      }, iconStd.xmlns);
      const taskLabelIconPath2 = renderElement({
        tagName: 'path',
        d: 'M54 46H24a8 8 0 0 1 0 16h30a8 8 0 0 0 0-16zM9.2 2C4.8 2 2 5.6 2 10h14',
      }, iconStd.xmlns);
      const taskLabelIconPath3 = renderElement({
        tagName: 'path',
        d: 'M26 14h14M26 24h14M26 34h14',
      }, iconStd.xmlns);
      const tasksSpan = renderElement({
        tagName: 'span',
        content: '-',
      });
      taskLabelIcon.appendChild(taskLabelIconPath1);
      taskLabelIcon.appendChild(taskLabelIconPath2);
      taskLabelIcon.appendChild(taskLabelIconPath3);
      taskLabel.appendChild(taskLabelIcon);
      taskLabel.appendChild(taskLabelSpan);
      item.appendChild(taskLabel);
      item.appendChild(tasksSpan);
      newDateNodeList.push(item);
    }
    Promise.all(dateListObjectReq).then(dateListObject => {
      setTimeout(() => {
        for (i = 0; i < dateListObject.length; i++) {
          const taskBlank = newDateNodeList[i].lastChild;
          taskBlank.innerText = dateListObject[i].tasks;
          planEnv.appendChild(newDateNodeList[i]);
          newDateNodeList[i].addEventListener('click', addTaskTo.bind(undefined, dateListObject[i].date));
        }
      }, 400);
    });
  }
  // Main code
  const iconStd = {
    tagName: 'svg',
    className: 'icon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 64 64',
    role: 'img',
  };
  const flipEnv = document.querySelector('.flip-env');
  const workEnv = flipEnv.querySelector('.work-env');
  const goBackButton = workEnv.querySelector('button.symptomatic[name = "back"]');
  const planEnv = renderElement({
    tagName: 'div',
    className: 'viewPlan',
  });
  goBackButton.addEventListener('click', hideNode.bind(undefined, planEnv, 'flip', 800, true), { once: true, });
  planEnv.addEventListener('scroll', event => {
    if (event.target.scrollTop > 45) {
      if (!goBackButton.classList.contains('hidden')) {
        hideNode(goBackButton, 'fade-type1', 300);
      }
    } else if (goBackButton.classList.contains('hidden')) {
      goBackButton.style.animationName = 'view-type1';
      goBackButton.classList.remove('hidden');
    }
  });
  workEnv.appendChild(planEnv);
  const header = renderElement({
    tagName: 'h3',
    className: 'viewPlan-header',
    content: 'Schedule',
  });
  planEnv.appendChild(header);
  const searchBox = renderElement({
    tagName: 'div',
    className: ['searchBox', 'red-kit'],
  });
  planEnv.appendChild(searchBox);
  const datePick = renderElement({
    tagName: 'div',
    className: 'datePick',
  });
  const today = _Date('en-US').split('/');
  const yearPickInput = renderElement({
    tagName: 'input',
    type: 'number',
    name: 'year',
    value: today[0],
    min: today[0],
    placeholder: 'yyyy',
  });
  const monthPickInput = renderElement({
    tagName: 'input',
    type: 'number',
    name: 'month',
    min: today[1],
    max: 12,
    placeholder: 'mm',
  });
  const dayPickInput = renderElement({
    tagName: 'input',
    type: 'number',
    name: 'day',
    min: today[2],
    max: 31,
    placeholder: 'dd',
  });
  yearPickInput.addEventListener('change', standardize.bind(undefined, yearPickInput, monthPickInput, dayPickInput));
  monthPickInput.addEventListener('change', standardize.bind(undefined, yearPickInput, monthPickInput, dayPickInput));
  datePick.appendChild(yearPickInput);
  datePick.appendChild(monthPickInput);
  datePick.appendChild(dayPickInput);
  let child;
  for (child of datePick.children) {
    child.addEventListener('focus', () => datePick.classList.add('focus'));
    child.addEventListener('focusout', () => datePick.classList.remove('focus'));
  }
  monthPickInput.insertAdjacentText('beforebegin', '/');
  monthPickInput.insertAdjacentText('afterend', '/');
  searchBox.appendChild(datePick);
  const searchSubmitButton = renderElement({
    tagName: 'button',
    name: 'search submit',
  });
  const searchIcon = renderElement(iconStd, iconStd.xmlns);
  const searchIconPath1 = renderElement({
    tagName: 'path',
    d: 'M42.098 36.855L58.12 52.879a3 3 0 1 1-4.242 4.242L37.855 41.098',
  }, iconStd.xmlns);
  const searchIconPath2 = renderElement({
    tagName: 'path',
    d: 'M26 46a20 20 0 1 1 20-20 20.022 20.022 0 0 1-20 20z',
  }, iconStd.xmlns);
  const searchIconPath3 = renderElement({
    tagName: 'path',
    d: 'M26 11a15 15 0 1 0 15 15 15.016 15.016 0 0 0-15-15z',
  }, iconStd.xmlns);
  searchIcon.appendChild(searchIconPath1);
  searchIcon.appendChild(searchIconPath2);
  searchIcon.appendChild(searchIconPath3);
  searchSubmitButton.appendChild(searchIcon);
  searchSubmitButton.addEventListener('click', findTargetDate.bind(undefined, yearPickInput, monthPickInput, dayPickInput));
  searchBox.appendChild(searchSubmitButton);
  flipEnv.classList.add('flip');
  const nextWeekListReq = [];
  const nextWeekNodeList = [];
  let i;
  for (i = 1; i <= 7; i++) {
    const targetDate = calculateFewDaysBeforeOrAfter(i, 'after');
    nextWeekListReq.push(Day.getDate(targetDate));
    const item = renderElement({
      tagName: 'div',
      className: 'item',
    });
    const itemDate = renderElement({
      tagName: 'h5',
      className: 'viewPlan-header',
      content: targetDate,
    });
    item.appendChild(itemDate);
    let iw;
    switch (new Date(targetDate).getDay()) {
      case 0:
        iw = 'Sunday';
        break;
      case 1:
        iw = 'Monday';
        break;
      case 2:
        iw = 'Tuesday';
        break;
      case 3:
        iw = 'Wednesday';
        break;
      case 4:
        iw = 'Thursday';
        break;
      case 5:
        iw = 'Friday';
        break;
      case 6:
        iw = 'Saturday';
        break;
    }
    const itemWeekday = renderElement({
      tagName: 'p',
      className: 'viewPlan-header',
      content: iw,
    });
    item.appendChild(itemWeekday);
    const taskLabel = renderElement({
      tagName: 'div',
      className: 'label',
    });
    const taskLabelSpan = renderElement({
      tagName: 'span',
      content: 'Tasks',
    });
    const taskLabelIcon = renderElement(iconStd, iconStd.xmlns);
    const taskLabelIconPath1 = renderElement({
      tagName: 'path',
      d: 'M50 46V10a8 8 0 0 0-8-8H9.2c4.4 0 6.8 3.6 6.8 8v44a8 8 0 0 0 8 8',
    }, iconStd.xmlns);
    const taskLabelIconPath2 = renderElement({
      tagName: 'path',
      d: 'M54 46H24a8 8 0 0 1 0 16h30a8 8 0 0 0 0-16zM9.2 2C4.8 2 2 5.6 2 10h14',
    }, iconStd.xmlns);
    const taskLabelIconPath3 = renderElement({
      tagName: 'path',
      d: 'M26 14h14M26 24h14M26 34h14',
    }, iconStd.xmlns);
    const tasksSpan = renderElement({
      tagName: 'span',
      content: '-',
    });
    taskLabelIcon.appendChild(taskLabelIconPath1);
    taskLabelIcon.appendChild(taskLabelIconPath2);
    taskLabelIcon.appendChild(taskLabelIconPath3);
    taskLabel.appendChild(taskLabelIcon);
    taskLabel.appendChild(taskLabelSpan);
    item.appendChild(taskLabel);
    item.appendChild(tasksSpan);
    nextWeekNodeList.push(item);
  }
  Promise.all(nextWeekListReq).then(nextWeekList => {
    setTimeout(() => {
      for (i = 0; i < nextWeekList.length; i++) {
        const taskBlank = nextWeekNodeList[i].lastChild;
        taskBlank.innerText = nextWeekList[i].tasks;
        planEnv.appendChild(nextWeekNodeList[i]);
        nextWeekNodeList[i].addEventListener('click', addTaskTo.bind(undefined, nextWeekList[i].date));
      }
    }, 400);
  });
}

function viewSetting() {
  // Get execute permission
  if (!workEnvPermission('settingEnv')) {
    const flipEnv = document.querySelector('.flip-env');
    if (flipEnv.classList.contains('flip')) {
      const settingEnv = document.querySelector('.flip-env > .flip-env-inner > .work-env > .setting-env');
      hideNode(settingEnv, 'flip', 800, true);
    }
    // When call "workEnvPermission" without any argument, it clear the work environment
    workEnvPermission();
    return;
  }
  // Main code
  const flipEnv = document.querySelector('.flip-env');
  const settingEnv = flipEnv.querySelector('.work-env > .setting-env');
  const goBackButton = flipEnv.querySelector('.work-env > button.symptomatic[name="back"]');
  goBackButton.querySelector('svg.icon.full').setAttribute('data-them', 'white');
  goBackButton.addEventListener('click', () => {
    hideNode(settingEnv, 'flip', 300);
    goBackButton.querySelector('svg.icon.full').setAttribute('data-them', 'dark');
  }, { once: true, });
  settingEnv.classList.remove('hidden');
  const autoArrange = userSetting('autoArrange');
  const timeFormat = userSetting('timeFormat');
  const autoArrangeNodeList = settingEnv.querySelectorAll('ul.vertical-list > li > ul.options > li > label > input[type="radio"][name="auto-arrange"]');
  const timeFormatNodeList = settingEnv.querySelectorAll('ul.vertical-list > li > ul.options > li > label > input[type="radio"][name="time-format"]');
  autoArrangeNodeList[0].checked = autoArrange ? autoArrange : autoArrange;
  autoArrangeNodeList[1].checked = !autoArrange ? !autoArrange : !autoArrange;
  timeFormatNodeList[0].checked = timeFormat === 'mm' ? true : false;
  timeFormatNodeList[1].checked = timeFormat === 'mm' ? false : true;
  const submitButton = settingEnv.querySelector('button[data-them]');
  // REVIEW: inja byd ya removeEventListener knim ya auto arrange ba time format ro let knim k besh hr dfe avaz krd
  submitButton.addEventListener('click', () => {
    console.log('exe');
    if ((autoArrange && autoArrangeNodeList[1].checked) || (!autoArrange && autoArrangeNodeList[0].checked)) {
      userSetting('autoArrange', !autoArrange);
      console.log('auto-arrange');
    }
    if ((timeFormat === 'mm' && timeFormatNodeList[1].checked) || (timeFormat === 'mm:ss' && timeFormatNodeList[0].checked)) {
      userSetting('timeFormat', timeFormat === 'mm' ? 'mm:ss' : 'mm');
      console.log('time-format');
    }
    goBackButton.querySelector('svg.icon.full').setAttribute('data-them', 'dark');
    hideNode(settingEnv, 'flip', 300);
  }, { once: true, });
  flipEnv.classList.add('flip');
}
