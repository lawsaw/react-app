const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

export default {
    state: 5,
    reducers: {
        add: (state) => {
            return ++state;
        },
        remove: (state) => {
            return --state;
        }
    },
    effects: {
        async asyncAdd() {
            await delay(1000);
            this.add();
        },
        async asyncRemove() {
            await delay(1000);
            this.remove();
        }
    }
}