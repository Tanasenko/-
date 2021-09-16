var users = [{"id":1,"username":"user1","surname":"Петров","firstName":"Иван","secondName":""},{"id":2,"username":"user2","surname":"Иванов","firstName":"Пётр","secondName":""},{"id":3,"username":"user3","surname":"Васильев","firstName":"Артём","secondName":""},{"id":4,"username":"user4","surname":"Кузнецов","firstName":"Сергей","secondName":""},{"id":5,"username":"user5","surname":"Некрасов","firstName":"Артём","secondName":""}];

var tasks = [{"id":"ff0388e8-7417-4ffa-86cc-e791706eceb9","subject":"Анализ","description":"","creationAuthor":1,"executor":1,"creationDate":"2021-09-13","planStartDate":"2021-09-13","planEndDate":"2021-09-15","endDate":"2021-09-13","status":1,"order":1},{"id":"ba746c71-bc05-4980-8309-1924d41de8e6","subject":"Планирование","description":"","creationAuthor":1,"executor":1,"creationDate":"2021-09-13","planStartDate":"2021-09-14","planEndDate":"2021-09-15","endDate":"2021-09-13","status":1,"order":1},{"id":"ad3920f6-d5f0-4adc-bd75-0e1d851554b3","subject":"Проектирование","description":"","creationAuthor":1,"executor":2,"creationDate":"2021-09-13","planStartDate":"2021-09-15","planEndDate":"2021-09-16","endDate":"2021-09-13","status":1,"order":1},{"id":"8eb7ffde-7d59-476a-aca3-4eaae060f046","subject":"Разработка","description":"","creationAuthor":1,"executor":3,"creationDate":"2021-09-13","planStartDate":"2021-09-15","planEndDate":"2021-09-20","endDate":"2021-09-13","status":1,"order":1},{"id":"52a8cc6d-7563-49f0-97e3-bbc4b18a5905","subject":"Тестирование","description":"","creationAuthor":1,"executor":null,"creationDate":"2021-09-13","planStartDate":"2021-09-17","planEndDate":"2021-09-20","endDate":"2021-09-13","status":1,"order":1}];

const table = document.querySelector('.kanban__table');

/*var dateAttr = [];

function getDate() {
    var dates = document.querySelectorAll('.table-date');
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        if (dateAttr.length > 1) {
            dateAttr = [];
            dateAttr.push(`${date.dataset.day}`);
        } else{
            dateAttr.push(`${date.dataset.day}`);
        }
    }
};

getDate();*/

function getUsers() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        console.log(`${dateAttr[0]}`);
        tr.innerHTML = `<td> <div class='user-name'>${user.firstName}</div> </td> <td data-day='${dateAttr[0]}' class='js-cell'></td> <td data-day='${dateAttr[1]}' class='js-cell'></td> <td data-day='2021-09-11' class='js-cell'></td> <td data-day='2021-09-12' class='js-cell'></td> <td data-day='2021-09-13' class='js-cell'></td> <td data-day='2021-09-14' class='js-cell'></td> <td data-day='2021-09-15' class='js-cell'></td>`;
        tr.id = `${user.id}`;
        table.append(tr);   
    }
};

function createHintForBacklog() {
    var taskTexts = document.querySelectorAll('.task__text');
    var hint = document.createElement('div');
    hint.classList.add('hint');
    hint.textContent = 'Подсказка';
    taskTexts.forEach((taskText) => {
        taskText.append(hint);
    }) 
    
};

function createHintForKanban() {
    var userTasks = document.querySelectorAll('.user__task');
    var hint = document.createElement('div');
    hint.classList.add('hint');
    hint.textContent = 'Подсказка';
    userTasks.forEach((userTask) => {
        userTask.append(hint);
    })    
};

const backlog = document.querySelector('.backlog');
const taskList = document.querySelector('.task__list');

function getTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.executor == null) {
            var taskText = document.createElement('div');
            taskText.textContent = task.subject;
            taskText.classList.add('task__text');
            var taskItem = document.createElement('li');
            taskItem.classList.add('task__item');
            taskItem.append(taskText);
            taskList.append(taskItem);
            createHintForBacklog();
            taskText.setAttribute('draggable', true);
        } else {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.id == task.executor) {
                    let userId = document.getElementById(`${user.id}`);
                    for (let i = 0; i < userId.children.length; i++) {
                        const element = userId.children[i];
                        if (element.dataset.day == task.planStartDate) {
                            var userTask = document.createElement('div')
                            userTask.classList.add('user__task');
                            userTask.textContent = task.subject;
                            element.append(userTask);
                            createHintForKanban();
                        }
                    }
                }
            }
        }
    }
}

function dragAndDrop() {
    const task = document.querySelector('.task__text');
    const cells = document.querySelectorAll('.js-cell');

    const dragStart = function () {
        setTimeout(() => {
            this.classList.add('hide');
            this.parentElement.classList.add('hide');
        }, 0)
    };

    const dragEnd = function () {
        this.classList.remove('hide');
        this.parentElement.classList.remove('hide');
    };

    const dragOver = function (evt) {
        evt.preventDefault();
    };

    const dragEnter = function (evt) {
        evt.preventDefault();
        this.classList.add('hovered');
    };

    const dragLeave = function () {
        this.classList.remove('hovered');
    };

    const dragDrop = function () {
        this.append(task);
        this.classList.remove('hovered');
    };

    cells.forEach((cell) => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);
    });

    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
}

function slideDate() {
    const leftBtn = document.querySelector('.left__btn');
    const rightBtn = document.querySelector('.right__btn');
    const dates = document.querySelectorAll('.table-date');

    leftBtn.addEventListener('click', () => {
        dates.forEach((date) => {
            date.innerHTML -= 7;
            var dateAttr = date.getAttribute('data-day');
            var d = new Date(`${dateAttr}`);
            var week = 604800000;
            var newDate = new Date(Date.parse(d)-week);
            var formattedDate = newDate .getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
            date.setAttribute('data-day', `${formattedDate}`);
        })
    })

    rightBtn.addEventListener('click', () => {
        dates.forEach((date) => {
            date.innerHTML = Number(date.innerHTML) + 7;
            var dateAttr = date.getAttribute('data-day');
            var d = new Date(`${dateAttr}`);
            var week = 604800000;
            var newDate = new Date(Date.parse(d) + week);
            var formattedDate = newDate .getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
            date.setAttribute('data-day', `${formattedDate}`);
        })
    })
}

getUsers();
getTasks();
dragAndDrop();
slideDate();