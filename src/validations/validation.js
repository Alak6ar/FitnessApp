export const login = {
    usernameOrEmail: {
        required: 'Email və ya İstifadəçi adı daxil edilməyib',
    },
    password: {
        required: 'Şifrə boş ola bilməz',
        minLength:'Şifrə ən azı 8 simvoldan ibarət olmalıdır',
        isSymbol: 'Şifrədə ən azı 1 simvol olmalıdır',
        isNumber: 'Şifrədə ən azı 1 rəqəm olmalıdır',
        isUpperCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isLowerCase: 'Şifrədə ən azı 1 kiçik hərf olmalıdır'
    }
}

export const register = {
    firstname: {
        required: 'Ad boş ola bilməz',
        minLength: 'Ad ən az 3 simvoldan ibarət ola bilər',
        maxLength: 'Ad ən çox 20 simvoldan ibarət ola bilər'
    },
    lastname: {
        required: 'Ad boş ola bilməz',
        minLength: 'Ad ən az 3 simvoldan ibarət ola bilər',
        maxLength: 'Ad ən çox 20 simvoldan ibarət ola bilər'
    },
    username: {
        required: 'İstifadəçi adı boş ola bilməz',
        minLength: 'İstifadəçi adı ən az 4 simvoldan ibarət ola bilər',
        maxLength: 'İstifadəçi adı ən çox 20 simvoldan ibarət ola bilər',
    },
    email: {
        required: 'Email boş ola bilməz',
        isEmail: 'Düzgün email daxil edin',
    },
    Password: {
        required: 'Şifrə boş ola bilməz',
        minLength:'Şifrə ən azı 8 simvoldan ibarət olmalıdır',
        isSymbol: 'Şifrədə ən azı 1 simvol olmalıdır',
        isNumber: 'Şifrədə ən azı 1 rəqəm olmalıdır',
        isUpperCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isLowerCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır'
    },
    ConfirmPassword: {
        required: 'Şifrə boş ola bilməz',
        minLength:'Şifrə ən azı 8 simvoldan ibarət olmalıdır',
        isSymbol: 'Şifrədə ən azı 1 simvol olmalıdır',
        isNumber: 'Şifrədə ən azı 1 rəqəm olmalıdır',
        isUpperCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isLowerCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isSame: 'Şifrələr eyni olmalıdır'
    }
}

export const otp = {
    required: 'Təsdiq kodunu daxil edin!',
}

export const resetPassword = {
    password: {
        required: 'Şifrə boş ola bilməz',
        minLength:'Şifrə ən azı 8 simvoldan ibarət olmalıdır',
        isSymbol: 'Şifrədə ən azı 1 simvol olmalıdır',
        isNumber: 'Şifrədə ən azı 1 rəqəm olmalıdır',
        isUpperCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isLowerCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır'
    },
    confirmPassword: {
        required: 'Şifrə boş ola bilməz',
        minLength:'Şifrə ən azı 8 simvoldan ibarət olmalıdır',
        isSymbol: 'Şifrədə ən azı 1 simvol olmalıdır',
        isNumber: 'Şifrədə ən azı 1 rəqəm olmalıdır',
        isUpperCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isLowerCase: 'Şifrədə ən azı 1 böyük hərf olmalıdır',
        isSame: 'Şifrələr eyni olmalıdır'
    }
}

export const forgetPassword = {
    required: 'Email boş ola bilməz',
    isEmail: 'Düzgün email daxil edin',
}

