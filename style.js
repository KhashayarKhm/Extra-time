function moveSection(prevElement, nextElement, direction, time) {
  try {
    // Handeling arguments
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
      // FIXME: in malom ni ch margeshe
      case nextElement.nextElementSibling !== prevElement && prevElement.previousElementSibling !== nextElement:
        throw new ReferenceError("Elements are not in order");
      case typeof direction !== "string":
        throw new TypeError(`\"${direction}\" type is not string`);
      case direction !== "toLeft" && direction !== "toRight":
        throw new RangeError(`\"${direction}\" argument is not a valid code point`);
      case typeof time !== "number":
        throw new TypeError(`\"${time}\" type is not number`);
      case time < 0:
        throw new RangeError("\"time\" argument is not a valid code point");
    }
    // Main code
    // const styleSheetClasses = document.styleSheets[1].rules;
    const transition = `${time / 1000}s`;
    prevElement.style.transition = transition;
    nextElement.style.transition = transition;
    if (direction === "toRight") {
      let dir = {
        nextElementClass: "moveSection-nextElement-right",
        prevElementClass: "moveSection-prevElement-left",
      };
      // styleSheetClasses[0].style.transition = transition; // 'moveSection-prevElement' class
      // styleSheetClasses[5].style.transition = transition; // 'moveSection-nextElement-right' class
      // nextElement.style.transition = transition;
      // prevElement.style.transition = transition;

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
      // styleSheetClasses[3].style.transition = transition; // 'moveSection-nextElement' class
      // styleSheetClasses[1].style.transition = transition; // 'moveSection-prevElement-left' class
      // prevElement.style.transition = transition;
      // nextElement.style.transition = transition;

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
  } catch (exception) {
    throw exception;
  }
}

// IDEA: age bjay custumAtt, custumAttVal ye object bzrm bhtre
// QUESTION: vas chizi msl xmlns:xlink nmid chi knm
function renderElement(
  tagName,
  content = "",
  className = [],
  idName = "",
  custumAtt = [],
  custumAttVal = []
) {
  try {
    // Handeling arguments
    switch (true) {
      case typeof tagName !== "string" || !tagName:
        throw new TypeError('\"tagName\" is invalid argument');
      case typeof content !== "string" && typeof content !== "number":
        throw new TypeError('\"content\" is invalid argument');
      case typeof className !== "string" && !(className instanceof Array):
        throw new TypeError('\"className\" is invalid argument');
      case typeof idName !== "string":
        throw new TypeError('\"idName\" is invalid argument');
      case !(custumAtt instanceof Array) && typeof custumAtt !== "string":
        throw new TypeError('\"custumAtt\" is invalid argument');
      case !(custumAttVal instanceof Array) && typeof custumAttVal !== "string":
        throw new TypeError('\"custumAttVal\" is invalid argument');
      default:
        if (className instanceof Array) {
          let value;
          for (value of className) {
            if (typeof value !== "string") {
              throw new TypeError('\"className\" value is invalid');
            }
          }
        }
        if (custumAttVal instanceof Array && custumAtt instanceof Array) {
          if (custumAtt.length !== custumAttVal.length) {
            throw new RangeError("invalid arrays length");
          } else {
            let i,
              len = custumAtt.length;
            for (i = 0; i < len; i++) {
              if (typeof custumAtt[i] !== "string") {
                throw new TypeError('\"custumAtt\" value is invalid');
              }
              if (typeof custumAttVal[i] !== "string") {
                throw new TypeError('\"custumAttVal\" value is invalid');
              }
            }
          }
        } else if (
          custumAttVal instanceof Array ||
          custumAtt instanceof Array
        ) {
          throw new RangeError("invalid arrays length");
        }
    }
    // Main code
    const element = document.createElement(tagName);
    if (content) {
      element.textContent = content;
    }
    if (className.length !== 0) {
      if (className instanceof Array) {
        let value;
        for (value of className) {
          element.classList.add(value);
        }
      } else {
        element.classList.add(className);
      }
    }
    if (idName) {
      element.id = idName;
    }
    if (custumAtt.length !== 0) {
      if (custumAtt instanceof Array) {
        let i,
          length = custumAtt.length;
        for (i = 0; i < length; i++) {
          element.setAttribute(custumAtt[i], custumAttVal[i]);
        }
      } else {
        element.setAttribute(custumAtt, custumAttVal);
      }
    }
    return element;
  } catch (exception) {
    throw exception;
  }
}

