<template>
  <div class="hello">
    <div>
      <h3>Steps</h3>
      <div>
        <ol>
          <li>
            Follow <b>setup & test</b> section
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://lineten.atlassian.net/wiki/spaces/AET/pages/2408874136/Printer+Configuration+-+Ethernet+USB"
              >here</a
            >. Until setp 4.
          </li>
          <li>
            Make sure your this router page is accessible with either
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://192.168.8.145:80/"
              >http://192.168.8.145:80/</a
            >
            or
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://192.168.8.145:81/"
              >http://192.168.8.145:81/</a
            >.
          </li>
          <li>Enter the conneted port number(80 or 81) in the below input.</li>
          <li>Click print button.</li>
        </ol>
      </div>
    </div>

    <div class="form-wrapper">
      <div class="choose-port-wrapper">
        <div class="choose-port-label">Choose Port</div>
        <input type="radio" class="port-radio" value="80" v-model="port" />
        <label class="port-label mr-2pe">80</label>
        <input type="radio" class="port-radio" value="81" v-model="port" />
        <label class="port-label">81</label>
      </div>
      <button @click="onClick">Print</button>
    </div>

    <div class="logs">
      <div class="header-wrapper">
        Logs <button @click="clearLog">Clear</button>
      </div>
      <div v-show="printStart">
        <div class="log print-starting">- Print starting</div>
        <div class="log loading"></div>
        <div class="log printting"></div>
        <div class="log print-result"></div>
      </div>
    </div>
  </div>
</template>

<script>
import test from "../assets/myfile";
export default {
  data() {
    return {
      port: 80,
      printStart: false,
    };
  },
  methods: {
    onClick() {
      if (this.printStart) this.clearLog();
      this.printStart = true;
      test(this.port);
    },
    clearLog() {
      // document.querySelector(".print-starting").innerHTML = "";
      document.querySelector(".printting").innerHTML = "";
      document.querySelector(".print-result").innerHTML = "";
      document.querySelector(".loading").innerHTML = "";
      this.printStart = false;
    },
  },
};
</script>

<style scoped>
ol li {
  font-size: 14px;
}
.choose-port-label {
  font-weight: bold;
  font-size: 14px;
  margin-right: 1%;
  width: 100px;
}
.port-label {
  font-weight: bold;
  font-size: 14px;
}
.choose-port-wrapper {
  display: flex;
  align-items: center;
  margin-right: 1%;
}
.port-radio {
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.logs {
  font-size: 14px;
  min-height: 50px;
  background-color: silver;
  padding: 1%;
}
.log {
}
.logs .header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 14px;
}
.form-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 2%;
}
.mr-2pe {
  margin-right: 2%;
}
</style>
