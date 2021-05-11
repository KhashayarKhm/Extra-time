// IDEA: age besh btonm line error ro tori tanzim knim k bge koja in moshkl has n inke koja in log ro zdim
/* WARNING: az teknik `${script}` fk nknm byd estfade krd chon fk knm az evel estfade mikne
: edit va functiona az in dst nbyd az object chizi dryaft knn va byd khodshon az database bgirn(fqt id ya date ro migirn) */
/* QUESTION: chi kar knim k indexedDB ro nshe ro console dst kari krd?
age nshe byd az rah 2 soal bala estfade knm (try..catch) */
/* COMBAK: function static memorize&delete ro hr moqe k barname baz shd ejra knm k toy kol bere bgrde chizi shd bde */
/* FIXME: ysri az transaction ha EventListener khorde roy request,
onaii k ysare mire vas ui function ro EventListener shono avaz knm o bzrm roy transaction */
/* IDEA: mit bjay inke hme edit haro bhshon object jdid
 return knim mish property hay object ro getter gzsht k hrdfe jdid trin ro update mikne */
/* FIXME: jryan finally ro byd az avl vas hme class ha gzasht
  Object.preventExtensions(ToDoItem.prototype);
  Object.freeze(ToDoItem.prototype);
  Object.seal(ToDoItem.prototype);
  Object.preventExtensions(Day.prototype);
  Object.freeze(Day.prototype);
  Object.seal(Day.prototype);
 */
 // QUESTION: age bjay inke toy promise nahaii bznim "return Promise.resolve(...)" khod natije ro return knim chi mish?
function _caller(depth = 0) {
  try {
    depth += 2;
    const stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
    let callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome
    callerName = callerName.split('\n')[depth].trim(); // 1st item is this, 2nd item is _caller function, 3th item is caller
    callerName = callerName.replace(/^\s+at Object./, ''); // Sanitize Chrome
    callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome
    if (callerName.slice(0, 3) === 'at ') {
      callerName = callerName.slice(3); // Sanitize Chrome
    }
    callerName = callerName.replace(/\@.+/, ''); // Sanitize Firefox
    return callerName;
  } catch (exception) {
    console.warn(exception);
    return undefined;
  }
}

function removeDuplicateValue(array) {
  // Verify argument
  if (!array instanceof Array) {
    throw new TypeError(`${array} is invalid argument`);
  }
  // Main code
  let i = 0;
  let value = array[i];
  while (value) {
    let indexOfValue = array.indexOf(value);
    let indexOfDupValue = array.lastIndexOf(value);
    while (indexOfValue !== indexOfDupValue) {
      array.splice(indexOfDupValue, 1);
      indexOfDupValue = array.lastIndexOf(value);
    }
    value = array[i++];
  }
  return array;
 }

function _Date(local, splicer = '/') {
  // Verify the arguments
  switch (true) {
    case typeof local !== 'string':
      throw new TypeError(`${local} is invalid argument`);
    case typeof splicer !== 'string':
      throw new TypeError(`${splicer} is invalid argument`);
    case local !== 'fa-IR' && local !== 'en-US':
      throw new RangeError(`${local} is undefined value`);
    case splicer !== '-' && splicer !== '/':
      throw new RangeError(`${splicer} is undefined value`);;
      break;
  }
  // Main code
  let date = new Date();
  date = date.toUTCString();
  date = date.slice(5, 16);
  /* IDEA: age in khat ro hzf knim moshkli pish nmiad fk knm bd byd on paiin split ro ba ' ' zd
  chon function calculateFewDaysBeforeOrAfter hno test nshde ino hminjori mizarim */
  date = date.replace(/ /g, '/');
  switch (true) {
    case date.includes('Jan'):
      date = date.replace('Jan', '01');
      break;
    case date.includes('Feb'):
      date = date.replace('Feb', '02');
      break;
    case date.includes('Mar'):
      date = date.replace('Mar', '03');
      break;
    case date.includes('Apr'):
      date = date.replace('Apr', '04');
      break;
    case date.includes('May'):
      date = date.replace('May', '05');
      break;
    case date.includes('Jun'):
      date = date.replace('Jun', '06');
      break;
    case date.includes('Jul'):
      date = date.replace('Jul', '07');
      break;
    case date.includes('Aug'):
      date = date.replace('Aug', '08');
      break;
    case date.includes('Sep'):
      date = date.replace('Sep', '09');
      break;
    case date.includes('Oct'):
      date = date.replace('Oct', '10');
      break;
    case date.includes('Nov'):
      date = date.replace('Nov', '11');
      break;
    case date.includes('Dec'):
      date = date.replace('Dec', '12');
      break;
    default:
      const message = new RangeError('Undefined month');
      console.error(message);
  }
  date = date.split('/').reverse();
  switch (local) {
    case 'fa-IR':
      date = new Date(Date.UTC(date[0], date[1] - 1, date[2]));
      date = date.toLocaleDateString('fa-IR');
      date = date.replace(/[/]/g, splicer);
      break;
    case 'en-US':
      date = date.join(splicer);
      break;
  }
  return date;
}

function calculateFewDaysBeforeOrAfter(numberOfDays, direction, local = 'en-US', date = '', splicer = '/') {
  // Verify the arguments
  switch (true) {
    case typeof numberOfDays !== 'number':
      throw new TypeError('\'numberOfDays\' argument has invalid value');
    case typeof direction !== 'string':
      throw new TypeError('\'direction\' argument has invalid value');
    case typeof local !== 'string':
      throw new TypeError('\'local\' argument has invalid value');
    case typeof date !== 'string':
      throw new TypeError('\'date\' argument has invalid value');
    case typeof splicer !== 'string':
      throw new TypeError('\'splicer\' argument has invalid value');
    case numberOfDays < 0 || !Number.isInteger(numberOfDays):
      throw new RangeError('\'numberOfDays\' argument has wrong value');
    case direction !== 'after' && direction !== 'before':
      throw new RangeError('\'direction\' argument has wrong value');
    case local !== 'en-US' && local !== 'fa-IR':
      throw new RangeError('\'local\' argument has wrong value');
    case !(new Date(date)) && date !== '':
      // Execute when the date is not empty but it is not valid
      throw new RangeError('Invalid date');
    case splicer !== '/' && splicer !== '-':
      throw new RangeError('\'splicer\' argument has wrong value');
    default:
      date = date ? date.replace('-', '/') : _Date('en-US');
  }
  const millisecInDay = 86400000;
  const interval = numberOfDays * millisecInDay;
  const originDateInMillisec = new Date(date).getTime();
  const targetDayInMillisec = direction === 'after' ? originDateInMillisec + interval
  : originDateInMillisec - interval;
  let targetDate = new Date(targetDayInMillisec).toDateString();
  targetDate = targetDate.slice(4, 16);
  switch (true) {
    case targetDate.includes('Jan'):
      targetDate = targetDate.replace('Jan', '01');
      break;
    case targetDate.includes('Feb'):
      targetDate = targetDate.replace('Feb', '02');
      break;
    case targetDate.includes('Mar'):
      targetDate = targetDate.replace('Mar', '03');
      break;
    case targetDate.includes('Apr'):
      targetDate = targetDate.replace('Apr', '04');
      break;
    case targetDate.includes('May'):
      targetDate = targetDate.replace('May', '05');
      break;
    case targetDate.includes('Jun'):
      targetDate = targetDate.replace('Jun', '06');
      break;
    case targetDate.includes('Jul'):
      targetDate = targetDate.replace('Jul', '07');
      break;
    case targetDate.includes('Aug'):
      targetDate = targetDate.replace('Aug', '08');
      break;
    case targetDate.includes('Sep'):
      targetDate = targetDate.replace('Sep', '09');
      break;
    case targetDate.includes('Oct'):
      targetDate = targetDate.replace('Oct', '10');
      break;
    case targetDate.includes('Nov'):
      targetDate = targetDate.replace('Nov', '11');
      break;
    case targetDate.includes('Dec'):
      targetDate = targetDate.replace('Dec', '12');
      break;
    default:
      throw new RangeError('Undefined month');
  }
  targetDate = targetDate.split(' ').reverse();
  switch (local) {
    case 'fa-IR':
      targetDate = new Date(Date.UTC(targetDate[0], targetDate[1] - 1, targetDate[2]));
      targetDate = targetDate.toLocaleDateString('fa-IR');
      targetDate = targetDate.replace(/[/]/g, splicer);
      break;
    case 'en-US':
      targetDate = targetDate[0] + splicer + targetDate[2] + splicer + targetDate[1];
      break;
    default:
      throw new RangeError('\'local\' argument has wrong value');
  }
  return targetDate;
}

