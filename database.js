/* QUESTION: bbinm ino inja gzashtm drst kar mikne ya n
mit ba EventListener ok knmsh vli avl bbinm async bash ch frqi dre (sari tr anjam mish va inke mish ui zd knarsh)
: age async ngrft mish sync code zd functiona ro va bdsh toy app.js Promise bznim */
// IDEA: age besh btonm line error ro tori tanzim knim k bge koja in moshkl has n inke koja in log ro zdim
/* WARNING: az teknik `${script}` fk nknm byd estfade krd chon fk knm az evel estfade mikne
: edit va functiona az in dst nbyd az object chizi dryaft knn va byd khodshon az database bgirn(fqt id ya date ro migirn) */
/* QUESTION: chi kar knim k indexedDB ro nshe ro console dst kari krd?
age nshe byd az rah 2 soal bala estfade knm (try..catch) */
// NOTE: age on async await ha kar krd dige hme Promise haro onjori miznim
// TODO: age brname crash krd ui function ro call kne
// QUESTION: in function hay async ro bdon async/await bnvism ch frqi dre?
/* COMBAK: function static memorize&delete ro hr moqe k barname baz shd ejra knm k toy kol bere bgrde chizi shd bde */
/* FIXME: ysri az transaction ha EventListener khorde roy request,
onaii k ysare mire vas ui function ro EventListener shono avaz knm o bzrm roy transaction */
/* BUG: fk knm in do...while k vas mohasbe roza gzashtm eshtbe
bjash byd ybar %7(roz baqi az hfte) krd ybar /7(hfte haii k gzsht) */
/* BUG: function _caller fqt esm mide o khod function ro nmide va mish ba ye function dige ba hmon esm drst krd o rid bhsh */
/* IDEA: mit bjay inke hme edit haro bhshon object jdid
 return knim mish property hay object ro getter gzsht k hrdfe jdid trin ro update mikne */
/* FIXME: onaii k object ro freeze miknm bzrm toy finally : taze mikhastm bgm asln niazi ni k hmja try...catch zd
: jryan finally ro byd az avl vas hme class ha gzasht
  Object.preventExtensions(ToDoItem.prototype);
  Object.freeze(ToDoItem.prototype);
  Object.seal(ToDoItem.prototype);
  Object.preventExtensions(Day.prototype);
  Object.freeze(Day.prototype);
  Object.seal(Day.prototype);
 */
/* REVIEW: functionaii k comment gzashtm
          1. Day => constructor, addTask
*/
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
  try {
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
  } catch (exception) {
    throw exception;
  }
}

