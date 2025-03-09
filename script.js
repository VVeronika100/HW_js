//почему-то при перезапуске страницы задачи удаляются, в локальном хранилище при этом всё есть

/**
 * 
 * @typedef {Object} TypeToDoItemParams
 * @property {number} id
 * @property {string} text
 * @property {boolean} complite
 */

/**
 * 
 * @param {TypeToDoItemParams} content 
 */
function ToDoItem (content) {  
    this.id = content.id;
    this.text = content.text;
    this.complite = content.complite;

    this.setComplite = () => {
        this.complite = !this.complite
    }

    this.edit = (newValue) => {
        this.text = newValue
    }
}

/**
 * 
 * @param {string} formSelector селектор формы ввода
 * @param {string} inputSelector селектор текстового поля
 * @param {string} listSelector селектор блока вывода
 */
const toListCreator = (formSelector, inputSelector, listSelector) => {  //создаём задачу:
    const form = document.querySelector(formSelector)
    const input = document.querySelector(inputSelector)
    const listContainer = document.querySelector(listSelector)

    if (!form && !input && !listContainer) return  //если отсутствует один из элементов, выходим из функции

    let todoListArr = []  //массив с задачами (массив объектов с методами)

    const localsave = () => {
        const jsonToDoListArr = JSON.stringify(todoListArr)
        localStorage.setItem('todolist', jsonToDoListArr) //записали новую инф-ю в локальное хранилище
    }

    const render = () => { //"отрисовываем" задачу (выводим на экран html-код)
        listContainer.innerHTML = '';  //перед каждым рендером очищаем
        //Т.к. задачи находятся в массиве, пробегаем по каждому элементу и выводим задачи на экран
        todoListArr.forEach(todoListItem => {
            const todoListLine = document.createElement('div') //блок с задачей
            todoListLine.classList.add('todo-list--item')

            const todoCheckBox = document.createElement('input')  //чекбокс
            todoCheckBox.setAttribute('type', 'checkbox')
            todoCheckBox.classList.add('todo-list--item-checkbox')
            todoCheckBox.checked = todoListItem.complite   //если чекбокс выбран (todoCheckBox.checked = true), то присваиваем значение todoListItem.complite (задача выполнена)
            
            todoCheckBox.addEventListener('click', (event) => {
                event.preventDefault()  //убрали "галочку" при клике по умолчанию, потому что при клике нужно сделать зачёркивание текста
                todoListItem.setComplite() //по клику меняем статус задачи: один клик - зачеркнули
                render() //нужно вызвать ф-цию снова, чтобы отобразились изменения статуса задачи, иначе js не
                localsave()
            })

            const todoText = document.createElement('p')
            todoText.classList.add('todo-list--item-text')
            if (todoListItem.complite) { // если задача выполнена, т.е. если выбран чекбокс, то зачёркиваем задачу
                todoText.classList.add('todo-list--item-text__active')
            }
            todoText.innerText = todoListItem.text //вставляем текст задачи

            todoText.addEventListener('click', () => { //по клику меняем статус задачи: один клик - зачеркнули, второй клик - сняли зачёркивание
                todoListItem.setComplite()
                render() //нужно вызвать ф-цию снова, чтобы отобразились изменения статуса задачи, иначе js не поймёт (т.е. js "отрисует" заново задачу с зачёркнутым/обычным текстом)
                localsave()
            })

            todoText.addEventListener('contextmenu', function (event) {
                event.preventDefault()
                this.contentEditable = true;
            })

            todoText.addEventListener('keydown', function (event) {
                if (event.altKey && event.key === 'Enter') {
                    this.contentEditable = false;
                }
            })

            const delButton = document.createElement('button')
            delButton.classList.add('todo-list--item-button')
            delButton.innerText = 'Del'
            delButton.addEventListener('click', () => {
                if (confirm('Вы точно хотите удалить?')) {
                    todoListArr = todoListArr.filter(item => item.id !== todoListItem.id)
                    render()
                    localsave()
                }
            })


            todoListLine.append(todoCheckBox, todoText, delButton)
            listContainer.append(todoListLine)
        })
    }

    if (localStorage.getItem('todoList')) {  //если в хранилище что-то есть объект по заданному ключу, то извлекаем из хранилища этот объект
        const todoListStore = localStorage.getItem('todoList') //извлечён элемент в виде строки json
        /**  @type {TypeToDoItemParams[]} */
      const todoListStoreData = JSON.parse(todoListStore) //преобразуем в массив объектов (без методов)

        todoListStoreData.forEach(item => {  //возвращаем методы объектам в массиве
            const todoListItem = new ToDoItem(item)
            todoListArr.push(todoListItem)
        });
        render()
        localsave() 
    }

    const groupTodoItemsBy = Object.groupBy(todoListArr, ({ id }) => id)   //ф-ция группирует объекты по id. Получаем объект, ключами которого будут id задач

    const getId = () => {
        const id = Math.floor(Math.random() * 10000)
        if (Object.keys(groupTodoItemsBy).length >= 9999) return 
        if (Object.keys(groupTodoItemsBy).includes('' + id)) {
            return getId() //если массив ключей содержит данный id, то вызываем ф-цию снова до нахождения уникального id
        }
        return id 
    }

    const todoCreate = (event) => {      
        //собираем данные с формы:
        event.preventDefault()  // отменяем отправку формы при нажатии кнопки
        const text = input.value  //извлекаем текст

        if (!text.length) return //если пустая строка, выход из ф-ции, задача не добавляется

        //собираем объект, который будем отправлять в качестве параметра в конструктор:
        /** @type {TypeToDoItemParams} */
        const data = {
            complite: false,
            text,
            id: getId()
        }

        const todoItem = new ToDoItem(data)
        todoListArr.push(todoItem)
        render() //т.к. добавили задачу, обновили массив, необходимо его "отрисовать"
        localsave()
    }

    form.addEventListener('submit', todoCreate)  //при нажатии на кнопку сбор данных с формы
}

toListCreator('.todo-form', '#todo-text', '.todo-list')








 

       

 


   
   

 

   