function getOS(objectStores) {
  if (!objectStores || !objectStores instanceof Array) {
    throw new TypeError('\"objectStores\" should be an array');
  } else if (objectStores.length > 3 || objectStores.length === 0) {
    throw new RangeError('Invalid array length');
  } else {
    let item;
    for (item of objectStores) {
      if (item !== 'todo_items' && item !== 'days_ahead' && item !== 'spent_week') {
        throw new TypeError('\"objectStores\" array has invalid value');
      }
    }
  }
  const request = new Promise((resolve, reject) => {
    const databaseReq = window.indexedDB.open('todo_db', 1);

    databaseReq.onupgradeneeded = event => {
      /* we need to do this separately here because the onupgradeneeded handler
      (if needed) will run before the onsuccess handler,
      meaning that the db value wouldn't be available if we didn't do this. */
      const database = event.target.result;
      // First objectStore
      const daysAhead = database.createObjectStore('days_ahead', { keyPath: 'date', autoIncrement: false });
      daysAhead.createIndex('date', 'date', {
        unique: true
      });
      daysAhead.createIndex('tasks', 'tasks', {
        unique: false
      });
      daysAhead.createIndex('doneTasks', 'doneTasks', {
        unique: false
      });
      daysAhead.createIndex('weekday', 'weekday', {
        unique: false
      });
      daysAhead.createIndex('skippedTasks', 'skippedTasks', {
        unique: false
      });
      daysAhead.createIndex('lostTasks', 'lostTasks', {
        unique: false
      });
      // Second objectStore
      const todoItems = database.createObjectStore('todo_items', { keyPath: 'id', autoIncrement: true });
      todoItems.createIndex('id', 'id', {
        unique: true
      });
      todoItems.createIndex('subject', 'subject', {
        unique: true
      });
      todoItems.createIndex('timer', 'timer', {
        unique: false
      });
      todoItems.createIndex('scheduledDays', 'scheduledDays', {
        unique: false
      });
      todoItems.createIndex('pattern', 'pattern', {
        unique: false
      });
      todoItems.createIndex('startDate', 'startDate', {
        unique: false,
      });
      todoItems.createIndex('pin', 'pin', {
        unique: false
      });
      todoItems.createIndex('description', 'description', {
        unique: false
      });
      // Third objectStore
      const spentWeekOS = database.createObjectStore('spent_week', { keyPath: 'date', autoIncrement: false });
      spentWeekOS.createIndex('date', 'date', {
        unique: true
      });
      spentWeekOS.createIndex('tasks', 'tasks', {
        unique: false
      });
      spentWeekOS.createIndex('doneTasks', 'doneTasks', {
        unique: false
      });
      spentWeekOS.createIndex('skippedTasks', 'skippedTasks', {
        unique: false
      });
      spentWeekOS.createIndex('lostTasks', 'lostTasks', {
        unique: false
      });
    };
    databaseReq.onsuccess = event => {
      const database = event.target.result;
      resolve(database);
    };
  }).then(database => {
    const transaction = database.transaction(objectStores, 'readwrite');
    const _objectStores = [];
    let osName;
    for (osName of objectStores) {
      _objectStores.push(transaction.objectStore(osName));
    }
    return Promise.resolve(_objectStores);
  });
  return request;
}

class Day {
  constructor(date = '') {
    // Verify the date argument
    if (typeof date !== 'string') {
      throw new TypeError(`${date} is invalid argument`);
    } else if (date) {
      if (!new Date(date).getTime()) {
        throw new RangeError('Invalid date');
      }
      // WARNING: inja moqeii gir mindaze k bd chnd roz azt soal mikne k kodom kar ro anjam ddi
      /* else {
        const _date = new Date(date).getTime();
        const now = new Date(_Date('en-US')).getTime();
        if (_date < now) {
          throw new RangeError('This date is expired');
        }
      }*/
    }
    // Set property and add it to database or restore it automaticly
    date = date ? date.replace(/[-]/g, '/') : _Date('en-US');
    const weekday = new Date(date).getDay();
    const dayObjectProcess = new Promise((resolve, reject) => {
      const daysAheadOS = getOS(['days_ahead']);
      // wait till getOS response
      daysAheadOS.then(objectStore => {
        return Promise.resolve(objectStore);
      });
      resolve(daysAheadOS);
    }).then(daysAheadOS => {
      daysAheadOS = daysAheadOS[0];
      const cursorProcess = new Promise((resolve, reject) => {
        const cursorReq = daysAheadOS.openCursor(date);
        // wait till cursor request success
        cursorReq.onsuccess = event => {
          const cursor = event.target.result;
          resolve(cursor);
        };
      }).then(cursor => {
        if (cursor) {
          // Restore the date
          const targetDate = cursor.value;
          this.date = date;
          this.tasks = targetDate.tasks;
          this.doneTasks = targetDate.doneTasks;
          this.weekday = targetDate.weekday;
          this.skippedTasks = targetDate.skippedTasks;
          this.lostTasks = targetDate.lostTasks;
          Object.freeze(this);
          Object.seal(this);
          Object.preventExtensions(this);
          return Promise.resolve(this);
        } else {
          // Create a new one and add it to database
          this.date = date;
          this.tasks = [];
          this.doneTasks = 0;
          this.skippedTasks = 0;
          this.weekday = weekday;
          this.lostTasks = 0;
          const newDay = {
            date: this.date,
            tasks: this.tasks,
            doneTasks: this.doneTasks,
            weekday: this.weekday,
            skippedTasks: this.skippedTasks,
            lostTasks: this.lostTasks,
          };
          const addProcess = new Promise((resolve, reject) => {
            const addRequest = daysAheadOS.add(newDay);
            // wait till add request success
            addRequest.onsuccess = event => {
              resolve();
            }
          }).then(() => {
            Object.freeze(this);
            Object.seal(this);
            Object.preventExtensions(this);
            return Promise.resolve(this);
          });

          return Promise.resolve(addProcess);
        }
      });

      return Promise.resolve(cursorProcess);
    });

    return dayObjectProcess;
  }

