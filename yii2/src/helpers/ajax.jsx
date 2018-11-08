const API_PREFIX = '';


export function apiRequest(method, url, body) {
    return fetch(`${API_PREFIX}/${url}`, {
        method,
        credentials: "include",
        body
    }).then(response => {
        if (response.status !== 200) {
            throw Error(`Unexpected server response code: ${response.status} - ${response.statusText}`);
        }
        return response.text();
    })
    
}

export function apiGet (module, args={}) {
    const url = `${module}?${Object.keys(args)
        .map((key) => `${key}=${encodeURIComponent(args[key])}`)
        .join('&')
    }`;
    return apiRequest('GET', url);
}

export function apiPost(module, args={}) {
    const body = new FormData();
    Object.keys(args).forEach(key => {
        body.append(key, args[key]);
    });
    return apiRequest('POST', module, body);
}

export function getCaptcha() {
    return apiGet('captcha');
}

export function getSiteheart() {
    return apiGet('siteheart')
}

export function sendPayment(paymentId, paymentSystemId) {
    return apiPost('payment', {payment_id: paymentId, payment_system_id: paymentSystemId})
}