/* QUESTION: jryan active bdn ya nbodn ro ye function dige taiin kne?
- fk knm niyaz bash k b icon pin ye class pin 'bdim' (nmikhad => fqt lzme k class active qsmt pin ro modify knim) */
function renderTodoItem(todoItemObj) {
  try {
    // Handeling argument
    if (!todoItemObj instanceof ToDoItem) {
      throw new TypeError('\"todoItemObj\" value is invalid');
    }
    // Main code
    const article = renderElement('article');
    const articleBody = renderElement('div', '', 'inactive');
    const subject = renderElement('h4', todoItemObj.subject);
    // Icon attribute standard
    const iconStd = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 64 64',
      role: 'img',
      xmlnsXlink: 'http://www.w3.org/1999/xlink',
    };
    // Pin icon
    const pinSVG = renderElement('svg', '', 'icon', '',
    ['xmlns', 'viewBox', 'role', 'xmlns:xlink'],
    [iconStd.xmlns, iconStd.viewBox, iconStd.role, iconStd.xmlnsXlink]);
    const pinPath1 = renderElement('path', '', '', '',
    ['d'], ['M2.6 61.4l24.2-24.2']);
    const pinPath2 = renderElement('path', '', '', '',
    ['d'], ['M43.1 45V33.7L53.7 23a5 5 0 0 0 6.3-.6l1.4-1.4L43.1 2.6 41.6 4a5 5 0 0 0-.6 6.3L30.3 20.9H19l-4.2 4.2 8.5 8.5 3 3 1 1 3 3 8.5 8.5z']);
    pinSVG.appendChild(pinPath1);
    pinSVG.appendChild(pinPath2);
    // Scheduled days section
    const scheduledDaysBody = renderElement('div', '', 'scheduled-days');
    const scheduledDaysSVG = renderElement('svg', '', 'icon', '',
    ['xmlns', 'viewBox', 'role', 'xmlns:xlink'],
    [iconStd.xmlns, iconStd.viewBox, iconStd.role, iconStd.xmlnsXlink]);
    const scheduledDaysPath1 = renderElement('path', '', '', '',
    ['d'], ['M8 4.2c13.3-6.7 31.7 7.5 48 .2l-16 16 16 14c-15.7 7.7-34.7-6.5-48 .1']);
    const scheduledDaysPath2 = renderElement('path', '', '', '',
    ['d'], ['M8 61.6V3.4']);
    const scheduledDaysSpan = renderElement('span', todoItemObj.scheduledDays);
    scheduledDaysSVG.appendChild(scheduledDaysPath1);
    scheduledDaysSVG.appendChild(scheduledDaysPath2);
    scheduledDaysBody.appendChild(scheduledDaysSVG);
    scheduledDaysBody.appendChild(scheduledDaysSpan);
    // Timer section
    const timerBody = renderElement('div', '', 'remaining-time');
    const timerSVG = renderElement('svg', '', 'icon', '',
    ['xmlns', 'viewBox', 'role', 'xmlns:xlink'],
    [iconStd.xmlns, iconStd.viewBox, iconStd.role, iconStd.xmlnsXlink]);
    const timerPath1 = renderElement('path', '', '', '',
    ['d'], ['M16 55c4 0 9.959-5.608 12.984-8a5.114 5.114 0 0 1 6.024-.016C38.057 49.355 44 55 48 55M20.084 26c8-3.205 14.6 3.65 24.121-.216']);
    const timerPath2 = renderElement('path', '', '', '',
    ['d'], ['M48 62V48.513a14 14 0 0 0-5.953-11.457l-5.527-3.881a1 1 0 0 1 0-1.637l5.526-3.881A14 14 0 0 0 48 16.2V2M16 2v14.2a14 14 0 0 0 5.954 11.457l5.526 3.881a1 1 0 0 1 0 1.637l-5.526 3.881A14 14 0 0 0 16 48.513V62m-3 0h38M13 2h38']);
    const timerPath3 = renderElement('path', '', '', '',
    ['d'], ['M27.816 32.77C30.687 33.5 31.833 37 32 37c.132 0 .867-3.383 4.095-4.7']);
    const timerSpan = renderElement('span', todoItemObj.timer);
    timerSVG.appendChild(timerPath1);
    timerSVG.appendChild(timerPath2);
    timerSVG.appendChild(timerPath3);
    timerBody.appendChild(timerSVG);
    timerBody.appendChild(timerSpan);
    // Assemble the nodes
    articleBody.appendChild(subject);
    articleBody.appendChild(pinSVG);
    articleBody.appendChild(scheduledDaysBody);
    articleBody.appendChild(timerBody);
    article.appendChild(articleBody);
    return article;
  } catch (exception) {
    throw exception;
  }
}