  skipTask(taskId) {
    // Verify argument and the date
    if (typeof taskId !== 'string') {
      throw new TypeError('The taskId value is invalid');
    }
    const targetDate = new Date(this.date).getTime();
    const today = new Date(_Date('en-US')).getTime();
    if (!targetDate) {
      throw new TypeError('Date is invalid');
    } else if (targetDate !== today) {
      throw new RangeError('Can not skip the task on this date');
    }
    // Main code
    function modifyToday(daysAheadOS, todayDate) {
      const modifyTodayProcess = new Promise((resolve, reject) => {
        const modifyCursorReq = daysAheadOS.openCursor(todayDate);
        modifyCursorReq.onsuccess = event => {
          const modifyCursor = event.target.result;
          resolve(modifyCursor);
        };
      }).then(modifyCursor => {
        const today = modifyCursor.value;
        if (today.tasks.includes(taskId)) {
          const removeTaskId = new Promise((resolve, reject) => {
            console.log(`taskId: ${taskId}`);
            today.tasks = today.tasks.filter(item => item !== taskId);
            today.skippedTasks++;
            const removeProcess = modifyCursor.update(today);
            removeProcess.onsuccess = () => {
              return resolve();
            };
          });
          return Promise.resolve(removeTaskId);
        } else {
          return Promise.reject(new ReferenceError('The task id does not exist in today tasks list'));
        }
      });

      return modifyTodayProcess;
    }

    function scheduling(todayWeekday, task, targetDate) {
      const schedulingProcess = new Promise((resolve, reject) => {
        const objectStoreReq = getOS(['days_ahead']);
        objectStoreReq.then(objectStore => {
          return Promise.resolve(objectStore);
        });
        resolve(objectStoreReq);
      }).then(objectStore => {
        const cursorProcess = new Promise((resolve, reject) => {
          const daysAheadOS = objectStore[0];
          if (!targetDate) {
            const weekdaysToken = parseInt(task.remainedDays / task.pattern.length);
            const singleDaysToken = task.remainedDays % task.pattern.length;
            const patternPart1 = task.pattern.filter(element => element >= todayWeekday);
            const patternPart2 = task.pattern.filter(element => element < todayWeekday);
            const pattern = [...patternPart1, ...patternPart2];
            const daysInterval = (weekdaysToken * 7) + singleDaysToken;
            targetDate = calculateFewDaysBeforeOrAfter(daysInterval, 'after');
          }
          console.log(targetDate);
          const cursorReq = daysAheadOS.openCursor(targetDate);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            resolve(cursor);
          };
        }).then(cursor => {
          if (cursor) {
            const _targetDate = cursor.value;
            const updateProcess = new Promise((resolve, reject) => {
              _targetDate.tasks.push(taskId);
              const updateReq = cursor.update(_targetDate);
              updateReq.onsuccess = () => {
                return resolve();
              };
            });
            return Promise.resolve(updateProcess);
          } else {
            const retryTheProcess = new Promise((resolve, reject) => {
              // The target date does not exist in object store, so we retry the process
              const _targetDate = new Day(targetDate);
              resolve(_targetDate);
            }).then(() => {
              // "rtp" stands for "retry the process"
              const rtp = scheduling(todayWeekday, task, targetDate);
              return Promise.resolve(rtp);
            });
            return Promise.resolve(retryTheProcess);
          }
        });
        return Promise.resolve(cursorProcess);
      });

      return schedulingProcess;
    }

    const skipTaskProcess = new Promise((resolve, reject) => {
      const objectStoresReq = getOS(['todo_items', 'days_ahead']);
      objectStoresReq.then(responses => {
        return Promise.resolve(responses);
      });
      resolve(objectStoresReq);
    }).then(objectStores => {
      const todoItemsOS = objectStores[0];
      const daysAheadOS = objectStores[1];
      // Verify the task and access the scheduledDays
      const cursorProcess = new Promise((resolve, reject) => {
        const todoCursorReq = todoItemsOS.openCursor(taskId);
        todoCursorReq.onsuccess = event => {
          const todoCursor = event.target.result;
          resolve(todoCursor);
        }
      }).then(todoCursor => {
        if (todoCursor) {
          const targetTask = todoCursor.value;
          // Remove the task id from tasks in today object
          const _modifyToday = modifyToday(daysAheadOS, this.date);
          // Schedule for another date
          const schedulingTask = scheduling(this.weekday, targetTask);
          const promiseAnswer = Promise.all([_modifyToday, schedulingTask]);
          promiseAnswer.then(responses => {
            return Promise.resolve(responses);
          });
          return Promise.resolve(promiseAnswer);
        } else {
          return Promise.reject(new ReferenceError('The task id does not exist in object store'));
        }
      });
      return Promise.resolve(cursorProcess);
    });

