export function delay(value, ms) {
    /*   return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
      }); */

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        },ms)
    })

}



export function apiRequest(method, url, body) {
    return fetch(`${url}`, {
        method,
        credentials: "include",
        body
    }).then(response => {
        if (response.status !== 200) {
            throw Error(`Unexpected server response code: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })

}




// let test = httpGet('https://api.github.com/users/lawsaw');
//
// let parse = httpGet('data/list.json')
//     .then(
//         data => {
//             data = JSON.parse(data);
//             console.dir( data );
//             return data;
//         }


