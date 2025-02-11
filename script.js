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

    document.write ('Имя пользователя: ' + this.name + '<br>' + 'Возраст: ' + this.age + '<br>' + 'Номел телефона: ' + this.phone + '<br>' + 'Адрес электронной почты: ' + this.email);

}

const contact1 = new Contact('Petr', 19, '+375332547891', 'petr@gmail.com') 

console.log(contact1)