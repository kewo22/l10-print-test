<template>
  <div id="app">
    <div id="nav">
      <div>
        <p class="brand">Print Test</p>
      </div>
      <div>
        <router-link to="/">Bluetooth(BLE)</router-link> |
        <router-link to="/l300">SM-L300</router-link> |
        <router-link to="/webprint">Web Print</router-link>
      </div>
    </div>
    <div class="router-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
body {
  margin: 0;
  padding: 0;
  font-family: "Raleway", sans-serif;
  font-size: 12px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: cornsilk;
  max-height: 40px;
  height: 40px;
  padding: 0 2%;
}

#nav a {
  color: #2c3e50;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.brand {
  font-size: 14px;
  font-weight: bold;
}

.router-wrapper {
  padding: 0 2%;
}
</style>
