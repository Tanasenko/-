var users = [{"id":1,"username":"user1","surname":"Петров","firstName":"Иван","secondName":""},{"id":2,"username":"user2","surname":"Иванов","firstName":"Пётр","secondName":""},{"id":3,"username":"user3","surname":"Васильев","firstName":"Артём","secondName":""},{"id":4,"username":"user4","surname":"Кузнецов","firstName":"Сергей","secondName":""},{"id":5,"username":"user5","surname":"Некрасов","firstName":"Артём","secondName":""}];

var tasks = [{"id":"ff0388e8-7417-4ffa-86cc-e791706eceb9","subject":"Анализ","description":"","creationAuthor":1,"executor":1,"creationDate":"2021-09-13","planStartDate":"2021-09-13","planEndDate":"2021-09-15","endDate":"2021-09-13","status":1,"order":1},{"id":"ba746c71-bc05-4980-8309-1924d41de8e6","subject":"Планирование","description":"","creationAuthor":1,"executor":1,"creationDate":"2021-09-13","planStartDate":"2021-09-14","planEndDate":"2021-09-15","endDate":"2021-09-13","status":1,"order":1},{"id":"ad3920f6-d5f0-4adc-bd75-0e1d851554b3","subject":"Проектирование","description":"","creationAuthor":1,"executor":2,"creationDate":"2021-09-13","planStartDate":"2021-09-15","planEndDate":"2021-09-16","endDate":"2021-09-13","status":1,"order":1},{"id":"8eb7ffde-7d59-476a-aca3-4eaae060f046","subject":"Разработка","description":"","creationAuthor":1,"executor":3,"creationDate":"2021-09-13","planStartDate":"2021-09-15","planEndDate":"2021-09-20","endDate":"2021-09-13","status":1,"order":1},{"id":"52a8cc6d-7563-49f0-97e3-bbc4b18a5905","subject":"Тестирование","description":"","creationAuthor":1,"executor":null,"creationDate":"2021-09-13","planStartDate":"2021-09-17","planEndDate":"2021-09-20","endDate":"2021-09-13","status":1,"order":1}];

var table = document.querySelector('.kanban__table');

function getUsers() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        /*var newDiv = document.createElement('div');
        newDiv.textContent = user.firstName;
        newDiv.classList.add('user-name');*/
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        /*td.append(newDiv);
        tr.append(td);*/
        tr.innerHTML = `<td> <div class= 'user-name'>${user.firstName}</div> </td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>`;
        tr.id = `${user.id}`;
        table.append(tr);   
    }
};

var backlog = document.querySelector('.backlog');
var taskList = document.querySelector('.task__list');

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
        } else {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.id == task.executor) {
                    let userId = document.getElementById(`${user.id}`);
                    console.log(userId);
                    var userTask = document.createElement('div')
                    userTask.textContent = task.subject;
                    userId.append(userTask);
                }
            }
        }
    }
}

getUsers();
getTasks();