    return skipTaskProcess;
  }

  loseTask(taskId) {
    // Verify argument and the date
    if (typeof taskId !== 'string') {
      throw new TypeError('Invalid argument');
    }
    const targetDate = new Date(this.date).getTime();
    const now = new Date(_Date('en-US')).getTime();
    if (targetDate > now) {
      throw new RangeError('This function can not execute for this date');
    }
    // Main code
    const lostTaskProcess = new Promise((resolve, reject) => {
      const objectStoresReq = getOS(['days_ahead', 'todo_items']);
      objectStoresReq.then(objectStores => {
        return Promise.resolve(objectStores);
      });
      resolve(objectStoresReq);
    }).then(objectStores => {
      const deleteAndModifyProcess = new Promise((resolve, reject) => {
        // Delete task from today todo list and update "lostTasks" property
        const daysAheadOS = objectStores[0];
        const cursorProcess = new Promise((resolve, reject) => {
          const cursorReq = daysAheadOS.openCursor(this.date);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            const today = cursor.value;
            today.tasks = today.tasks.filter(id => id !== taskId);
            today.lostTasks++;
            const updateProcess = new Promise((resolve, reject) => {
              const updateReq = cursor.update(today);
              updateReq.onsuccess = () => {
                return resolve();
              };
            });
            return resolve(updateProcess);
          };
        });
        resolve(cursorProcess);
      }).then(response => {
        // Update the "remainedDays" property in target task object
        const todoItemsOS = objectStores[1];
        const cursorProcess = new Promise((resolve, reject) => {
          const cursorReq = todoItemsOS.openCursor(taskId);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            if (cursor) {
              const targetTask = cursor.value;
              targetTask.remainedDays--;
              const updateProcess = new Promise((resolve, reject) => {
                const updateReq = cursor.update(targetTask);
                updateReq.onsuccess = () => {
                  return resolve();
                };
              });
              return resolve(updateProcess);
            } else {
              return reject(new ReferenceError('The task id does not exist in object store'));
            }
          };
        });
        return Promise.resolve(cursorProcess);
      });
      return Promise.resolve(deleteAndModifyProcess);
    });

    return lostTaskProcess;
  }

  doneTask(taskId) {
    // Verify argument and the date
    if (typeof taskId !== 'string') {
      throw new TypeError('Invalid argument');
    }
    const targetDate = new Date(this.date).getTime();
    const now = new Date(_Date('en-US')).getTime();
    if (targetDate > now) {
      throw new RangeError('This function can not execute for this date');
    }
    // Main code
    const doneTaskProcess = new Promise((resolve, reject) => {
      const objectStoresReq = getOS(['days_ahead', 'todo_items']);
      objectStoresReq.then(responses => {
        return Promise.resolve(responses);
      });
      resolve(objectStoresReq);
    }).then(objectStores => {
      const modifyTask = new Promise((resolve, reject) => {
        const todoItemsOS = objectStores[0];
        const cursorReq = todoItemsOS.openCursor(taskId);
        cursorReq.onsuccess = event => {
          const cursor = event.target.result;
          resolve(cursor);
        };
      }).then(cursor => {
        if (cursor) {
          const updateProcess = new Promise((resolve, reject) => {
            const targetTask = cursor.value;
            targetTask.remainedDays--;
            const updateReq = cursor.update(targetTask);
            updateReq.onsuccess = () => {
              // If it is true we should call DayObject.doneTask() function
              const isItFinished = targetTask.remainedDays <= 0 ? true : false;
              return Promise.resolve(isItFinished);
            };
          });
          return Promise.resolve(updateProcess);
        } else {
          return Promise.reject(new ReferenceError('The task id does not exist in object store'));
        }
      });

      const modifyToday = new Promise((resolve, reject) => {
        const daysAheadOS = objectStores[1];
        const cursorReq = daysAheadOS.openCursor(this.date);
        cursorReq.onsuccess = event => {
          const cursor = event.target.result;
          resolve(cursor);
        };
      }).then(cursor => {
        const targetDate = cursor.value;
        if (targetDate.tasks.includes(taskId)) {
          const updateProcess = new Promise((resolve, reject) => {
            targetDate.doneTasks++;
            const updateReq = cursor.update(targetDate);
            updateReq.onsuccess = () => {
              return Promise.resolve();
            };
          });
          return Promise.resolve(updateProcess);
        } else {
          return Promise.reject(new ReferenceError('The task id does not exist in today tasks list'));
        }
      });

      const promiseAnswer = Promise.all([modifyTask, modifyToday]);
      return Promise.resolve(promiseAnswer);
    });

    return doneTaskProcess;
  }

  // WARNING: in function momkne drst kar nkne
  static delete() {
    // Main code
    const deleteProcess = new Promise((resolve, reject) => {
      const objectStoreReq = getOS(['spent_week']);
      objectStoreReq.then(response => {
        return Promise.resolve(response);
      });
      resolve(objectStoreReq);
    }).then(objectStore => {
      const spentWeekOS = objectStore[0];
      const originDate = calculateFewDaysBeforeOrAfter(7, 'before');
      const removeRequests = [];
      const cursorProcess = new Promise((resolve, reject) => {
        const cursorReq = spentWeekOS.openCursor();
        cursorReq.onsuccess = event => {
          const cursor = event.target.result;
          if (cursor) {
            const record = cursor.value;
            if (new Date(record.date).getTime() > new Date(originDate).getTime()) {
              const removeProcess = new Promise((resolve, reject) => {
                const removeReq = spentWeekOS.delete(record.date);
                removeReq.onsuccess = () => {
                  return resolve();
                };
              });
              removeRequests.push(removeProcess);
            }
            cursor.continue();
          } else {
            if (removeRequests.length === 0) {
              const requestsResults = Promise.all(removeRequests);
              requestsResults.then(responses => {
                return Promise.resolve(responses);
              });
              return resolve(requestsResults);
            } else {
              return resolve();
            }
          }
        };
      });
      return Promise.resolve(cursorProcess);
    });

    return deleteProcess;
  }

  static memorize() {
    // Main code
    const memorizeProcess = new Promise((resolve, reject) => {
      const objectStoresReq = getOS(['days_ahead', 'spent_week']);
      objectStoresReq.then(objectStores => {
        return Promise.resolve(objectStores);
      });
      resolve(objectStoresReq);
    }).then(objectStores => {
      /* First delete the target date from days_ahead object store
      then add them to spent_week object store */
      const targetDateProcessing = new Promise((resolve, reject) => {
        const daysAheadOS = objectStores[0];
        const cursorProcess = new Promise((resolve, reject) => {
          const cursorReq = daysAheadOS.openCursor();
          const deleteRequests = [];
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            if (cursor) {
              const targetDate = cursor.value;
              const targetDateTime = new Date(targetDate.date).getTime();
              const now = new Date(_Date('en-US')).getTime();
              if (now > targetDateTime) {
                const deleteProcess = new Promise((resolve, reject) => {
                  const deleteReq = daysAheadOS.delete(targetDate.date);
                  deleteReq.onsuccess = () => {
                    return resolve(targetDate);
                  };
                });
                deleteRequests.push(deleteProcess);
                cursor.continue();
              } else {
                cursor.continue();
              }
            } else {
              if (deleteRequests.length) {
                const deleteRequestsResults = Promise.all(deleteRequests);
                deleteRequestsResults.then(responses => {
                  return Promise.resolve(responses);
                });
                return resolve(deleteRequestsResults);
              } else {
                return resolve();
              }
            }
          };
        });
        Promise.resolve(cursorProcess);
      }).then(spentDatesObj => {
        // Modify the objects and preparing for add them to spent_week object store
        spentDatesObj = spentDatesObj.map(obj => {
          return {
            date: obj.date,
            tasks: obj.tasks.length,
            doneTasks: obj.doneTasks,
            skippedTasks: obj.skippedTasks,
            lostTasks: obj.lostTasks,
          }
        });
        const spentWeekOS = objectStores[1];
        // Add the deleted days to spent_week object store
        const addRequests = [];
        let targetDate;
        for(targetDate of spentDatesObj) {
          const addProcess = new Promise((resolve, reject) => {
            const addReq = spentWeekOS.add(targetDate);
            addReq.onsuccess = () => {
              return resolve();
            };
          });
          addRequests.push(addProcess);
        }
        const requestsResults = Promise.all(addRequests);
        requestsResults.then(responses => {
          return Promise.resolve(responses);
        });
        return Promise.resolve(requestsResults);
      });
      return Promise.resolve(targetDateProcessing);
    });

    return memorizeProcess;
  }

  static getDate(targetDate) {
    // Verify argument
    if (typeof targetDate !== 'string') {
      throw new TypeError(`${targetDate} is invalid argument`);
    } else if (!new Date(targetDate).getDate()) {
      throw new RangeError('Invalid date');
    }
    // Main code
    const dateToTime = new Date(targetDate).getTime();
    const now = new Date(_Date('en-US')).getTime();
    const objectStoreName = dateToTime < now ? ['spent_week'] : ['days_ahead'];
    const gettingProcess = new Promise((resolve, reject) => {
      const objectStoreReq = getOS(objectStoreName);
      objectStoreReq.then(response => {
        return Promise.resolve(response);
      });
      resolve(objectStoreReq);
    }).then(objectStore => {
      objectStore = objectStore[0];
      const cursorProcess = new Promise((resolve, reject) => {
        const cursorReq = objectStore.openCursor(targetDate);
        cursorReq.onsuccess = event => {
          const cursor = event.target.result;
          if (cursor) {
            const targetDateObject = cursor.value;
            targetDateObject.tasks = targetDateObject.tasks.length || targetDateObject.tasks;
            return resolve(targetDateObject);
          } else {
            return resolve({ date: targetDate, tasks: 0, doneTasks: 0, skippedTasks: 0, lostTasks: 0, });
          }
        }
      });
      return Promise.resolve(cursorProcess);
    });
    return gettingProcess;
  }
}

