export const auth = {
    authed: false,
    login() {
        this.authed = true;
    },
    logout() {
        this.authed = false;
    }
}