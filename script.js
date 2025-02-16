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
        this.contacts.push(contact);
    }

    this.show = () => (this.contacts)
}

const contactList = new ContactList();
const contact1 = new Contact('Petr', 19, '+375332547891', 'petr@gmail.com');
contactList.addContact(contact1);
const contact2 = new Contact('Roman', 58, '+375332759891', 'roma@gmail.com') 
contactList.addContact(contact2);

console.log(contactList.show())
document.write(contact1.show())




