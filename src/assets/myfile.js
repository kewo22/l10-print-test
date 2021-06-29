/* eslint-disable no-unused-vars */
import StarWebPrintBuilder from "./StarWebPrintBuilder.js";
import StarWebPrintTrader from "./StarWebPrintTrader.js";

function sendMessageApi(request, port) {
  //document.getElementById('url').value
  var url = `http://192.168.8.145:${port}/StarWebPRNT/SendMessage`;

  var trader = new StarWebPrintTrader({ url: url });

  // return new Promise((resolve, reject) => {
  // debugger
  document.querySelector(".loading").innerHTML = "- Loading Please Wait...";
  trader.onReceive = function (response) {
    document.querySelector(".printting").innerHTML = "- Printing..";
    console.log("onReceive");
    var msg = "- onReceive -\n\n";

    msg += "TraderSuccess : [ " + response.traderSuccess + " ]\n";

    //      msg += 'TraderCode : [ ' + response.traderCode + ' ]\n';

    msg += "TraderStatus : [ " + response.traderStatus + ",\n";

    if (trader.isCoverOpen({ traderStatus: response.traderStatus })) {
      msg += "\tCoverOpen,\n";
    }
    if (trader.isOffLine({ traderStatus: response.traderStatus })) {
      msg += "\tOffLine,\n";
    }
    if (
      trader.isCompulsionSwitchClose({ traderStatus: response.traderStatus })
    ) {
      msg += "\tCompulsionSwitchClose,\n";
    }
    if (trader.isEtbCommandExecute({ traderStatus: response.traderStatus })) {
      msg += "\tEtbCommandExecute,\n";
    }
    if (trader.isHighTemperatureStop({ traderStatus: response.traderStatus })) {
      msg += "\tHighTemperatureStop,\n";
    }
    if (trader.isNonRecoverableError({ traderStatus: response.traderStatus })) {
      msg += "\tNonRecoverableError,\n";
    }
    if (trader.isAutoCutterError({ traderStatus: response.traderStatus })) {
      msg += "\tAutoCutterError,\n";
    }
    if (trader.isBlackMarkError({ traderStatus: response.traderStatus })) {
      msg += "\tBlackMarkError,\n";
    }
    if (trader.isPaperEnd({ traderStatus: response.traderStatus })) {
      msg += "\tPaperEnd,\n";
    }
    if (trader.isPaperNearEnd({ traderStatus: response.traderStatus })) {
      msg += "\tPaperNearEnd,\n";
    }

    msg +=
      "\tEtbCounter = " +
      trader
        .extractionEtbCounter({ traderStatus: response.traderStatus })
        .toString() +
      " ]\n";

    document.querySelector(".print-result").innerHTML = "Print Success";
    //      msg += 'Status : [ ' + response.status + ' ]\n';
    //
    //      msg += 'ResponseText : [ ' + response.responseText + ' ]\n';

    // alert(msg);
    // resolve("Stuff worked!");
  };

  trader.onError = function (response) {
    console.log("onError");
    var msg = "- onError -\n\n";

    msg += "\tStatus:" + response.status + "\n";

    msg += "\tResponseText:" + response.responseText;

    // alert(msg);
    document.querySelector(".print-result").innerHTML = "- Print Failed";
    // reject(Error("It broke"));
  };

  trader.sendMessage({ request: request });

  // do a thing, possibly async, then…

  // if (isSuccess) {
  //     debugger
  //     // trader.sendMessage({ request: request });
  //     resolve("Stuff worked!");
  // } else {
  //     debugger
  //     reject(Error("It broke"));
  // }
  // });
}

function test(port) {
  var builder = new StarWebPrintBuilder();
  var request = "";
  request += builder.createInitializationElement();
  request += builder.createTextElement({ characterspace: 2 });

  request += builder.createAlignmentElement({ position: "right" });
  request += builder.createLogoElement({ number: 1 });
  request += builder.createTextElement({ data: "TEL 9999-99-9999\n" });
  request += builder.createAlignmentElement({ position: "left" });

  request += builder.createTextElement({ data: "\n" });

  request += builder.createAlignmentElement({ position: "center" });
  request += builder.createTextElement({
    data: "Thank you for your coming. \n",
  });
  request += builder.createTextElement({
    data: "We hope you'll visit again.\n",
  });
  request += builder.createAlignmentElement({ position: "left" });

  request += builder.createTextElement({ data: "\n" });

  request += builder.createTextElement({
    data: "Apple                $20.00\n",
  });
  request += builder.createTextElement({
    data: "Banana               $30.00\n",
  });
  request += builder.createTextElement({
    data: "Grape                $40.00\n",
  });
  request += builder.createTextElement({
    data: "Lemon                $50.00\n",
  });
  request += builder.createTextElement({
    data: "Orange               $60.00\n",
  });
  request += builder.createTextElement({
    emphasis: true,
    data: "Subtotal            $200.00\n",
  });
  request += builder.createTextElement({ data: "\n" });

  request += builder.createTextElement({
    underline: true,
    data: "Tax                  $10.00\n",
  });
  request += builder.createTextElement({ underline: false });

  request += builder.createTextElement({ emphasis: true });
  request += builder.createTextElement({ width: 2, data: "Total" });
  request += builder.createTextElement({ width: 1, data: "   " });
  request += builder.createTextElement({ width: 2, data: "$210.00\n" });
  request += builder.createTextElement({ width: 1 });
  request += builder.createTextElement({ emphasis: false });

  request += builder.createTextElement({ data: "\n" });

  request += builder.createTextElement({
    data: "Received            $300.00\n",
  });

  request += builder.createTextElement({ width: 2, data: "Change" });
  request += builder.createTextElement({ width: 1, data: "   " });
  request += builder.createTextElement({ width: 2, data: "$90.00\n" });
  request += builder.createTextElement({ width: 1 });
  request += builder.createTextElement({ data: "\n" });

  request += builder.createTextElement({ characterspace: 0 });

  request += builder.createCutPaperElement({ feed: true });

  // sendMessageApi(request, port)
  //     .then((result) => {
  //         console.log(result);
  //     }, (err) => {
  //         console.log(err);
  //     });;

  sendMessageApi(request, port);
}

export default test;
