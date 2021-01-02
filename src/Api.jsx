let baseUrl = "http://18.141.144.35:3000/api";

export const Login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "username": username,
            "password": password
        })
    };
    return fetch(`${baseUrl}/login`, requestOptions);
};

export const GetEVoucher = () => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('auth')
        }
    };
    return fetch(`${baseUrl}/evouchers`, requestOptions);
}

export const GetSingleEVoucher = (id) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('auth')
        }
    };
    return fetch(`${baseUrl}/evouchers/${id}`, requestOptions);
}

export const ActiveEVoucher = (id, active) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('auth')
        },
        body: JSON.stringify({
            "is_active": active
        })
    };
    return fetch(`${baseUrl}/evouchers/${id}`, requestOptions);
}

export const UpdateEvoucher = (id, data) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('auth')
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/evouchers/${id}`, requestOptions);
}

export const CreateEvoucher = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('auth')
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/evouchers`, requestOptions);
}