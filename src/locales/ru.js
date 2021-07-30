export default {
  translation: {
    buttons: {
      logInButton: 'Войти',
      signUpButton: 'Зарегистрироваться',
      logOutButton: 'Выйти',
      modal: {
        add: 'Отправить',
        remove: 'Отправить',
        rename: 'Отправить',
        close: 'Отменить',
      },
    },
    navBar: {
      logoText: 'Hexlet Chat',
    },
    logIn: {
      title: 'Войти',
      userName: 'Ваш ник',
      password: 'Пароль',
      noAccount: 'Нет аккаунта?',
      register: 'Регистрация',
    },
    signUp: {
      title: 'Регистрация',
      userName: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
    },
    messages: {
      messageInput: 'Введите сообщение тут...',
      messageSend: 'Отправить',
      messagesCount: {
        keyWithCount_0: '{{count}} сообщениe',
        keyWithCount_1: '{{count}} сообщения',
        keyWithCount_2: '{{count}} сообщений',
      },
    },
    channels: {
      title: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
      modal: {
        addChannel: 'Добавить Канал',
        renameChannel: 'Переименовать Канал',
        removeChannel: 'Удалить Канал',
        confirmRemove: 'Вы уверены ?',
      },
    },
    errors: {
      userExist: 'Это имя пользователя уже существует',
      channelExist: 'Это имя канала уже существует',
      wrongUsername: 'Неверные имя пользователя или пароль',
      unknown: 'Неизвестная ошибка',
      minCharacters: 'От 3 до 20 символов',
      minCharactersPass: 'Не менее 6 символов',
      maxCharacters: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      passMatch: 'Пароли должны совпадать',
    },
  },
};
