// 1. Single Responsibility Principle (Принцип единственной ответственности)
// Класс User отвечает только за данные пользователя.
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// Класс UserRepository отвечает только за операции с пользователями.
class UserRepository {
    constructor(database) {
        this.database = database;
    }

    getUserById(id) {
        // Логика для получения пользователя из базы данных
        return this.database.find(user => user.id === id);
    }

    saveUser(user) {
        // Логика для сохранения пользователя в базе данных
        this.database.push(user);
    }
}

// 2. Open/Closed Principle (Принцип открытости/закрытости)
// Добавление нового типа уведомлений не изменяет существующий код.
class EmailNotifier {
    sendNotification(user, message) {
        console.log(`Sending email to ${user.email}: ${message}`);
    }
}

class SmsNotifier {
    sendNotification(user, message) {
        console.log(`Sending SMS to ${user.phone}: ${message}`);
    }
}

// 3. Liskov Substitution Principle (Принцип подстановки Лисков)
// Все наследники должны корректно заменять родительские классы.
class Notifier {
    sendNotification(user, message) {
        throw new Error('Not implemented');
    }
}

class EmailNotifier extends Notifier {
    sendNotification(user, message) {
        console.log(`Sending email to ${user.email}: ${message}`);
    }
}

class SmsNotifier extends Notifier {
    sendNotification(user, message) {
        console.log(`Sending SMS to ${user.phone}: ${message}`);
    }
}

// 4. Interface Segregation Principle (Принцип разделения интерфейса)
// Разделяем интерфейсы для разных типов уведомлений.
class EmailSender {
    sendEmail(user, message) {
        console.log(`Sending email to ${user.email}: ${message}`);
    }
}

class SmsSender {
    sendSms(user, message) {
        console.log(`Sending SMS to ${user.phone}: ${message}`);
    }
}

// 5. Dependency Inversion Principle (Принцип инверсии зависимостей)
// Высокоуровневые модули не зависят от низкоуровневых модулей.
class UserService {
    constructor(userRepository, notifier) {
        this.userRepository = userRepository;
        this.notifier = notifier;
    }

    registerUser(id, name, email) {
        const user = new User(id, name, email);
        this.userRepository.saveUser(user);
        this.notifier.sendNotification(user, 'User registered successfully');
    }
}

// Пример использования:
const database = []; // Пример базы данных в виде массива
const userRepository = new UserRepository(database);
const emailNotifier = new EmailNotifier();
const userService = new UserService(userRepository, emailNotifier);

userService.registerUser(1, 'John Doe', 'john.doe@example.com');
