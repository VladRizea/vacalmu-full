
import { getCookie } from "./getCookie.js";

export default async function ({ $axios, req , context, redirect, store})
{

    //* Check if the user is authenticated allready
    if (store.state.loggedIn === true) return 0;
    // If the user is not authenticated
    else {
        await $axios.$get('/api/v1/auth/me',)
            .then(response => { if (response) { store.commit('set', true); store.commit('setUser', response.data); return true;} })
            .catch(err => { store.commit('set', false);});
    }
  }