<template>
  <div class="about">
    <!-- <button @click="onClick">Print</button> -->
    <a href="#" id="print">Print</a>
  </div>
</template>

<script>
export default {
  name: "l300",
  mounted() {
    const x = document.querySelector("#print");
    var passprnt_uri;

    x.addEventListener(
      "click",
      () => {
        passprnt_uri = "starpassprnt://v1/print/nopreview?";

        passprnt_uri =
          passprnt_uri + "back=" + encodeURIComponent(window.location.href);

        passprnt_uri =
          passprnt_uri + "&html=" + encodeURIComponent("ABC abc 123");

        var target = document.getElementById("print");
        target.href = passprnt_uri;
      },
      false
    );
  },
  methods: {
    onClick() {
      // alert("ss2");
      // let passprnt_uri;
      // passprnt_uri = "starpassprnt://v1/print/nopreview?";
      // passprnt_uri =
      //   passprnt_uri + "back=" + encodeURIComponent(window.location.href);
      // passprnt_uri =
      //   passprnt_uri + "&html=" + encodeURIComponent("ABC abc 123");
      // let target = document.getElementById("print");
      // target.href = passprnt_uri;
    },
  },
};
</script>