class ToDoItem {
  /* WARNING: ToDoItem vqti vas on roz tmom shde dige edit nshe
  dob bshinm function edit ro check khonm chon vqti DayObject.doneTask() rah miofte yki az scheduledDays km mikne o ok mish */
  constructor(subject, timer, scheduledDays = 0, pattern = [0, 1, 2, 3, 4, 5, 6], startDate = '', pin = false, description = '', id = '') {
    switch (true) {
      case typeof id !== 'string':
        throw new TypeError('\"id\" is invalid argument');
      case typeof subject !== 'string':
        throw new TypeError('\"subject\" is invalid argument');
      case typeof scheduledDays !== 'number':
        throw new TypeError('\"scheduledDays\" is invalid argument');
      case typeof timer !== 'number':
        throw new TypeError('\"timer\" is invalid argument');
      case !pattern instanceof Array:
        throw new TypeError('\"pattern\" is invalid argument');
      case typeof startDate !== 'string':
        throw new TypeError('\"startDate\" is invalid argument');
      case typeof pin !== 'boolean':
        throw ['type', pin];
      case typeof description !== 'string':
        throw new TypeError('\"description\" is invalid argument');
      case id && _caller(3) !== 'promise callback*restore':
        throw new Error('Permission denied to access property \"id\"');
      case scheduledDays < 0 && !Number.isInteger(scheduledDays):
        throw new RangeError('\'scheduledDays\' count must be non-negative');
      case timer < 0 && !Number.isInteger(scheduledDays):
        throw new RangeError('\'timer\' count must be non-negative');
      default:
        // Verify pattern
        if (pattern.length < 7 || pattern.length !== 0) {
          const validValue = pattern.every(item => {
            return Number.isInteger(item) && item <= 6 && item >= 0;
          });
          if (validValue) {
            pattern = pattern.sort();
            pattern = removeDuplicateValue(pattern);
          } else {
            throw new TypeError('Invalid array value');
          }
        } else {
          throw new RangeError('Invalid array length');
        }
        // Verify startDate
        if (_caller(3) !== 'promise callback*restore') {
          if (startDate) {
            if (!new Date(startDate).getTime()) {
              throw new RangeError('Invalid date');
            } else if (!pattern.includes(new Date(startDate).getDay())) {
              throw new RangeError(`${startDate} can not match with the weekday pattern`);
            } else {
              const _date = new Date(startDate).getTime();
              const now = new Date(_Date('en-US')).getTime();
              if (_date < now) {
                throw new RangeError(`Start date(${startDate}) has expired`);
              }
            }
          } else {
            startDate = _Date('en-US');
          }
        }
    }

    this.subject = subject;
    this.scheduledDays = scheduledDays;
    // The timer is to minute
    this.timer = timer;
    this.pin = pin;
    this.description = description;
    this.remainedDays = scheduledDays;
    this.pattern = pattern;
    this.startDate = startDate;
    if (id) {
      this.id = id;
    } else {
      function addTaskToDate(date, taskId) {
        const process = new Promise((resolve, reject) => {
          const objectStoreReq = getOS(['days_ahead']);
          objectStoreReq.then(response => {
            return Promise.resolve(response);
          });
          resolve(objectStoreReq);
        }).then(daysAheadOS => {
          daysAheadOS = daysAheadOS[0];
          const cursorProcess = new Promise((resolve, reject) => {
            const cursorReq = daysAheadOS.openCursor(date);
            cursorReq.onsuccess = event => {
              const cursor = event.target.result;
              resolve(cursor);
            };
          }).then(cursor => {
            if (cursor) {
              const targetDate = cursor.value;
              const updateProcess = new Promise((resolve, reject) => {
                targetDate.tasks.push(taskId);
                const updateReq = cursor.update(targetDate);
                updateReq.onsuccess = () => {
                  return resolve();
                };
              });
              return Promise.resolve(updateProcess);
            } else {
              const retryTheProcess = new Promise((resolve, reject) => {
                const absenceDate = new Day(date);
                resolve(absenceDate);
              }).then(absenceDate => {
                // "rtp" stands for "retry the process"
                const rtp = addTaskToDate(date, taskId);
                return Promise.resolve(rtp);
              });
              return Promise.resolve(retryTheProcess);
            }
          });
          return Promise.resolve(cursorProcess);
        });

        return process;
      }

      const initTodoItem = new Promise((resolve, reject) => {
        const objectStoreReq = getOS(['todo_items']);
        objectStoreReq.then(response => {
          return Promise.resolve(response);
        });
        resolve(objectStoreReq);
      }).then(objectStore => {
        // Initialize the todo item id
        /* FIXME: id automatic hstsh (mizon knmsh)
        - ye moshkli has une k id ro ndrim onvqt va byd az db grft (hla bbinm moqeii k ad miknim b ma object ro return mikne ya n) */
        const uniqueId = (Math.random() * 100).toFixed();
        this.id = uniqueId;
        const todoItemsOS = objectStore[0];
        const addProcess = new Promise((resolve, reject) => {
          // Create a clone of this todo item
          const newTask = {
            id: this.id,
            subject: this.subject,
            timer: this.timer,
            scheduledDays: this.scheduledDays,
            pin: this.pin,
            description: this.description,
            pattern: this.pattern,
            startDate: this.startDate,
          };
          // Add todo item to todo_items object store
          // "TIOS" stands for "Todo Item Object Store"
          const addToTIOS = todoItemsOS.add(this);
          addToTIOS.onsuccess = () => {
            resolve();
          }
        }).then(() => {
          // Add task to target days
          const updateRequests = [];
          /* Modify the this.pattern and sort it to match with today weekday cause:
          if we don't do this the difference between first target weekday and today weekday is be negative
          and can't find it in object store */
          const originWeekday = new Date(startDate).getDay();
          const patternPart1 = this.pattern.filter(element => element >= originWeekday);
          const patternPart2 = this.pattern.filter(element => element < originWeekday);
          const pattern = [...patternPart1, ...patternPart2];
          /* TODO: byd barash ye comment khob bzrm; jryansh hm ine k in vas calculatedDate has k
          az edame on bre jolo (age tedad mal ye weekday az 1 bishtr bd) */
          const flagDates = new Array(pattern.length);
          let i, j;
          const limit = this.scheduledDays ? this.scheduledDays : 1;
          for (i = 0, j = 0; i < limit; i++, j++) {
            j = j >= pattern.length ? 0 : j;
            let calculatedDate, step = 0;
            do {
              if (flagDates[j]) {
                calculatedDate = calculateFewDaysBeforeOrAfter(7, 'after', 'en-US', flagDates[j]);
              } else {
                calculatedDate = calculateFewDaysBeforeOrAfter(step, 'after', 'en-US', startDate);
              }
              step++;
            } while (new Date(calculatedDate).getDay() !== pattern[j]);
            flagDates[j] = calculatedDate;
            // "DAOS" stands for "days ahead object store"
            const addToDAOS = new Promise((resolve, reject) => {
              const addToDAOSProcess = addTaskToDate(calculatedDate, this.id);
              resolve(addToDAOSProcess);
            }).then(() => {
              Object.seal(this);
              Object.preventExtensions(this);
              Object.freeze(this);
              return Promise.resolve(this);
            });
            updateRequests.push(addToDAOS);
          }
          // Check for all the update requests be successful
          const requests = Promise.all(updateRequests);
          requests.then(responses => {
            Object.preventExtensions(this);
            Object.seal(this);
            Object.freeze(this);
            // No matter that which one return, all of them are the same
            return Promise.resolve(responses[0]);
          });
          return Promise.resolve(requests);
        });
        return Promise.resolve(addProcess);
      });
      return initTodoItem;
    }
  }

