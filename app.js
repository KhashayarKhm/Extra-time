// WARNING: test nshde kml (hno ja dre)
function determineTaskStatus(tasks, targetDate, clear = false) {
  // Verify argument
  if (tasks.constructor === Array) {
    let task;
    for (task of tasks) {
      switch (true) {
        case task.constructor !== Object:
          throw new TypeError('Task list contains an invalid value');
        case typeof task.order !== 'number':
          throw new TypeError('Task order is undefined');
        case task.order < 0 || !Number.isInteger(task.order):
          throw new RangeError('Task order should be an integer and non-negative number');
        case typeof task.pin !== 'boolean':
          throw new TypeError('Task pin is undefined');
        case task.rootObject?.constructor !== Object:
          throw new TypeError('Task root object is undefined');
      }
    }
  } else {
    throw new TypeError('Task list should be an array');
  }
  if (typeof targetDate !== 'string') {
    throw new TypeError('Target date is undefined');
  } else {
    if (!new Date(targetDate).getTime()) {
      throw new RangeError('Invalid date');
    } else {
      const _targetDate = new Date(targetDate).getTime();
      const now = new Date(_Date('en-US')).getTime();
      if (_targetDate > now) {
        throw new RangeError('This date is out of range');
      }
    }
  }
  clear = typeof clear === 'boolean' ? clear : false;
  tasks = tasks.sort(sortTasks);
  // Main code
  const messageEnv = renderElement({
    tagName: 'div',
    className: 'message-env',
  });
  document.body.appendChild(messageEnv);
  const taskStatusMessage = renderElement({
    tagName: 'div',
    className: ['message', 'remove-task'],
  });
  messageEnv.appendChild(taskStatusMessage);
  const messageText = renderElement({
    tagName: 'p',
    content: 'Which tasks do you done?',
  });
  taskStatusMessage.appendChild(messageText);
  let taskObject;
  const taskList = Object.values(tasks).sort(sortTasks);
  const taskNodeList = [];
  const taskStatusList = [];
  for (taskObject of taskList) {
    const taskBody = renderElement({
      tagName: 'div',
      className: 'undefinedTaskStatus',
      idName: taskObject.rootObject.id,
    });
    taskStatusMessage.appendChild(taskBody);
    const taskSubject = renderElement({
      tagName: 'span',
      content: taskObject.rootObject.subject,
    });
    taskBody.appendChild(taskSubject);
    const taskStatusIcon = renderElement({
      tagName: 'svg',
      className: 'icon',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 64 64',
      role: 'img',
      'data-them': 'yellow',
    }, 'http://www.w3.org/2000/svg');
    const iconCircle = renderElement({
      tagName: 'circle',
      cx: 32,
      cy: 32,
      r: 30,
      transform: 'rotate(-45 32 32)',
    }, 'http://www.w3.org/2000/svg');
    const iconPath = renderElement({
      tagName: 'path',
      d: 'M42.999 21.001l-22 22m22 0L21 21',
    }, 'http://www.w3.org/2000/svg');
    taskStatusIcon.appendChild(iconCircle);
    taskStatusIcon.appendChild(iconPath);
    taskBody.appendChild(taskStatusIcon);
    taskNodeList.push(taskBody);
    taskBody.addEventListener('click', changeStatus);
    taskStatusList.push(false);
  }
  const submitButton = renderElement({
    tagName: 'button',
    type: 'button',
    name: 'submit tasks status',
    content: 'Submit',
    'data-them': 'yellow',
  });
  taskStatusMessage.appendChild(submitButton);
  // Inner function
  function changeStatus(event) {
    let targetTaskNode = event.target;
    while (targetTaskNode.tagName !== 'div' && !targetTaskNode.classList.contains('undefinedTaskStatus')) {
      targetTaskNode = targetTaskNode.parentNode;
    }
    const targetTaskNodeIndex = taskNodeList.findIndex(node => targetTaskNode.isSameNode(node));
    taskStatusList[targetTaskNodeIndex] = !taskStatusList[targetTaskNodeIndex];
    const targetTaskNodeIcon = targetTaskNode.querySelector('svg.icon');
    const targetTaskNodeIconPath = targetTaskNodeIcon.querySelector('path');
    if (taskStatusList[targetTaskNodeIndex]) {
      targetTaskNode.classList.add('done');
      targetTaskNodeIcon.setAttribute('data-them', 'dark');
      targetTaskNodeIconPath.setAttribute('d', 'M20.998 32.015l8.992 8.992 16.011-16.011');
    } else {
      targetTaskNode.classList.remove('done');
      targetTaskNodeIcon.setAttribute('data-them', 'yellow');
      targetTaskNodeIconPath.setAttribute('d', 'M42.999 21.001l-22 22m22 0L21 21');
    }
  }

  function submitStatus() {
    const targetDateObjectReq = new Day(targetDate);
    targetDateObjectReq.then(targetDateObject => {
      const requests = [], length = taskNodeList.length;
      let i;
      for (i = 0; i < length; i++) {
        const targetTask = tasks.find(task => task.rootObject.id === taskNodeList[i].id);
        if (targetTask !== -1) {
          requests.push(taskStatusList[i] ? targetDateObject.doneTask(targetTask.rootObject.id) : targetDateObject.loseTask(targetTask.rootObject.id));
        } else {
          Promise.reject('The target task node does not match with task objects');
        }
      }
      Promise.all(requests).then(response => {
        // TODO: byd check knim taski k tmom shde delete she
        if (clear) {
          Day.memorize();
          Day.delete();
          localStorage.setItem('lastSeen', _Date('en-US'));
          arrangeList(true);
        } else {

        }
      });
    });
    hideNode(taskStatusMessage, 'fade-type1', 300, true, messageEnv);
  }
  // Events
  submitButton.addEventListener('click', submitStatus);
}