function _Date(local, splicer = '/') {
  try {
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
  } catch (exception) {
    throw exception;
  }
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

  addTask(taskId) {
    // NOTE: test kaml nshde
    // Handeling argument and date
    if (typeof taskId !== 'string') {
      throw new TypeError('The taskId value is invalid');
    } else {
      const targetDate = new Date(this.date).getTime();
      const now = new Date(_Date('en-US')).getTime();
      if (targetDate < now) {
        throw new RangeError('This date is over');
      }
    }
    // Main code
    const addTaskProcess = new Promise((resolve, reject) => {
      const objectStores = getOS(['todo_items', 'days_ahead']);
      // wait till object store request success
      objectStores.then(response => {
        Promise.resolve(response);
      });
      resolve(objectStores);
    }).then(objectStores => {
      // Verify the task id
      const todoItemsOS = objectStores[0];
      const verifyAndAddProcess = new Promise((resolve, reject) => {
        console.log('b1.1');
        const cursorReq = todoItemsOS.openCursor(taskId);
        cursorReq.onsuccess = event => {
          console.log('b1.2');
          resolve(event.target.result);
        };
      }).then(cursor => {
        console.log('b2');
        if (cursor) {
          const daysAheadOS = objectStores[1];
          Promise.resolve(daysAheadOS);
        } else {
          return Promise.reject(new RangeError('The specified task id is invalid'));
        }
      }).then(daysAheadOS => {
        console.log('b3.1');
        console.log(daysAheadOS);
        // const daysAheadOS = objectStores[1];
        const cursorProcess = new Promise((resolve, reject) => {
          console.log('b3.2');
          const cursorReq = daysAheadOS.openCursor(this.date);
          // wait till cursor request success
          cursorReq.onsuccess = event => {
            console.log('b3.3');
            const cursor = event.target.result;
            resolve(cursor);
          };
        }).then(cursor => {
          console.log('b3.4');
          if (cursor) {
            const targetDate = cursor.value;
            targetDate.tasks.push(taskId);
            const updateReq = new Promise((resolve, reject) => {
              console.log('b3.5');
              const request = cursor.update(targetDate);
              // wait till update request success
              request.onsuccess = () => {
                console.log('b3.6');
                resolve();
              }
            }).then(() => {
              console.log('b3.7');
              const dateTime = new Date(targetDate.date).getTime();
              const now = new Date(_Date('en-US')).getTime();
              if (dateTime === now) {
                return Promise.resolve(true);
              }
              return Promise.resolve(false);
            }).catch(exception => {
              // COMBAK: inja byd y code bazgashti bznm
              console.error(exception);
              console.info('catch execute: byd catch ro drst knm k dob request bfrste');
            });

            return Promise.resolve(updateReq);
          } else {
            return Promise.reject(new DOMException('The specified key or key range is invalid', 'DataError'));
          }
        });

        return Promise.resolve(cursorProcess);
      });

      return Promise.resolve(verifyAndAddProcess);
    })

    return addTaskProcess;
  }

  async skipTask(taskId) {
    try {
      // Handeling argument and the date
      if (typeof taskId !== 'string') {
        throw new TypeError('The taskId value is invalid');
      }
      const targetDate = new Date(this.date).getTime();
      const now = new Date(_Date('en-US')).getTime();
      if (targetDate < now) {
        throw new RangeError('This date is over');
      }
      // Main code
      const databaseReq = await window.indexedDB.open('todo_db', 1);
      let database;
      databaseReq.onsuccess = event => {
        database = event.target.result;
      };
      const todoItemsOS = await database.transaction('todo_items').objectStore('todo_items');
      const cursorReq = todoItemsOS.openCursor(taskId);
      cursorReq.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          const todoItem = cursor.value;
          let j = 0, weekdaysToken;
          const length = todoItem.pattern.length;
          do {
            if (j >= length) {
              break;
            }
            weekdaysToken = todoItem.scheduledDays / (length - j);
            j++;
          } while (!Number.isInteger(weekdaysToken));
          // WARNING: inja ye check knm age roy index miad pas fk knm byd yki dige hm km krd
          let exceptionToken = length - j - 1;
          const daysAheadOS = database.transaction('days_ahead').objectStore('days_ahead');
          const cursorReq2 = daysAheadOS.index('weekday').openCursor(exceptionToken);
          cursorReq2.onsuccess = event => {
            const cursor2 = event.target.result;
            let et = exceptionToken ? 1 : 0;
            if (cursor2) {
              // QUESTION: weekdaysToken niyaze k yki ezafe she ya n?
              if (!(weekdaysToken + et)) {
                const targetDay = cursor2.value;
                targetDay.tasks.push(taskId);
                cursor2.update(targetDay);
              } else if (weekdaysToken + et > 0) {
                weekdaysToken ? weekdaysToken-- : et ? et-- : undefined;
                cursor2.continue();
              }
            }
          };
          const cursorReq3 = daysAheadOS.openCursor(this.date);
          cursorReq3.onsuccess = event => {
            const cursor3 = event.target.result;
            if (cursor3) {
              const today = cursor3.value;
              today.tasks = today.tasks.filter(item => {
                return item !== taskId;
              });
              today.skippedTasks = today.skippedTasks++;
              cursor3.update(today);
            }
          };
        }
      };

      // TODO: ui function
    } catch (exception) {
      throw exception;
    }
  }

  async doneTask(taskId) {
    try {
      // Handeling argument and the date
      if (typeof taskId !== 'string') {
        throw new TypeError('Invalid argument');
      }
      const targetDate = new Date(this.date).getTime();
      const now = new Date(_Date('en-US')).getTime();
      if (targetDate < now) {
        throw new RangeError('This date is over');
      }
      // Main code
      const databaseReq = await window.indexedDB.open('todo_db', 1);
      let database;
      databaseReq.onsuccess = event => {
        database = event.target.result;
      };
      // transaction1 is for todo item
      const transaction1 = await database.transaction(['todo_items'], 'readwrite');
      const todoItemsOS = transaction1.objectStore('todo_items');
      const cursorReq1 = todoItemsOS.openCursor(taskId);
      cursorReq1.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          const todoItem = cursor.result;
          todoItem.scheduledDays = todoItem.scheduledDays--;
          cursor.update(todoItem);
        }
      };
      // transaction2 is for days ahead
      const transaction2 = database.transaction(['days_ahead'], 'readwrite');
      const daysAheadOS = transaction2.objectStore('days_ahead');
      const cursorReq2 = daysAheadOS.openCursor(this.date);
      cursorReq2.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          const today = cursor.result;
          today.doneTasks = today.doneTasks++;
          cursor.update(today);
        }
      };

      // TODO: ui function
      await uiFunc();
    } catch (exception) {
      throw exception;
    }
  }

  static async delete() {
    try {
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
    } catch (exception) {
      throw exception;
    }
  }

  static async memorize() {
    try {
      // Main code
      const databaseReq = window.indexedDB.open('todo_db', 1);
      let database;
      databaseReq.onsuccess = event => {
        database = event.target.result;
      };
      // Preparation the spent_week objectStore
      const spentWeekOSTransaction = await database.transaction(['spent_week'], 'readwrite');
      const spentWeekOS = spentWeekOSTransaction.objectStore('spent_week');
      // Preparation the days_ahead objectStore
      const daysAheadTransaction = database.transaction(['days_ahead'], 'readwrite');
      const daysAheadOS = daysAheadTransaction.objectStore('days_ahead');
      /* Searching for dates in daysAheadOS that spent
      to delete them from daysAheadOS and add them to spentWeekOS */
      const now = _Date('en-US');
      const cursorReq = daysAheadOS.openCursor();
      cursorReq.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;
          if (record.date === now) {
            // Add the target date to spentWeekOS objectStore
            const addObject = record;
            addObject.tasks = record.tasks.length;
            const addReq = spentWeekOS.add(addObject);
            // Remove the target date from daysAhead objectStore
            const removeReq = daysAheadOS.delete(record.date);
          }
          cursor.continue();
        }
      };
    } catch (exception) {
      throw exception;
    }
  }
}

