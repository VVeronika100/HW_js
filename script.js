/**
 * @typedef {Object} ContactType
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} address
 * @property {string} phone
 */


class Contact {
    /** @type {ContactType} */
    data = {}  //весь объект целиком, с учётом id

    /**
     * @param {(name: string, email: string, address: string, phone: string, id: ?string)} param0
     */
    constructor ({ name, email, address, phone, id }) {  //параметры, которые передаём, забрасываем в объект data. Это всё кроме id
        if (!name.length && !email.length  && !address.length && !phone.length) throw new Error ('Хотя бы одно поле должно быть заполнено') //в дз надо по-другому почему-то придумать
        this.data = {
            name,
            email,
            address,
            phone,
            id
        }    
    }

    /**
     * @param {ContactType} data
     */
    edit (data) {
        this.data = Object.assign(this.data, data) //выполняем слияние двух объектов
        //this.data = {...this.data, ...data}
    }

    get () {
        return this.data
    }
}          

class Contacts {
    /** @type {(data: ContactType)[]} */
    contacts = []

    add (data) {
        try {
            const contact = new Contact (data)
            if (!contact.data.id) {
                const id = Date.now().toString(36)
                contact.edit({ id })  //через слияние объектов забросили id в объект data
            }
            

            this.contacts.push(contact)
        } catch (error) {
            console.error(error.message)  
        }
    }

    get contactById() {  //возвращает объект по id
        return this.contacts.reduce((acc, contact) => {
            acc[contact.data.id] = contact  
            return acc
        }, {})
    }

    edit (id, newData) {
        const contact = this.contactById[id]
        if (!contact) return
        contact.edit(newData)
    }

    remove (id) {
        this.contacts = this.contacts.filter(contact => contact.data.id !== id)  //оставить все заметки, у которых id не равен переданному id
    }

    get store () {
        const data = localStorage.getItem('contacts')
        return JSON.parse(data)
    }

    set store (contacts) {
        const data = JSON.stringify(this.contacts)
        localStorage.setItem('contacts', data)
    }

    setCookies(name, maxAge) {
        const options = {
            path: '/',
            'max-age': maxAge
          };
        
          if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
          }
        
          let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent('');
        
          for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
              updatedCookie += "=" + optionValue;
            }
          }
        
          document.cookie = updatedCookie;
    }

    getCookies(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}$$$$$$\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? true : false;
    }

    clearStore() {
        localStorage.removeItem('contacts')
    }

}

const contact1 = new Contacts()

class ContactsApp extends Contacts {
    constructor (selector) {
        super()
        this.container = document.querySelector(selector)
        this.contactContainer = document.createElement('div') //создаём элемент для заметок
        this.init()  //т.к. конструктор запускается сразу, вызываем здесь эту функцию
    }

    init () {  //создаём форму, в которую можно что-то добавлять
        const form = document.createElement('form')
        const name = document.createElement('input')
        name.setAttribute('type', 'text')
        const email = document.createElement('input')
        email.setAttribute('type', 'text')
        const address = document.createElement('input')
        address.setAttribute('type', 'text')
        const phone = document.createElement('input')
        phone.setAttribute('type', 'text')
        const submit = document.createElement('button')
        submit.setAttribute('type', 'submit')
        submit.innerText = 'Add'

        form.append(name, email, address, phone, submit)
        
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            const data = {  //извлекаем введённый в поля текст
                name: name.value,
                email: email.value,
                address: address.value,
                phone: phone.value
            }

            this.add(data)

            this.store = this.contacts
            this.setCookies('contacts', 864000000)

            this.render()

            name.value = ''   //очистили поля
            email.value = ''
            address.value = ''
            phone.value = ''
        })

        this.contactContainer.classList.add('contacts')

        this.container.append(form, this.contactContainer)

        if (!this.getCookies('contacts')) {
            this.clearStore()
        }

        if (this.store) {
            this.store?.forEach(contact => this.add(contact.data))
        }


        this.render() //отрисовывать сущ. заметки при перезапуске страницы

    }  

    render () {
        if (!this.contacts.length) { //this.contacts.length === 0
            this.contactContainer.innerHTML = '<h2 className="title">Список заметок пуст</h2>'
        } else {
            this.contactContainer.innerHTML = ''
            this.contacts.forEach(contact => {
                let editable = false
                const contactItem = document.createElement('div')
                contactItem.classList.add('item')
                const contents = document.createElement('div')
                contents.classList.add('contactContent')
                const name = document.createElement('p')
                const email = document.createElement('p')
                const address = document.createElement('p')
                const phone = document.createElement('p')

                const remove = document.createElement('button')
                const edit = document.createElement('button')

                remove.classList.add('remove')
                remove.innerHTML = '&#10060';
                remove.addEventListener('click', () => {
                    if (confirm('Вы точно хотите удалить?')) {
                        this.remove(contact.data.id)
                        this.store = this.contacts
                        this.render() 
                    }
                })

                edit.classList.add('edit')
                edit.innerHTML = '&#9998'
                edit.addEventListener('click', () => {
                    if (editable) {
                        edit.innerHTML = '&#9998'
                        name.contentEditable = false
                        email.contentEditable = false
                        address.contentEditable = false
                        phone.contentEditable = false
                        const data = {
                            name: name.innerText,
                            email: email.innerText,
                            address: address.innerText,
                            phone: phone.innerText
                        }

                        this.edit(contact.data.id, data)
                        this.store = this.contacts
                        this.render()
                        editable = !editable
                    } else {
                        edit.innerHTML = '&#128428'
                        name.contentEditable = true
                        email.contentEditable = true
                        address.contentEditable = true
                        phone.contentEditable = true
                        editable = !editable
                    }
                })

                name.innerText = contact.data.name
                email.innerText = contact.data.email
                address.innerText = contact.data.address
                phone.innerText = contact.data.phone

                contents.append(name, email, address, phone)

                contactItem.append(contents, edit, remove);

                this.contactContainer.append(contactItem);

            })
        }
    }
}

const contactsapp = new ContactsApp('.container')
