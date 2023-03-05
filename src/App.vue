<template>
  <nav>
    <a class="pokedex-link" href="/">Pokedex</a>
  </nav>
  <router-view/>
</template>

<style lang="scss">
body {  background-color: #f5f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;

}

nav {
  padding: 30px;

  a {
    .router-link-exact-active {
      color: #2c3e50 ;
    }
  }
  .pokedex-link {
  color: #42b983;
  text-decoration: none;
  border: 2px solid #42b983;
  padding: 8px 12px;
  border-radius: 20px;
}

}
</style>