  // WARNING: in function momkne drst kar nkne
  edit(properties) {
    // Verify argument
    switch (true) {
      case properties.constructor !== Object:
        throw new TypeError('\"properties\" is invalid argument');
      default:
        // Verify the object properties and its values
        let property, value;
        const objEnt = Object.entries(properties);
        for([property, value] of objEnt) {
          switch (property) {
            case 'subject':
              if (typeof value !== 'string') {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              }
              break;
            case 'scheduledDays':
              if (typeof value !== 'number') {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              } else if (value < 0 || !Number.isInteger(value)) {
                throw new RangeError('radix must be an integer and non-negative');
              }
              break;
            case 'timer':
              if (typeof value !== 'number') {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              } else if (value <= 0 || !Number.isInteger(value)) {
                throw new RangeError('radix must be an integer and non-negative and non-zero');
              }
              break;
            case 'pin':
              if (typeof value !== 'boolean') {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              }
              break;
            case 'description':
              if (typeof value !== 'string') {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              }
              break;
            case 'startDate':
              if (typeof value !== 'string') {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              } else if (!new Date(value)) {
                throw new RangeError('Invalid date');
              } else {
                const todayTime = new Date().getTime();
                const startDateTime = new Date(value).getTime();
                if (todayTime > startDateTime) {
                  throw new RangeError(`${value} has expired`);
                }
              }
              break;
            case 'pattern':
              if (value instanceof Array) {
                const patternValues = value;
                if (patternValues.length < 7 || patternValues.length !== 0) {
                  const validValue = patternValues.every(item => {
                    return Number.isInteger(item) && item <= 6 && item >= 0;
                  });
                  if (validValue) {
                    patternValues = patternValues.sort();
                    value = removeDuplicateValue(patternValues);
                  } else {
                    throw new TypeError(`${patternValues} is invalid value for pattern`);
                  }
                } else {
                  throw new RangeError('Invalid array length for pattern');
                }
              } else {
                throw new TypeError(`${value} is invalid value for ${property} property`);
              }
              break;
            default:
              if (property === 'id' || property === 'remainedDays') {
                throw new TypeError(`\"${property}\" is read-only`);
              } else {
                throw new TypeError(`Can not modify the property, \"${property}\" is undefined`);
              }
          }
        }
        // Verify the startDate value
        const startDateWeekday = new Date(properties.startDate).getDay();
        if ((properties.pattern || this.pattern).includes(startDateWeekday)) {
          throw new RangeError(`${properties.startDate} can not match with the weekday pattern`);
        }
    }
    // Main code
    const editProcess = new Promise((resolve, reject) => {
      const objectStoreReq = getOS(['todo_items']);
      objectStoreReq.then(response => {
        return Promise.resolve(response);
      });
      resolve(objectStoreReq);
    }).then(objectStore => {
      const todoItemsOS = objectStore[0];
      const modifyRequests = [];
      // This block of code is just for modify the subject, timer, pin and description properties
      if (properties.subject || properties.timer || properties.pin || properties.description) {
        const modifyProperties = new Promise((resolve, reject) => {
          const cursorReq = todoItemsOS.openCursor(this.id);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            resolve(cursor);
          };
        }).then(cursor => {
          const updateProcess = new Promise((resolve, reject) => {
            const targetTask = cursor.value;
            targetTask.subject = properties.subject ? properties.subject : targetTask.subject;
            targetTask.timer = properties.timer ? properties.timer : targetTask.timer;
            targetTask.pin = properties.pin ? properties.pin : targetTask.pin;
            targetTask.description = properties.description ? properties.description : targetTask.description;
            const updateReq = cursor.update(targetTask);
            updateReq.onsuccess = event => {
              console.log(event.target);
              return resolve();
            };
          });
          return Promise.resolve(updateProcess);
        });

        modifyRequests.push(modifyProperties);
      }

      // This block of code is just for scheduling
      if (properties.scheduledDays || properties.pattern || properties.startDate) {
        const modifySchedule = new Promise((resolve, reject) => {
          const cursorReq = todoItemsOS.openCursor(this.id);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            resolve(cursor);
          }
        }).then(cursor => {
          const targetTask = cursor.value;
          // Calculate the origin date
          let originDate;
          switch (true) {
            // Convert to boolean
            case !!properties.startDate:
              // User wants to modify the startDate
              originDate = properties.startDate;
              break;
            case (new Date(targetTask.startDate).getTime() >= new Date().getTime()):
              // The start date is ahead from today
              originDate = targetTask.startDate;
              break;
            case (properties.pattern || targetTask.pattern).includes(new Date().getDay()):
              // Today is in weekday pattern so it can be the origin date
              originDate = _Date('en-US');
              break;
            default:
              const todayWeekday = new Date().getDay();
              const pattern = properties.pattern || targetTask.pattern;
              const originWeekday = pattern.find(weekday => weekday > todayWeekday);
              /* The interval between today and the start date
              the condition means that there is not any weekday number bigger then today weekday number
              so the start date weekday number is the first element of the pattern cause it is next */
              const interval = originWeekday === -1 ? (7 - todayWeekday) + pattern[0] : originWeekday - todayWeekday;
              originDate = calculateFewDaysBeforeOrAfter(interval, 'after');
          }
          // Check for scheduling with new pattern, start date or not
          if (properties.pattern || properties.startDate) {
            /* When the pattern or strat date of an item changed, the nature of the item change,
            so we create new task with new id and properties */
            const transformProcess = new Promise((resolve, reject) => {
              const deleteProcess = new Promise((resolve, reject) => {
                const deleteTask = this.delete();
                return resolve(deleteTask);
              });
              resolve(deleteItem);
            }).then(deletedTask => {
              const addProcess = new Promise((resolve, reject) => {
                const addTask = new ToDoItem(properties.subject ? properties.subject : deletedTask.subject,
                  properties.timer ? properties.timer : deletedTask.timer,
                  properties.scheduledDays ? properties.scheduledDays : deletedTask.scheduledDays,
                  properties.pattern ? properties.pattern : deletedTask.pattern,
                  originDate,
                  properties.pin ? properties.pin : deletedTask.pin,
                  properties.description ? properties.description : deletedTask.description);
                return resolve(addTask);
              });
              return Promise.resolve(addProcess);
            });
            return Promise.resolve(transformProcess);
          } else {
            // Just modify the "scheduledDays" property
            const requests = [];
            const originWeekday = new Date(originDate).getDay();
            const patternPart1 = this.pattern.filter(element => element >= originWeekday);
            const patternPart2 = this.pattern.filter(element => element < originWeekday);
            const pattern = [...patternPart1, ...patternPart2];
            const wt = parseInt(targetTask.scheduledDays / pattern.length);
            const sdt = targetTask.scheduledDays % pattern.length;
            // Interval to last date of the task
            const intervalToLastTask = wt + sdt;
            const lastDate = calculateFewDaysBeforeOrAfter(intervalToLastTask, 'after', 'en-US', originDate);
            const flagDates = new Array(targetTask.pattern.length);
            let overplus = properties.scheduledDays - targetTask.scheduledDays;
            function modification(action, targetTaskID, targetDate) {
              if (action !== 'add' && action !== 'delete') {
                throw new TypeError('Invalid action');
              } else if (typeof targetTaskID !== 'string') {
                throw new TypeError('Invalid id');
              } else if (!new Date(targetDate)) {
                throw new TypeError('Invalid date');
              }
              const mProcess = new Promise((resolve, reject) => {
                const objectStoreReq = getOS(['days_ahead']);
                objectStoreReq.then(response => {
                  return resolve(response);
                });
                resolve(objectStoreReq);
              }).then(objectStore => {
                const daysAheadOS = objectStore[0];
                const cursorProcess = new Promise((resolve, reject) => {
                  const cursorReq = daysAheadOS.openCursor(targetDate);
                  cursorReq.onsuccess = event => {
                    const cursor = event.target.result;
                    resolve(cursor);
                  };
                }).then(cursor => {
                  if (cursor) {
                    const process = new Promise((resolve, reject) => {
                      const _targetDate = cursor.value;
                      if (action === 'add') {
                        _targetDate.tasks.push(targetTaskID);
                      } else {
                        _targetDate.tasks = _targetDate.tasks.filter(task => task !== targetTaskID);
                      }
                      const addReq = cursor.update(_targetDate);
                      addReq.onsuccess = () => {
                        return resolve(_targetDate);
                      };
                    });
                    return Promise.resolve(process);
                  } else {
                    // Target date does not exist, so we should create one and try again
                    const retryTheProcess = new Promise((resolve, reject) => {
                      const initTheDate = new Day(targetDate);
                      resolve(initTheDate);
                    }).then(targetDateObj => {
                      // "rtp" stands for "Retry The Process"
                      const rtp = modification(action, targetTaskID, targetDate);
                      return Promise.resolve(rtp);
                    });
                    return Promise.resolve(retryTheProcess);
                  }
                });
                return Promise.resolve(cursorProcess);
              });
              return mProcess;
            }
            if (overplus > 0) {
              // So the new scheduledDays is more than the older one
              let i, j;
              for (i = 0, j = 0; i < overplus; i++, j++) {
                j = j >= pattern.length ? 0 : j;
                let calculatedDate;
                if (flagDates[j]) {
                  calculatedDate = calculateFewDaysBeforeOrAfter(7, 'after', 'en-US', flagDates[j]);
                } else {
                  const interval = pattern[0] - pattern[j] > 0 ? pattern[0] - pattern[j] : (7 - pattern[0]) + pattern[j];
                  calculatedDate = calculateFewDaysBeforeOrAfter(interval, 'after', 'en-US', targetTask.startDate);
                  flagDates[j] = calculatedDate;
                }
                 const request = modification('add', this.id, calculatedDate);
                 requests.push(request);
              }
            } else if (overplus < 0) {
              // So the new scheduledDays is less than the older one
              overplus = Math.abs(overplus);
              let i, j;
              for (i = 0, j = 0; i < overplus; i++, j++) {
                j = j >= pattern.length ? 0 : j;
                let calculatedDate;
                if (flagDates[j]) {
                  calculatedDate = calculateFewDaysBeforeOrAfter(7, 'before', 'en-US', flagDates[j]);
                } else {
                  const interval = pattern[0] - pattern[j] > 0 ? pattern[0] - pattern[j] : (7 - pattern[j]) + pattern[0];
                  calculatedDate = calculateFewDaysBeforeOrAfter(interval, 'before', 'en-US', targetTask.startDate);
                  flagDates[j] = calculatedDate;
                }
                const request = modification('delete', this.id, calculatedDate);
                requests.push(request);
              }
            }
            const requestsResults = Promise.all(requests);
            requestsResults.then(responses => {
              return Promise.resolve(responses);
            });
            return Promise.resolve(requestsResults);
          }
        });

        modifyRequests.push(modifySchedule);
      }

      const modificationProcess = Promise.all(modifyRequests);
      modificationProcess.then(responses => {
        return Promise.resolve(responses);
      });
      return Promise.resolve(modificationProcess);
    });

    return editProcess;
  }

  delete() {
    // Main code
    const deleteProcess = new Promise((resolve, reject) => {
      const objectStoresReq = getOS(['days_ahead', 'todo_items']);
      objectStoresReq.then(objectStores => {
        return Promise.resolve(objectStores);
      });
      resolve(objectStoresReq);
    }).then(objectStores => {
      // Delete todo item from target dates
      const deleteRequests = [];
      /* Modify the this.pattern and sort it to match with today weekday cause:
      if we don't do this the difference between first target weekday and today weekday is be negative
      and can't find it in object store */
      const originDate = new Date(this.startDate).getTime() >= new Date().getTime() ? this.startDate : _Date('en-US');
      const originWeekday = new Date(originDate).getDay();
      const patternPart1 = this.pattern.filter(element => element >= originWeekday);
      const patternPart2 = this.pattern.filter(element => element < originWeekday);
      const pattern = [...patternPart1, ...patternPart2];
      /* TODO: byd barash ye comment khob bzrm; jryansh hm ine k in vas calculatedDate has k
      az edame on bre jolo (age tedad mal ye weekday az 1 bishtr bd) */
      const flagDates = new Array(pattern.length);
      const daysAheadOS = objectStores[0];
      let i, j;
      const limit = this.remainedDays ? this.remainedDays : 1;
      for (i = 0, j = 0; i < limit; i++, j++) {
        j = j >= pattern.length ? 0 : j;
        let calculatedDate, step = 0;
        do {
          if (flagDates[j]) {
            calculatedDate = calculateFewDaysBeforeOrAfter(7, 'after', 'en-US', flagDates[j]);
          } else {
            calculatedDate = calculateFewDaysBeforeOrAfter(step, 'after', 'en-US', originDate);
          }
          step++;
        } while (new Date(calculatedDate).getDay() !== pattern[j]);
        flagDates[j] = calculatedDate;
        // "DAOS" stands for "days ahead object store"
        const deleteFromDAOS  = new Promise((resolve, reject) => {
          const cursorReq = daysAheadOS.openCursor(calculatedDate);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            resolve(cursor);
          };
        }).then(cursor => {
          if (cursor) {
            const deleteFromTargetDate = new Promise((resolve, reject) => {
              const targetDate = cursor.value;
              targetDate.tasks = targetDate.tasks.filter(element => element !== this.id);
              const deleteReq = cursor.update(targetDate);
              deleteReq.onsuccess = () => {
                return resolve();
              };
            });
            return Promise.resolve(deleteFromTargetDate);
          }
        });
        deleteRequests.push(deleteFromDAOS);
      }
      // Check for all the update requests be successful
      const requestsResults = Promise.all(deleteRequests);
      requestsResults.then(responses => {
        // Delete the task from todo_items object store
        const todoItemsOS = objectStores[1];
        // "TIOS" stands for "Todo Items Object Store"
        const deleteFromTIOS = new Promise((resolve, reject) => {
          const cursorReq = todoItemsOS.openCursor(this.id);
          cursorReq.onsuccess = event => {
            const cursor = event.target.result;
            if (cursor) {
              const deleteFromOS = new Promise((resolve, reject) => {
                const deletedTask = {
                  subject: this.subject,
                  timer: this.timer,
                  scheduledDays: this.scheduledDays,
                  pattern: this.pattern,
                  startDate: this.startDate,
                  pin: this.pin,
                  description: this.description,
                };
                const deleteReq = todoItemsOS.delete(this.id);
                deleteReq.onsuccess = () => {
                  return resolve(deletedTask);
                }
              });
              return resolve(deleteFromOS);
            } else {
              return resolve();
            }
          };
        });
        return Promise.resolve(deleteFromTIOS);
      });
      return Promise.resolve(requestsResults);
    });

    return deleteProcess;
  }

  static restore(taskId) {
    // Verify the argument
    if (typeof taskId !== 'string') {
      throw new TypeError('Invalid argument');
    }
    // Main code
    const restoreProcess = new Promise((resolve, reject) => {
      const objectStoreReq = getOS(['todo_items']);
      objectStoreReq.then(objectStore => {
        return Promise.resolve(objectStore);
      });
      resolve(objectStoreReq);
    }).then(objectStore => {
      const todoItemsOS = objectStore[0];
      const cursorProcess = new Promise((resolve, reject) => {
        const cursorReq = todoItemsOS.openCursor(taskId);
        cursorReq.onsuccess = event => {
          const cursor = event.target.result;
          if (cursor) {
            const targetTask = cursor.value;
            const restoredTask = new ToDoItem(targetTask.subject, targetTask.timer, targetTask.scheduledDays,
            targetTask.pattern, targetTask.startDate, targetTask.pin, targetTask.description, targetTask.id);
            return resolve(restoredTask);
          } else {
            return reject(new ReferenceError('The task id does not exist in object store'));
          }
        };
      });
      return Promise.resolve(cursorProcess);
    });

    return restoreProcess;
  }
}

