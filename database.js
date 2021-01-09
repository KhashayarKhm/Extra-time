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
}

function removeDuplicateValue(array) {
  // Handeling argument
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
  // Handeling the arguments
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
  // Handeling the arguments
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
  : Math.abs(originDateInMillisec + interval);
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
      daysAhead.createIndex('data', 'date', {
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
      // Second objectStore
      const todoItems = database.createObjectStore('todo_items', { keyPath: 'id', autoIncrement: false });
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
      todoItems.createIndex('pin', 'pin', {
        unique: false
      });
      todoItems.createIndex('description', 'description', {
        unique: false
      });
      // Third objectStore
      const spentWeekOS = database.createObjectStore('spent_week', { keyPath: 'date', autoIncrement: false });
      spentWeekOS.createIndex('data', 'date', {
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
    // Handeling the date argument
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
          const newDay = {
            date: this.date,
            tasks: this.tasks,
            doneTasks: this.doneTasks,
            weekday: this.weekday,
            skippedTasks: this.skippedTasks,
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
    // Handeling argument and the date
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

  doneTask(taskId) {
    // Handeling argument and the date
    if (typeof taskId !== 'string') {
      throw new TypeError('Invalid argument');
    }
    const targetDate = new Date(this.date).getTime();
    const now = new Date(_Date('en-US')).getTime();
    if (targetDate !== now) {
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

  static async delete() {
    // Main code
    const databaseReq = await window.indexedDB.open('todo_db', 1);
    let database;
    databaseReq.onsuccess = event => {
      database = event.target.result;
    };
    const transaction = await database.transaction(['spent_week'], 'readwrite');
    const spentWeekOS = transaction.objectStore('spent_week');
    /* QUESTION: toy cursor 'next' az hmon akhr khodmon miad ya 'prev'?
    age 'next' az akhr shoro mish byd vas hme cursor haro avz krd */
    // Searching for dates in daysAheadOS that spent a week or more to delete them
    const originDate = calculateFewDaysBeforeOrAfter(7, 'before');
    const cursorReq = spentWeekOS.openCursor();
    cursorReq.onsuccess = event => {
      cursor = event.target.result;
      if (cursor) {
        const record = cursor.value;
        if (new Date(record).getTime() <= new Date(originDate).getTime()) {
          const removeReq = spentWeekOS.delete(record.date);
          removeReq.onsuccess = () => {
            cursor.continue();
          }
        } else {
          cursor.continue();
        }
      }
    };
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
        resolve(cursorProcess);
      }).then(spentDatesObj => {
        // Modify the objects and preparing for add them to spent_week object store
        spentDatesObj = spentDatesObj.map(obj => {
          return {
            date: obj.date,
            tasks: obj.tasks.length,
            doneTasks: obj.doneTasks,
            skippedTasks: obj.skippedTasks,
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
}

class ToDoItem {
  /* WARNING: ToDoItem vqti vas on roz tmom shde dige edit nshe
  dob bshinm function edit ro check khonm chon vqti DayObject.doneTask() rah miofte yki az scheduledDays km mikne o ok mish */
  constructor(subject, timer, scheduledDays = 0, pattern = [0, 1, 2, 3, 4, 5, 6], originDate = '', pin = false, description = '', id = '') {
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
      case typeof originDate !== 'string':
        throw new TypeError('\"originDate\" is invalid argument');
      case typeof pin !== 'boolean':
        throw ['type', pin];
      case typeof description !== 'string':
        throw new TypeError('\"description\" is invalid argument');
      case id && _caller() !== 'restore':
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
        // Verify originDate
        if (originDate) {
          if (!new Date(originDate).getTime()) {
            throw new RangeError('Invalid date');
          } else {
            const _date = new Date(originDate).getTime();
            const now = new Date(_Date('en-US')).getTime();
            if (_date < now) {
              throw new RangeError('This date is over');
            }
          }
        } else {
          originDate = _Date('en-US');
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
    /* FIXME: inja ro bdn byd az package uuid estfade krd
    2- momkne k id tkrari bash pas byd ye check knm
    3- momkne khod uuid moshkl pyda kne pas byd toy try...catch bash */
    if (id) {
      console.info('restore');
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
          const originWeekday = new Date(originDate).getDay();
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
                calculatedDate = calculateFewDaysBeforeOrAfter(step, 'after', 'en-US', originDate);
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

  async edit(properties, values) {
    // Handeling arguments
    switch (true) {
      case !properties instanceof Array:
        throw new TypeError(`${properties} is invalid argument`);
      case !values instanceof Array:
        throw new TypeError(`${values} is invalid argument`);
      case properties.length >= 6 && values.length === 0:
      case values.length >= 6 && values.length === 0:
      case properties.length !== values.length:
        throw new RangeError('Invalid arrays length');
      }
      properties = removeDuplicateValue(properties);
      let i;
      const length = properties.length;
      for (i = 0; i < length; i++) {
        switch (properties[i]) {
          case 'subject':
            if (typeof values[i] !== 'string') {
              throw new TypeError(`${values[i]} is invalid for ${properties[i]}`);
            }
            break;
          case 'scheduledDays':
            if (typeof values[i] !== 'number') {
              throw new TypeError(`${values[i]} is invalid for ${properties[i]}`);
            } else if (values[i] < 0 || !Number.isInteger(values[i])) {
              throw new RangeError('radix must be an integer and non-negative');
            }
            break;
          case 'timer':
            if (typeof values[i] !== 'number') {
              throw new TypeError(`${values[i]} is invalid for ${properties[i]}`);
            } else if (values[i] <= 0 || !Number.isInteger(values[i])) {
              throw new RangeError('radix must be an integer and non-negative and non-zero');
            }
            break;
          case 'pin':
            if (typeof values[i] !== 'boolean') {
              throw new TypeError(`${values[i]} is invalid for ${properties[i]}`);
            }
            break;
          case 'description':
            if (typeof values[i] !== 'string') {
              throw new TypeError(`${values[i]} is invalid for ${properties[i]}`);
            }
            break;
          case 'pattern':
            if (values[i] instanceof Array) {
              const patternValues = values[i];
              if (patternValues.length < 7 || patternValues.length !== 0) {
                const validValue = patternValues.every()(item => {
                  return Number.isInteger(item) && item <= 6 && item >= 0;
                });
                if (validValue) {
                  patternValues = patternValues.sort();
                  patternValues = removeDuplicateValue(patternValues);
                } else {
                  throw new TypeError(`${patternValues} is invalid value for pattern`);
                }
              } else {
                throw new RangeError('Invalid array length for pattern');
              }
            } else {
              throw new TypeError(`${values[i]} is invalid for ${properties[i]}`);
            }
            break;
          default:
            throw new TypeError(`${properties[i]} is invalid property`);
        }
      }
    // Main code
    const request = await window.indexedDB.open('todo_db', 1);
    let database;
    request.onsuccess = event => {
      database = event.target.result;
    };
    const updatedTask = this;
    const unchangedTask = this;
    const daysAheadTransaction = await database.transaction(['days_ahead'], 'readwrite');
    const daysAheadOS = daysAheadTransaction.objectStore('days_ahead').index('weekday');
    const todoItemTransaction = database.transaction(['todo_items'], 'readwrite');
    const todoItemsOS = todoItemTransaction.objectStore('todo_items');
    for (i = 0; i < length; i++) {
      switch (properties[i]) {
        case 'subject':
          updatedTask.subject = values[i];
          break;
        case 'scheduledDays':
          if (unchangedTask.scheduledDays > values[i]) {
            const length = updatedTask.pattern.length;
            let j = 0, overplus = unchangedTask.scheduledDays - values[i], overplusToken;
            do {
              if (j >= length) {
                break;
              }
              overplusToken = overplus / (length - j);
              j++;
            } while (!Number.isInteger(overplusToken));
            // WARNING: inja ye check knm age roy index miad pas fk knm byd yki dige hm km krd
            let exceptionToken = length - j - 1;
            const pattern = updatedTask.pattern.reverse();
            for (j = 0; j <  length; j++) {
              const cursorReq = daysAheadOS.openCursor(pattern[j], 'prev');
              let et = exceptionToken > 0 ? 1 : 0;
              cursorReq.onsuccess = event => {
                let ot = overplusToken;
                const cursor = event.target.result;
                if (cursor && (ot + et)) {
                  let targetDay = cursor.value;
                  if (targetDay.tasks.includes(updatedTask.id)) {
                    targetDay.tasks = targetDay.tasks.filter(taskId => {
                      return taskId !== updatedTask.id;
                    });
                    const updateReq = cursor.update(targetDay);
                    updateReq.onsuccess = () => {
                      ot--;
                      cursor.continue();
                    };
                    exceptionToken--;
                  }
                }
              };
            }
          } else if (unchangedTask.scheduledDays < values[i]) {
            const length = updatedTask.pattern.length;
            let j = 0, overplus = values[i] - unchangedTask.scheduledDays, overplusToken;
            do {
              if (j >= length) {
                break;
              }
              overplusToken = overplus / (length - j);
              j++;
            } while (!Number.isInteger(overplusToken));
            // WARNING: inja ye check knm age roy index miad pas fk knm byd yki dige hm km krd
            let exceptionToken = length - j -1;
            for (j = 0; j < length; j++) {
              const cursorReq = daysAheadOS.openCursor(updatedTask.pattern[j]);
              let et = exceptionToken > 0 ? 1 : 0;
              cursorReq.onsuccess = event => {
                let ot = overplusToken;
                const cursor = event.target.result;
                if (cursor && (ot + et)) {
                  let targetDay = cursor.value;
                  if (!targetDay.tasks.includes(updatedTask.id)) {
                    targetDay.tasks.push(updatedTask.id);
                    const updateReq = cursor.update(targetDay);
                    updateReq.onsuccess = () => {
                      ot--;
                      cursor.continue();
                    };
                    exceptionToken--;
                  }
                }
              };
            }
          }
          // Modify the scheduledDays
          updatedTask.scheduledDays = values[i];
          break;
        case 'timer':
          updatedTask.timer = values[i];
          break;
        case 'pin':
          updatedTask.pin = values[i];
          break;
        case 'description':
          updatedTask.description = values[i];
          break;
        case 'pattern':
          const oldPattern = unchangedTask.pattern;
          const newPattern = values[i].sort();
          let deletePattern = oldPattern, addPattern = newPattern, j;
          let length = newPattern.length >= oldPattern.length ? newPattern.length : oldPattern.length;
          for (j = 0; j < length; j++) {
            if (oldPattern[j]) {
              const value = oldPattern[j];
              addPattern = addPattern.filter(item => {
                return value !== item;
              });
            }
            if (newPattern[j]) {
              const value = newPattern[j];
              deletePattern = deletePattern.filter(item => {
                return value !== item;
              });
            }
          }
          length = deletePattern.length;
          for (j = 0; j < length; j++) {
            const cursorReq = daysAheadOS.openCursor(deletePattern[j]);
            cursorReq.onsuccess = event => {
              const cursor = event.target.result;
              if (cursor) {
                let targetDay = cursor.value;
                if (targetDay.tasks.includes(updatedTask.id)) {
                  targetDay.tasks = targetDay.tasks.filter(taskId => {
                    return taskId !== updatedTask.id;
                  });
                  const updateReq = cursor.update(targetDay);
                  updateReq.onsuccess = () => {
                    cursor.continue();
                  };
                }
              }
            };
          }

          let weekdaysToken;
          length = addPattern.length;
          j = 0;
          do {
            if (j >= length) {
              break;
            }
            weekdaysToken = updatedTask.scheduledDays / (length - j);
            j++;
          } while (!Number.isInteger(weekdaysToken));
          // WARNING: inja ye check knm age roy index miad pas fk knm byd yki dige hm km krd
          // TODO: ino bdn test knm k ba ye -1 ok mish ya n
          let exceptionToken = length - j - 1;
          for (j = 0; j < length; j++) {
            const cursorReq = daysAheadOS.openCursor(addPattern[j]);
            let et = exceptionToken > 0 ? 1 : 0;
            cursorReq.onsuccess = event => {
              let wt = weekdaysToken;
              const cursor = event.target.result;
              if (cursor && (wt + et)) {
                const targetDay = cursor.value;
                targetDay.tasks.push(updatedTask.id);
                const updateReq = cursor.update(targetDay);
                updateReq.onsuccess = () => {
                  wt--;
                  cursor.continue();
                };
                exceptionToken--;
              }
            };
          }
          // Modify the pattern
          updatedTask.pattern = newPattern;
          break;
        default:
          throw new TypeError(`${properties[i]} is invalid property`);
      }
    }
  }

  async delete() {
    // Main code
    const databaseReq = window.indexedDB.open('todo_db', 1);
    let database;
    databaseReq.onsuccess = event => {
      database = event.target.result;
    };
    // Delete the target todo item from all days with its pattern
    const daysAheadTransaction = await database.transaction(['days_ahead'], 'readwrite');
    const daysAheadOS = daysAheadTransaction.objectStore('days_ahead');
    let weekdaysToken, j = 0;
    const length = this.pattern.length;
    do {
      if (j >= length) {
        break;
      }
      weekdaysToken = this.scheduledDays / (length - j);
      j++;
    } while (!Number.isInteger(weekdaysToken));
    // WARNING: inja ye check knm age roy index miad pas fk knm byd yki dige hm km krd
    // TODO: ino bdn test knm k ba ye -1 ok mish ya n
    let exceptionToken = length - j - 1;
    for (j = 0; j < length; j++) {
      const cursorReq = daysAheadOS.openCursor(this.pattern[j]);
      let et = exceptionToken > 0 ? 1 : 0;
      cursorReq.onsuccess = event => {
        let wt = weekdaysToken;
        const cursor = event.target.result;
        if (cursor && (wt + et)) {
          const targetDay = cursor.value;
          targetDay.tasks = targetDay.tasks.filter(taskId => {
            return taskId !== this.id;
          });
          const updateReq = cursor.update(targetDay);
          updateReq.onsuccess = () => {
            wt--;
            cursor.continue();
          };
          exceptionToken--;
        }
      };
    }
    // Delete the target todo item from todoItemsOS
    const todoItemTransaction = database.transaction(['todo_items'], 'readwrite');
    const todoItemsOS = todoItemTransaction.objectStore('todo_items');
    const request = todoItemsOS.delete(this.id);
    todoItemTransaction.oncomplete = () => {
      // TODO: ui function
    };
  }

  static async restore(taskId) {
    // Handeling the argument
    if (typeof taskId !== 'string') {
      throw new TypeError('Invalid argument');
    }
    // Main code
    const databaseReq = await window.indexedDB.open('todo_db', 1);
    let database;
    databaseReq.onsuccess = event => {
      database = event.target.result;
    };
    const transaction = await database.transaction(['todo_items'], 'readwrite');
    const todoItemsOS = transaction.objectStore('todo_db');
    const cursorReq = todoItemsOS.openCursor(taskId);
    let restoredTask;
    cursorReq.onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        const targetTask = cursor.value;
        restoredTask = new ToDoItem(targetTask.subject, targetTask.timer, targetTask.scheduledDays,
        targetTask.pattern, targetTask.pin, targetTask.description, targetTask.id);
        // IDEA: age besh hminja jay kol function return krd khobe
      } else {
        throw new RangeError('Can not find the taskId in database');
      }
    };
    return await restoredTask;
  }
}