function activateTask() {
  // Verify the task
  const runningTask = localStorage.getItem('runningTask');
  let runningTaskValidity = runningTask && typeof runningTask.id === 'string' && typeof runningTask.startTime === 'number' ? true : false;
  const todayArrange = Object.entries(userSetting('todayArrange'));
  let firstTaskObject = todayArrange[0][1];
  let item;
  for (item of todayArrange) {
    if (item[1].order < firstTaskObject.order) {
      firstTaskObject = item[1];
    }
  }
  const tasksNode = document.querySelectorAll('.flip-env-inner > .todo-list > .task');
  const firstTaskNode = tasksNode[0];
  if (!firstTaskNode) {
    throw new ReferenceError('There is no task shown');
  } else if (firstTaskNode.classList.contains('active')) {
    console.info('Task is running');
    return;
  } else if (firstTaskObject.rootObject.id !== firstTaskNode.getAttribute('id')) {
    throw new RangeError('The ids do not match');
  } else if (firstTaskNode.rootObject.id !== runningTask.id || new Date().getTime() < runningTask.startTime) {
    runningTaskValidity = false;
    /* REVIEW: condition hmin if ro paiin vas timer ha bzrm k baqish ro brn o bd inke tmom shd byd runningTask ro brdrm
    inja hr moqe start ye taski khord toy localStorage zakhirash knm */
  }
  // Main code
  firstTaskNode.classList.remove('inactive');
  firstTaskNode.classList.add('active');
  const timeFormat = userSetting('timeFormat');
  const taskTimerNode = firstTaskNode.querySelector('.remaining-time > span');
  const fulfilledTaskTime = runningTaskValidity ? new Date().getTime() - runningTask.startTime / 60000 : 0;
  let minutes;
  if (fulfilledTaskTime >= firstTaskObject.timer) {
    determineTaskStatus([firstTaskObject], _Date('en-US'));
    if (tasksNode.length > 1) {
      const activateButton = document.querySelector('.flip-env-inner > .todo-list > .todo-list-header > button.symptomatic[name = "start task"]');
      activateButton.addEventListener('click', activateTask);
    }
    return;
  } else if (fulfilledTaskTime <= 0) {
    minutes = firstTaskObject.timer;
    const taskObject = {
      id: firstTaskObject.rootObject.id,
      startTime: new Date().getTime(),
    };
    localStorage.setItem('runningTask', JSON.stringify(taskObject));
  } else {
    minutes = parseInt(fulfilledTaskTime);
  }
  if (timeFormat) {
    const timer = setInterval(() => {
      if (minutes < 0) {
        console.log('finished');
        clearInterval(timer);
      } else {
        taskTimerNode.innerText = `${minutes--}m`;
      }
    }, 60000);
  } else {
    let seconds = 60;
    const timerS = setInterval(() => {
      taskTimerNode.innerText = `${minutes}:${seconds--}`;
    }, 1000);
    const timerM = setInterval(() => {
      if (minutes < 0) {
        console.log('finished');
        clearInterval(timerS);
        clearInterval(timerM);
      } else {
        taskTimerNode.innerText = `${minutes--}:${seconds--}`;
        seconds = 60;
      }
    }, 60000);
  }
}

function workEnvPermission(watchEnv) {
  const workEnv = document.querySelector('.flip-env > .flip-env-inner > .work-env');
  const addTaskEnv = workEnv.querySelector('div.add-task-env');
  const settingEnv = workEnv.querySelector('div.setting-env');
  const arrangeListEnv = workEnv.querySelector('div.arrangeList');
  const planEnv = workEnv.querySelector('div.viewPlan');
  const backButton = workEnv.querySelector('button.symptomatic');
  let child, permission = true;
  for (child of workEnv.children) {
    switch (true) {
      case addTaskEnv.isSameNode(child):
        if (watchEnv === 'addTaskEnv' && !addTaskEnv.classList.contains('hidden')) {
          permission = false;
        } else {
          // The node was connected by mistake
          addTaskEnv.classList.add('hidden');
        }
        break;
      case settingEnv.isSameNode(child):
        if (watchEnv === 'settingEnv' && !settingEnv.classList.contains('hidden')) {
          permission = false;
        } else {
          // The node was connected by mistake
          settingEnv.classList.add('hidden');
        }
        break;
      case !!arrangeListEnv && arrangeListEnv.isSameNode(child):
        if (watchEnv === 'arrangeListEnv') {
          permission = false;
        } else {
          // The node was connected by mistake
          workEnv.removeChild(arrangeListEnv);
        }
        break;
      case !!planEnv && planEnv.isSameNode(child):
        if (watchEnv === 'planEnv') {
          permission = false;
        } else {
          // The node was connected by mistake
          workEnv.removeChild(planEnv);
        }
        break;
      case backButton.isSameNode(child):
        if (watchEnv !== 'addTaskEnv' && watchEnv !== 'settingEnv'
        && watchEnv !== 'arrangeListEnv' && watchEnv !== 'planEnv') {
          backButton.classList.add('hidden');
        } else {
          backButton.classList.remove('hidden');
        }
        break;
      default:
        workEnv.removeChild(child);
    }
  }

  return permission;
}