class ToDoItem {
  /* WARNING: ToDoItem vqti vas on roz tmom shde dige edit nshe
  dob bshinm function edit ro check khonm chon vqti DayObject.doneTask() rah miofte yki az scheduledDays km mikne o ok mish */
  constructor(subject, timer, scheduledDays = 0, pattern = [0, 1, 2, 3, 4, 5, 6], pin = false, description = '', id = '') {
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
      /* REVIEW: in vas in inja has chon mish chnd bar sdash krd age error dd
      joda az in in ravesh code fqt dash id ro b tarikh emroz ezafe mikrd
      alan hm mn chnd bari k test krdm asln kar nmikrd */
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
              })
              return Promise.resolve(updateProcess);
            } else {
              return Promise.reject('!!');
            }
          });
          return Promise.resolve(cursorProcess);
        });

        return process;
      }
      const initTodoItem = new Promise((resolve, reject) => {
        // console.log('initTodoItem-p1');
        const objectStoresReq = getOS(['todo_items', 'days_ahead']);
        objectStoresReq.then(response => {
          // console.log('initTodoItem-p2');
          return Promise.resolve(response);
        });
        resolve(objectStoresReq);
      }).then(objectStores => {
        // console.log('initTodoItem-p3');
        // Initialize the todo item id
        const uniqueId = (Math.random() * 100).toFixed();
        this.id = uniqueId;
        const todoItemsOS = objectStores[0];
        const addProcess = new Promise((resolve, reject) => {
          // console.log('addProcess-p1');
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
            // console.log('addProcess-p2');
            const daysAheadOS = objectStores[1];
            resolve(daysAheadOS);
          }
        }).then(daysAheadOS => {
          // console.log('addProcess-p3');
          if (this.scheduledDays === 0) {
            console.info('Just for today.')
            // Just add it for today
            const cursorProcess = new Promise((resolve, reject) => {
              // console.log('cursorProcess-p1');
              const today = _Date('en-US');
              const cursorReq = daysAheadOS.openCursor(today);
              cursorReq.onsuccess = event => {
                // console.log('cursorProcess-p2');
                const cursor = event.target.result;
                resolve(cursor);
              };
            }).then(cursor => {
              // console.log('cursorProcess-p3');
              /* QUESTION: fk knm dige lzm ni k cursor ro check knm
              chon dige today ro avl kar restore mikne ya jdid misaze */
              const today = cursor.value;
              // console.log(today);
              today.tasks.push(this.id);
              const updateProcess = new Promise((resolve, reject) => {
                // console.log('updateProcess-p1');
                const updateReq = cursor.update(today);
                updateReq.onsuccess = () => {
                  // console.log('updateProcess-p2');
                  resolve();
                }
              }).then(() => {
                // console.log('updateProcess-p3');
                Object.seal(this);
                Object.preventExtensions(this);
                /* WARNING: inja age freeze knm dige nmish edit zd
                age besh ye object update shde frstad toy edit() khobe */
                Object.freeze(this);
                return Promise.resolve(this);
              });
              return Promise.resolve(updateProcess);
            });
            console.warn('return cursorProcess (JFT)');
            return Promise.resolve(cursorProcess);
          } else {
            console.info('for many days');
            // Add task to target days
            const length = this.pattern.length;
            // CHANGED: inja ro jay on do...while gzashtm
            // WARNING: inja ye check knm age roy index miad pas fk knm byd yki dige hm km krd
            let weekdaysToken = parseInt(this.scheduledDays / length);
            let singleDaysToken = this.scheduledDays % length;
            const updateRequests = [];
            /* Modify the this.pattern and sort it to match with today weekday cause:
            if we don't do this the difference between first target weekday and today weekday is be negative
            and can't find it in object store */
            /* IDEA: fk knm age trf bkhad az chnd roz jlo tr barname brize byd jay 'new Date()'
            targetDate gzasht */
            const originWeekday = new Date().getDay();
            const patternPart1 = this.pattern.filter(element => element >= originWeekday);
            const patternPart2 = this.pattern.filter(element => element < originWeekday);
            const pattern = [...patternPart1, ...patternPart2];
            let i, targetWeekday;
            for (targetWeekday of pattern) {
              let wt = weekdaysToken;
              // "sdt" stands for "Single Days Token" (for pointing)
              let sdt = singleDaysToken > 0 ? 1 : 0;
              // IDEA: hmon chizi k toy IDEA qbli gftm inja hm byd bash
              do {
                const color = `rgb(${(Math.random() * 255) + 0}, ${(Math.random() * 255) + 0}, ${(Math.random() * 255) + 0})`;
                const daysInterval = (wt ? (7 * (wt + sdt)) : 0) + Math.abs(originWeekday - targetWeekday);
                const calculatedDate = calculateFewDaysBeforeOrAfter(daysInterval, 'after', 'en-US');
                const cursorProcess = new Promise((resolve, reject) => {
                  // console.log(`cursorProcess-p1 %c (${calculatedDate})`, `color: ${color};`);
                  const cursorReq = daysAheadOS.openCursor(calculatedDate);
                  cursorReq.onsuccess = event => {
                    // console.log(`cursorProcess-p2 %c (${calculatedDate})`, `color: ${color};`);
                    const cursor = event.target.result;
                    resolve(cursor);
                  }
                }).then(cursor => {
                  // console.log(`cursorProcess-p3 %c (${calculatedDate})`, `color: ${color};`);
                  // let wt = weekdaysToken;
                  if (sdt + wt) {
                    if (cursor) {
                      const targetDate = cursor.value;
                      const updateProcess = new Promise((resolve, reject) => {
                        // console.log(`updateProcess-p1 %c (${calculatedDate})`, `color: ${color};`);
                        targetDate.tasks.push(this.id);
                        console.log(`%c ${calculatedDate}`, `color: ${color};`);
                        console.log(targetDate);
                        console.log(cursor);
                        const updateReq = cursor.update(targetDate);
                        updateReq.onsuccess = () => {
                          // console.log(`updateProcess-p2 %c (${calculatedDate})`, `color: ${color};`);
                          return resolve(this);
                        };
                      });
                      console.warn('return updateProcess (way-1)');
                      return Promise.resolve(updateProcess);
                    } else {
                      // The target date does not exist, so we create and add the todo to tasks property
                      const planBProcess = new Promise((resolve, reject) => {
                        // console.log(`planBProcess-p1 %c (${calculatedDate})`, `color: ${color};`);
                        const objectStoreReq = getOS(['days_ahead']);
                        objectStoreReq.then(response => {
                          return Promise.resolve(response);
                        });
                        resolve(objectStoreReq);
                      }).then(_daysAheadOS => {
                        const absenceDate = new Day(calculatedDate);
                        _daysAheadOS = _daysAheadOS[0];
                        // console.log(`planBProcess-p2 %c (${calculatedDate})`, `color: ${color};`);
                        const _cursorProcess = new Promise((resolve, reject) => {
                          // console.log(`_cursorProcess-p1 %c (${calculatedDate})`, `color: ${color};`);
                          const _cursorReq = _daysAheadOS.openCursor(calculatedDate);
                          _cursorReq.onsuccess = event => {
                            // console.log(`_cursorProcess-p2 %c (${calculatedDate})`, `color: ${color};`);
                            const _cursor = event.target.result;
                            resolve(_cursor);
                          };
                        }).then(_cursor => {
                          // console.log(`_cursorProcess-p3 %c (${calculatedDate})`, `color: ${color};`);
                          if (_cursor) {
                            const _targetDate = _cursor.value;
                            _targetDate.tasks.push(this.id);
                            const _updateProcess = new Promise((resolve, reject) => {
                              // console.log(`_updateProcess-p1 %c (${calculatedDate})`, `color: ${color};`);
                              console.log(`%c ${calculatedDate}`, `color: ${color};`);
                              console.log(_targetDate);
                              console.log(_cursor);
                              console.log(absenceDate);
                              const _updateReq = _cursor.update(_targetDate);
                              _updateReq.onsuccess = () => {
                                // console.log(`_updateProcess-p2 %c (${calculatedDate})`, `color: ${color};`);
                                resolve();
                              };
                            }).then(() => {
                              // console.log(`_updateProcess-p3 %c (${calculatedDate})`, `color: ${color};`);
                              // IDEA: age in log haii k gzashtm fk knm bdone block then hm ok bash
                              return Promise.resolve(this);
                            });
                            return Promise.resolve(_updateProcess);
                          } else {
                            // WARNING: nmid age inja ejra besh vas chie; age nshd koln else ro pk knm ya ye payam khob bzrm
                            return Promise.reject('??');
                          }
                        });
                        return Promise.resolve(_cursorProcess);
                      });
                      console.warn('return planBProcess');
                      return Promise.resolve(planBProcess);
                    }
                  }
                });
                // console.log(`%c add ${calculatedDate}`, `color: ${color}; font-size: 18px;`);
                updateRequests.push(cursorProcess);
                sdt = 0;
                wt--;
              } while (wt > 0);
              singleDaysToken--;
            }
            // Check for all the update requests be successful
            const requests = Promise.all(updateRequests);
            requests.then(responses => {
              // console.log('checkReqs-p1');
              // Promise.resolve();
              Object.preventExtensions(this);
              // QUESTION: ToDoItemObject ro freeze knm?
              Object.freeze(this);
              Object.seal(this);
              // No matter that which one return, all of them are the same
              return Promise.resolve(responses[0]);
            })/*.then((value) => {
            })*/;
            /*const checkRequests = new Promise((resolve, reject) => {
              resolve(requests);
            }).then(response => {
              return response.value;
            })*/
            console.warn('return requests');
            return Promise.resolve(requests);
          }
        });
        console.warn('return addProcess');
        return Promise.resolve(addProcess);
      });
      console.warn('return initTodoItem');
      return initTodoItem;
    }
  }

  async edit(properties, values) {
    try {
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
    } catch (exception) {
      throw exception;
    }
  }

  async delete() {
    try {
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
    } catch (exception) {
      throw exception;
    }
  }

  static async restore(taskId) {
    try {
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
    } catch (exception) {
      throw exception;
    }
  }
}
