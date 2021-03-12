
import { getCookie } from "./getCookie.js";

export default async function ({ $axios, req , context, redirect, store})
{
    //* Check if the user is authenticated allready
    if (store.state.user.role === 'publisher' || store.state.user.role === 'admin')  return 0;
    // If the user is not authenticated
    else {
        await $axios.$get('/api/v1/auth/me', {withCredentials: true})
            .then(response =>
            {
                if (response){
                    store.commit('set', true); store.commit('setUser', response.data);
                    if (response.data.role === 'publisher' || response.data.role === 'admin')
                    {
               
                        store.commit('set', true);
                        store.commit('setUser', response.data);
                        return 0;
                    }
                    else { if(response.data.role === 'user') return redirect('/login') }
                    return redirect('/');
                }
            })
            .catch(err => { store.commit('set', false); store.commit('setUser', null); return redirect('/login')});
    }
  }