<template>
  <div class="hello">
    <button @click="onClick">onClick</button>
    <div v-if="device">
      <h4>Device Info</h4>
      <!-- <vue-json-pretty :path="'BluetoothDevice'" :data="device">
      </vue-json-pretty> -->

      <ul class="font-small">
        <li>
          ID --- <span class="font-bold">{{ device.id }}</span>
        </li>
        <li>
          Name --- <span class="font-bold">{{ device.name }}</span>
        </li>
        <li>
          Is Gatt Connected ---
          <span class="font-bold">{{ device.gatt.connected }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      device: null,
      test: null,
    };
  },
  methods: {
    async onClick() {
      try {
        console.log("Requesting Bluetooth Device...");

        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalService: ["battery_service"],
        });

        const server = await device.gatt.connect();
        console.log(device);
        this.device = device;

        // console.log("after sever");
        // console.log("> Name:             " + device.name);
        // console.log("> Id:               " + device.id);
        // console.log("> Connected:        " + device.gatt.connected);

        const service = await server.getPrimaryService("battery_service");

        // console.log("after service", server);

        const characteristic = await service.getCharacteristic("battery_level");

        characteristic.startNotifications();

        // console.log("after characteristic", characteristic);

        console.log("--------------------characteristic----------------------");
        console.log(characteristic);
        console.log("--------------------characteristic----------------------");

        const reading = await characteristic.readValue();
        console.log("after reading", reading);
        console.log(reading.getUint8(0) + "%");
      } catch (error) {
        console.log("Argh! " + error);
      }
    },
  },
};
</script>
