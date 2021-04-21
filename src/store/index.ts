import { createStore } from 'vuex'

const store = createStore({
    state: {
        name: 'min Kjaere' as string,
        date: new Date(2019, 5, 29),
        image: {
            url: new String(),
        },


        settings: {
            getNotifications: true
        }
    },
    mutations: {
        setName(state, value) {
            state.name = value;
        },
        setDate(state, value) {
            state.date = value;
        },
        setImage(state, value) {
            state.image.url = value;
        },
        toggleNotifications(state, value) {
            state.settings.getNotifications = value;
        }
    },
    actions: {
        setName({ commit }, value) {
            commit('setName', value);
        },
        setDate({ commit }, value) {
            console.log(value);
            value = value.trim();
            commit('setDate', value);
        },
        setImage({ commit }, value) {
            console.log(value);
            commit('setImage', value.webPath);
        },
        toggleNotifications({ commit }, checked) {
            console.log(checked);
            commit('toggleNotifications', checked);
        }
    }
});

export default store;