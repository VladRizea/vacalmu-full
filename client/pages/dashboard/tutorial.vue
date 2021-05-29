<template>
  <div class="big-index-dash-wrapper">
    <h1>Tutorial</h1>

    <h2>1. Găsește o idee de articol</h2>
    <h2>2. Scrie articolul folosind un editor de markdown.</h2>
    <h3>   de exemplu: <a href="https://stackedit.io/app">ASTA</a></h3>
    <h2>3. Găsește un thumbnail</h2>
    <h3>Acest thumbnail va trebui încărcat pe <a href="https://www.google.com/photos/about/">google photos</a>
    în 2 marimi.(1920x1080 respectiv 1080x1080)
    <br>
    după incărcare va trebui să copiați link-urile de la imagini.(click dreapta copy ca în imagine)
    </h3>
    <img src="https://lh3.googleusercontent.com/8KHrP3cnp6ain5LEeTeTxLM4u5AfftY3GHvaElyY0qI5XbtN_EUXPoQ7n8VgnqhYtsFjkYbZbbdBWSz10RpNYrHc0jDnlEJ9RXkXNGSDmD3Yy0I4J4M-2JUmR1sP_Y-b_vBKAsAekG-ycYxVJqxVKJtMMh62uWlku2xcv5bwrP0dasxtMfO9R1ID6UAy-hOHxPqufES-txeIpo1NbGqP5LkCgO-STCKwS5Jm6WXu9vcGdUZKUz93vRYoKJY3GdjFinr2wMrlHQgtIimSpg73-eJxaNAu4APUc7AXf-GPn7klL9emy3IR2pG-haUir7PBhhlUZ83cXB0uyxMX0SivFjqmCTcYgNeobKHW8a8ldT7llpu-J19UbqQ2rl00SNFHbpsdnaLZS8pf0pHrUpqXZJnvy3R-ivrl22l2W8ZUN02Kg0bIK_YgzpHAmXnr4EWV-X0Bxd-nFEsQSOd9bEw9UsCRXhmr3FmgSvew5koIzZ-y4vZcrFESjn4LrhLnox4wL5ZrYwXmkVVtqHC3TKL58503sQEK4cOdl0Ql01ygEy0aExA7Qp8fULj-D_Wi7c__yISoR-ijyNoiq31gdKvXLv-hcV8Gfa5YHQZ669tcckBRiNwbBHc6xyUGqHkzZX_n1fqE3Zf8kHPVLgiHcnnrV8ONHXLFwYGzbfk__9jqDoto46j0vIYQT-eSKKbxFTZQmDnGndXoiW8T9MF9NeNKTA=w1667-h937-no?authuser=5" alt="how to image">
    <h2>3. Mergeți la tab-ul  <a href="/dashboard/article-editor">New Article</a></h2>
    <h3>Este timpul să completați formularul cu numele, descrierea și conținutul în format markdown.
      <br>
      Urmează completara categoriei (care dacă nu există necesită încărcarea unui thumbnail)
      si a tag urilor care sunt foarte importante si trebuie sa fie în tema articolului.
      <br>
      Ultima parte este reprezentată de cele 2 poze. Fiecare link de mai devreme trebuie
      introdus la căsuța respectivă.
    </h3>
    <h2>4. Lansarea articolului</h2>
    <h3>Daca articolul este pregatit trebuie bifați căsuța ready
      în caz contrar acesta va rămâne la stadiul de draft.
    </h3>
    <h2>5. Corectarea ulterioară</h2>
    <h3>Suntem oameni și greșim! Așa că poți oricând să îți corectezi articolul din tab-ul   <a href="/dashboard/my-articles">My Articles</a>
    </h3>
    <h2>6. Wow nu mă așteptam să citești toată asta:)</h2>
  </div>
</template>

<script>

// @ts-ignore
import postCard from '../../components/post_card';

export default {
    middleware: 'restricted-routes',
    layout: 'dashboard',
    components:{
      postCard,
    },
    computed: {
        name ({$store}) {
          return $store.state.user.name;
      }
    },
    async asyncData({$axios, store}) {
      let articles = [];
      store.state.user._id;
      await $axios.$get(`/api/v1/articles?user._id=${store.state.user._id}`)
      .then(response => {articles = response.data ;});
      let draft = [];
      for(var i=0; i<=articles.length-1; i++){
        if(articles[i].state === 'draft'){

          draft[0] = articles[i];
          return { draft, articles }; // equivalent to { articles: articles }
        }
      }
      return { draft, articles };
    },

}
</script>

<style lang="scss">

@import "../../assets/flex";
@import "../../assets/screen-size";
@import "../../assets/transition";
@import "../../assets/colors";

body{

 .big-index-dash-wrapper{
  color:$cBlackGray;
  margin-left: 160px; /* Same as the width of the sidenav */
  padding: 0px 10px;
  @include flexbox();
  @include justify-content(center);
  @include flex-direction(column);
  h1{
    padding: 50px 0 0 100px;
    font-size: 50px;
    color: $cBlackGray;
  }
  img{
    width: 900px;
    height: auto;
}
  h2{
    padding: 20px;
  }
  .hover-tag{
    &:hover{
        cursor: pointer;

    }
  }
  .gifff{
    margin-left: 160px; /* Same as the width of the sidenav */
    padding: 0px 10px;
    height: auto;
    width: 400px;
  }
 }
}

</style>