(function() {
  /* Check the setting*/
  userSetting();

  /* Fill the overview table */
  (() => {
    const getDaysDataRequests = [];
    let i;
    for (i = -2; i < 3; i++) {
      let targetDate;
      switch (true) {
        case i > 0:
          targetDate = calculateFewDaysBeforeOrAfter(i, 'after');
          getDaysDataRequests.push(Day.getDate(targetDate));
          break;
        case i < 0:
          targetDate = calculateFewDaysBeforeOrAfter(-i, 'before');
          getDaysDataRequests.push(Day.getDate(targetDate));
          break;
        default:
          // i === 0
          targetDate = _Date('en-US');
          getDaysDataRequests.push(Day.getDate(targetDate));
      }
    }
    const updateProcess = Promise.all(getDaysDataRequests);
    updateProcess.then(dateObjects => {
      const tableCells = [...document.querySelectorAll('.overview > article > .past-days'),
      document.querySelector('.overview > article > .today'),
      ...document.querySelectorAll('.overview > article > .next-days'),];
      let i;
      for (i = 0; i < 5; i++) {
        const blanks = [tableCells[i].querySelector('h4'), ...tableCells[i].querySelectorAll('ul > li > span'), tableCells[i].querySelector('p.h4')];
        blanks[0].innerHTML = dateObjects[i].date.slice(5);
        blanks[1].innerHTML = dateObjects[i].tasks;
        if (i === 2) {
          // For today
          blanks[2].innerHTML = dateObjects[i].doneTasks;
          blanks[3].innerHTML = dateObjects[i].tasks - (dateObjects[i].lostTasks + dateObjects[i].skippedTasks);
          blanks[4].innerHTML = `${parseInt(dateObjects[i].doneTasks / 100)}%`;
        } else if (i < 2) {
          // For earlier days
          blanks[2].innerHTML = dateObjects[i].lostTasks + dateObjects[i].skippedTasks;
          blanks[3].innerHTML = `${parseInt(dateObjects[i].doneTasks / 100)}%`;
        }
      }
    });
  })();

  /* Switch form loading mode to main app */
  (() => {
    const preloadSection = document.querySelector('.preload');
    const mainApp = document.querySelector('.main-app');
    preloadSection.classList.add('moveSection-prevElement');
    mainApp.classList.add('moveSection-nextElement-right');
    moveSection(preloadSection, mainApp, 'toLeft');
  })();

  /* Event listeners */
  (() => {
    // Button bar and add task events
    (() => {
      const addTaskButtons = [document.querySelector('.button-bar > li > button.symptomatic[name = "add task"]'),
      ...document.querySelectorAll('.overview > article > .next-days > button')];
      let i;
      for (i = 0; i < addTaskButtons.length; i++) {
        addTaskButtons[i].addEventListener('click', addTaskTo.bind(undefined, calculateFewDaysBeforeOrAfter(i, 'after')));
      }
      const settingButton = document.querySelector('.button-bar > li > button.symptomatic[name = "setting"]');
      const scheduleButton = document.querySelector('.button-bar > li > button.symptomatic[name = "schedule"]');
      settingButton.addEventListener('click', viewSetting);
      scheduleButton.addEventListener('click', viewPlan);
    })();

    // Task info and task arrange events
    (() => {
      const infoSection = document.querySelector('.flip-env-inner > .todo-list > .todo-list-header > .message-env > .task-info.message');
      const goBackButton = infoSection.querySelector('button.symptomatic[name = "back"]');
      goBackButton.addEventListener('click', () => {
        const messages = infoSection.querySelectorAll('.message');
        if (messages) {
          let i;
          for (i = 0; i < messages.length; i++) {
            if (i === 0) {
              hideNode(messages[i], 'fade-type1', 250, false, messages[i].parentNode);
            } else {
              hideNode(messages[i], 'fade-type1', 200, true, messages[i].parentNode);
            }
          }
        }
        hideNode(infoSection, 'fade-type1', 300, false, infoSection.parentNode);
      });
      const arrangeListButton = document.querySelector('.flip-env-inner > .todo-list > .todo-list-header > button.symptomatic[name = "arrange"]');
      arrangeListButton.addEventListener('click', arrangeList.bind(undefined, false));
    })();
  })();
})();
