import React from 'react';

const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function cutUrl(url) {
    return url.slice(-1) === '/' ? url.slice(0, -1) : url
}

export function checkEmail(email) {
    return EMAIL_REGEXP.test(String(email).toLowerCase())
}

export function formatError(context) {
    // return `${context.key}_${context.condition}`
    return `${context.key.charAt(0).toUpperCase() + context.key.substr(1)}`
}

export function getComponentName(component) {
    return component.displayName || component.name
}

export function formatPrice(price=0) {
    return `$${price}`;
}

export function resolveOptions(options, setOptions) {
    if (typeof options === 'function') {
        options = options();
    }
    if (options.then) {
        options.then(result => {
            setOptions(result);
        });
    } else {
        setOptions(options);
    }
}

export function resolveArgs(args, value) {
    if (typeof args === 'function') {
        args = args(value);
    }
    return args;
}

export function resolveError(error) {
    const { name, value, args } = error;
    let resolvedArgs = resolveArgs(args, value);
    return {name, args: resolvedArgs};
}

export function symbolIsSpace(symbol) {
    return symbol.match(/ /);
}

export function storageUrl(filename) {
    return `/storage/${filename}`;
}

export function getParameterByName(name, url) {
    var res = new RegExp('[\?&]' + name.replace(/\[/g, '\\\[').replace(/\]/g, '\\\]') + '(?:=([^&#]*))?(?:[&#]|$)').exec(window.location.search);
    return res ? (res[1] ? decodeURIComponent(res[1].replace(/\+/g, ' ')) : '') : null;

}

export function arrayIsEmpty(array) {
    return array.length === 0;
}

export function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&');
    let params = {};
    hashes.map(hash => {
        let [key, val] = hash.split('=');
        params[key] = decodeURIComponent(val);
    })
    return params;
}
