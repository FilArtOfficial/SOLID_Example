В этом примере соблюдаются все принципы SOLID:

1. Single Responsibility Principle: Классы User и UserRepository имеют четко определенные обязанности.
2. Open/Closed Principle: Для добавления новых типов уведомлений (например, SMS) нет необходимости изменять существующие классы.
3. Liskov Substitution Principle: Классы-наследники (EmailNotifier, SmsNotifier) могут заменить базовый класс Notifier.
4. Interface Segregation Principle: Интерфейсы для отправки уведомлений разделены на отдельные классы (EmailSender, SmsSender).
5. Dependency Inversion Principle: Класс UserService зависит от абстракций (UserRepository, Notifier), а не от конкретных реализаций.