function userSetting(command = 'check', targetValue) {
  // Verify arguments
  if (command !== 'check' && command !== 'autoArrange' && command !== 'timeFormat' && command !== 'todayArrange') {
    throw new RangeError('Invalid command');
  } else if ((command === 'autoArrange' && targetValue && typeof targetValue !== 'boolean')
  || (command === 'timeFormat' && targetValue && targetValue !== 'mm:ss' && targetValue !== 'mm')) {
    throw new RangeError(`Invalid value for ${command} command`);
  }
  // Verify object deeply
  function verifyObject(object) {
    if (object.constructor === Object) {
      const objectEntries = Object.entries(object);
      let key, value;
      for([key, value] of objectEntries) {
        const parsedKey = Number(key);
        if (parsedKey > 0 && Number.isInteger(parsedKey)) {
          if (value.constructor === Object) {
            const valueKeys = Object.keys(value);
            switch (true) {
              case valueKeys.includes('pin') && typeof value.pin !== 'boolean':
                throw new TypeError(`The value of pin in \"${key}\" object is not boolean`);
              case valueKeys.includes('timer') && !Number(value.timer) > 0 && !Number.isInteger(value.timer):
                throw new TypeError(`The value of timer in \"${key}\" object should be a non-negative number`);
              case valueKeys.includes('order') && !Number(value.order) > 0 && !Number.isInteger(value.order):
                throw new TypeError(`The value of order in \"${key}\" object should be a non-negative number`);
              case valueKeys.includes('rootObject') && value.rootObject.constructor !== ToDoItem:
                const rootObject = value.rootObject;
                if (typeof rootObject.subject !== 'string' || rootObject.timer <= 0 || !Number.isInteger(rootObject.timer)
                || typeof rootObject.pin !== 'boolean' || typeof rootObject.description !== 'string'
                || rootObject.pattern.constructor !== Array
                || !rootObject.pattern.every(weekday => Number.isInteger(weekday) && weekday <= 6 && weekday >= 0)
                || rootObject.scheduledDays < 0 || !Number.isInteger(rootObject.scheduledDays) || typeof rootObject.startDate !== 'string'
                || !new Date(rootObject.startDate).getTime() || !Number(rootObject.id) > 0) {
                  throw new TypeError(`The root object in \"${key}\" object is invalid`);
                }
                break;
              default:
                if (!valueKeys.includes('pin') || !valueKeys.includes('timer') || !valueKeys.includes('order') || !valueKeys.includes('rootObject')) {
                  throw new RangeError(`The \"${key}\" object is incomplete`);
                }
            }
          } else {
            throw new TypeError(`The value of \"${key}\" id is not an object`);
          }
        } else {
          throw new TypeError(`\"${key}\" key is invalid to be an id`);
        }
      }
      // Sync the orders with number of tasks
      const sortedObjectEntriesByOrder = objectEntries.sort((aArray, bArray) => aArray[1].order - bArray[1].order);
      const length = sortedObjectEntriesByOrder.length;
      let i;
      for (i = length - 1; i >= 0; i--) {
        const taskId = sortedObjectEntriesByOrder[i][0];
        object[taskId].order = i;
      }
    } else {
      throw new TypeError(`Invalid value for ${command} command`);
    }
  }
  // Main code
  switch (command) {
    case 'autoArrange':
      if (targetValue) {
        localStorage.setItem(command, targetValue);
        return targetValue;
      } else {
        const autoArrange = localStorage.getItem(command);
        if (autoArrange !== 'true' && autoArrange !== 'false') {
          localStorage.setItem(command, false);
          return false;
        } else {
          return JSON.parse(autoArrange);
        }
      }
      break;
    case 'timeFormat':
      if (targetValue) {
        localStorage.setItem(command, targetValue);
        return targetValue;
      } else {
        const timeFormat = localStorage.getItem(command);
        if (timeFormat !== 'mm' && timeFormat !== 'mm:ss') {
          localStorage.setItem(command, 'mm');
          return 'mm';
        } else {
          return timeFormat;
        }
      }
      break;
    case 'todayArrange':
      if (targetValue) {
        verifyObject(targetValue);
        const objectJSON = JSON.stringify(targetValue);
        localStorage.setItem(command, objectJSON);
        return targetValue;
      } else {
        try {
          const userArrange = JSON.parse(localStorage.getItem(command));
          verifyObject(userArrange);
          return userArrange;
        } catch (exception) {
          console.error(exception);
          arrangeList(true);
          throw exception;
        }
      }
      break;
    default:
      /* Check the setting */
      // Check the auto arrange value
      const autoArrange = localStorage.getItem('autoArrange');
      if (autoArrange !== 'false' && autoArrange !== 'true') {
        localStorage.setItem('autoArrange', false);
      }

      // Check the time format value
      const timeFormat = localStorage.getItem('timeFormat');
      if (timeFormat !== 'mm' && timeFormat !== 'mm:ss') {
        localStorage.setItem('timeFormat', 'mm');
      }

      // Check the last user check
      const lastSeen = localStorage.getItem('lastSeen');
      const lastSeenInMS = new Date(lastSeen).getTime();
      const todayInMS = new Date(_Date('en-US')).getTime();
      if (lastSeenInMS === todayInMS) {
        try {
          let todayArrange = userSetting('todayArrange');
          todayArrange = Object.values(todayArrange);
          todayArrange = todayArrange.sort((task1, task2) => task1.order - task2.order);
          todayArrange = todayArrange.map(task => ToDoItem.restore(task.rootObject.id));
          Promise.all(todayArrange).then(response => {
            viewItems(response);
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        const lastSeenDayTaskArrange = userSetting('todayArrange');
        if (Object.keys(lastSeenDayTaskArrange).length) {
          determineTaskStatus(Object.values(lastSeenDayTaskArrange), lastSeen, true);
        } else {
          Day.memorize();
          Day.delete();
          localStorage.setItem('lastSeen', _Date('en-US'));
          arrangeList(true);
        }
      }
  }
}

function sortTasks(task1, task2) {
  let task1Pin, task1Order, task1Subject;
  let task2Pin, task2Order, task2Subject;
  if (isElement(task1) && isElement(task2)) {
    task1Pin = task1.getAttribute('data-pin') === 'true' ? true : false;
    task1Order = parseInt(getComputedStyle(task1).order);
    task1Subject = task1.querySelector('p').innerText;
    task2Pin = task2.getAttribute('data-pin') === 'true' ? true : false;
    task2Order = parseInt(getComputedStyle(task2).order);
    task2Subject = task2.querySelector('p').innerText;
  } else {
    task1Pin = task1.pin;
    task1Order = typeof task1.order === 'number' ? task1.order : 0;
    task1Subject = task1?.rootObject?.subject || task1.subject;
    task2Pin = task2.pin;
    task2Order = typeof task2.order === 'number' ? task2.order : 0;
    task2Subject = task2?.rootObject?.subject || task2.subject;
  }
  switch (true) {
    // Sort by pin value
    case task1Pin === task2Pin:
      // The pin values are the same, so we sort by order
      if (task1Order < task2Order) {
        return -1;
      } else if (task1Order > task2Order) {
        return 1;
      } else {
        // The orders are the same, so we sort by name
        if (task1Subject < task2Subject) {
          return -1;
        } else if (task1Subject > task2Subject) {
          return 1;
        } else {
          // The names are the same, so we sort by id
          if (task1.id < task2.id) {
            return -1;
          } else if (task1.id > task2.id) {
            return 1;
          } else {
            // This condition is almost impossible
            return 0;
          }
        }
      }
      break;
    case task1Pin:
      return -1;
    case task2Pin:
      return 1;
    default:
      console.log(task1Pin, task2Pin);
      throw new Error('Unexpected error!');
  }
}
