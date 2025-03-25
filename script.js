const Contact = function (name, age, phone, email) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.email = email;

    const ageVerif = () => {
        if (this.age <= 0 || !Number.isInteger(this.age)) {
            alert('Введено некорректное значение');
        } else if (this.age < 18) {
            alert ('Доступ запрещён');
        } else {
            alert ('Доступ разрешён');
        }
    }

    ageVerif()

    this.show = () => ('Имя пользователя: ' + this.name + '<br>' + 'Возраст: ' + this.age + '<br>' + 'Номел телефона: ' + this.phone + '<br>' + 'Адрес электронной почты: ' + this.email);
}

function ContactList () {
    this.contacts = [];

    this.addContact = (contact) => {
        if(!contact) {
            contact = new Contact()
            contact.addContact()
        }
        this.contacts.push(contact);
    }


    this.showAll = () => {
        console.log(this.contacts)
    }
}

let NewFeaches = function (name, age, phone, emai) {
    Contact.apply(this, arguments)
    ContactList.apply(this)
    let parentShow = this.show
    this.show = () => ('<b>Информация о контакте</b>' + '<br>' + '<br>' + parentShow() + '<br>' + '<br>')
}

const contactList = new ContactList();
const contact1 = new NewFeaches('Petr', 19, '+375332547891', 'petr@gmail.com');
contactList.addContact(contact1);
const contact2 = new NewFeaches('Roman', 58, '+375332759891', 'roma@gmail.com') 
contactList.addContact(contact2);

document.write(contact1.show())
document.write(contact2.show())
contactList.showAll()


function Constructor () {
    this.create = (tagName) => {
        return document.createElement(tagName);
    }

    this.attr = (element, name, value) => {
        if (value) {
            element.setAttribute(name, value);
        }
        else {
            return element.getAttribute(name);
        }
    }

    this.html = (element, value) => {
        if (value) {
            element.innerHTML = value;
        }
        else {
            return element.innerHTML;
        }
    }

    this.search = (selector, element) => {
        let find;
        find = element.querySelectorAll(selector);
    }

    this.addClass = function (element, className) {
        element.classList.add(className);
    }

    this.removeClass = function (element, className) {
        element.classList.remove(className);
    }

    this.hasClass = (element, className) => {
        return element.classList.contains(className);
    }
    
    this.toggleClass = function (element, className) {
        if (!this.hasClass(element, className)) {
            this.addClass(element, className)
        }
        else {
            this.removeClass(element, className)
        }
    }

    this.append = (element, newElement, beforeElement) => {
        if (beforeElement) {
            element.insertBefore(newElement, beforeElement);
        }
        else {
            element.append(newElement);
        }
    }
    
    this.on = (element, eventName, funcName) => {
        if (this && event)
            element.addEventListener(eventName, funcName);
    }
}

let constructor = new Constructor
let text = constructor.create('p')
constructor.attr(text, "style", "color: green;")
constructor.html(text, 'Объект на основе конструктора для работы с DOM')
constructor.toggleClass(text, 'text-style')

constructor.append(document.body, text)

constructor.on(text, 'click', this.toggleClass(text, 'text-style'))
   


