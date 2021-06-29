/* eslint-disable prettier/prettier */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-control-regex */
var StarWebPrintBuilder = function () { };
StarWebPrintBuilder.prototype.createAlignmentElement = function (b) {
    var a = "<alignment";
    void 0 != b &&
        (a += this._analysisEnumAttribute(
            "position",
            b.position,
            /^(left|center|right)$/
        ));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createBarcodeElement = function (b) {
    var a;
    if (void 0 != b) {
        a =
            "<barcode" +
            this._analysisEnumAttribute(
                "symbology",
                b.symbology,
                /^(UPCE|UPCA|JAN8|JAN13|Code39|ITF|Code128|Code93|NW7)$/
            );
        a += this._analysisEnumAttribute(
            "width",
            b.width,
            /^(width[2-4]|width_mode[1-9])$/
        );
        a += this._analysisEnumAttribute("hri", b.hri, /^(false|true)$/);
        a += this._analysisValueAttribute("height", b.height, 1, 255);
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        a = a + ">" + this._encodeEscapeSequenceBinary(b.data);
    } else throw Error("Argument is undefined.");
    return (a += "</barcode>");
};
StarWebPrintBuilder.prototype.createBitImageElement = function (b) {
    var a = "<bitimage";
    if (void 0 != b) {
        var d = 0,
            e = 0,
            c = 0,
            f = 0;
        void 0 != b.x && (d = b.x);
        void 0 != b.y && (e = b.y);
        void 0 != b.width && (c = b.width);
        void 0 != b.height && (f = b.height);
        this._analysisValueAttribute("x", d, 0, 65535);
        this._analysisValueAttribute("y", e, 0, 65535);
        a += this._analysisValueAttribute("width", c, 0, 65535);
        a += this._analysisValueAttribute("height", f, 0, 65535);
        if (void 0 == b.context) throw Error('Argument "context" is undefined.');
        a =
            a +
            ">" +
            this._encodeRasterImage(b.context.getImageData(d, e, c, f).data, c, f);
    } else throw Error("Argument is undefined.");
    return (a += "</bitimage>");
};
StarWebPrintBuilder.prototype.createCutPaperElement = function (b) {
    var a = "<cutpaper";
    void 0 != b &&
        ((a += this._analysisEnumAttribute("feed", b.feed, /^(false|true)$/)),
            (a += this._analysisEnumAttribute("type", b.type, /^(full|partial)$/)));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createFeedElement = function (b) {
    var a;
    if (void 0 != b)
        if (void 0 != b.line || void 0 != b.unit)
            (a = "<feed" + this._analysisValueAttribute("line", b.line, 1, 255)),
                (a += this._analysisValueAttribute("unit", b.unit, 1, 255));
        else throw Error('Argument "line / unit" is undefined.');
    else throw Error("Argument is undefined.");
    return a + "/>";
};
StarWebPrintBuilder.prototype.createInitializationElement = function (b) {
    var a = "<initialization";
    void 0 != b &&
        ((a += this._analysisEnumAttribute("reset", b.reset, /^(false|true)$/)),
            (a += this._analysisEnumAttribute("print", b.print, /^(false|true)$/)));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createLogoElement = function (b) {
    var a = "<logo";
    void 0 != b &&
        ((a += this._analysisEnumAttribute("width", b.width, /^(single|double)$/)),
            (a += this._analysisEnumAttribute("height", b.height, /^(single|double)$/)),
            (a += this._analysisValueAttribute("number", b.number, 1, 255)));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createPdf417Element = function (b) {
    var a;
    if (void 0 != b) {
        a =
            "<pdf417" +
            this._analysisEnumAttribute("level", b.level, /^(level[0-8])$/);
        void 0 != b.line &&
            (a =
                0 != b.line
                    ? a + this._analysisValueAttribute("line", b.line, 3, 90)
                    : a + ' line="0"');
        a += this._analysisValueAttribute("column", b.column, 0, 30);
        a += this._analysisValueAttribute("module", b.module, 1, 8);
        a += this._analysisValueAttribute("aspect", b.aspect, 1, 8);
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        a = a + ">" + this._encodeEscapeSequenceBinary(b.data);
    } else throw Error("Argument is undefined.");
    return (a += "</pdf417>");
};
StarWebPrintBuilder.prototype.createPeripheralElement = function (b) {
    var a = "<peripheral";
    void 0 != b &&
        ((a += this._analysisValueAttribute("channel", b.channel, 1, 2)),
            (a += this._analysisValueAttribute("on", b.on, 1, 65535)),
            (a += this._analysisValueAttribute("off", b.off, 1, 65535)));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createQrCodeElement = function (b) {
    var a;
    if (void 0 != b) {
        a =
            "<qrcode" +
            this._analysisEnumAttribute("model", b.model, /^(model[12])$/);
        a += this._analysisEnumAttribute("level", b.level, /^(level_[lmqh])$/);
        a += this._analysisValueAttribute("cell", b.cell, 1, 8);
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        a = a + ">" + this._encodeEscapeSequenceBinary(b.data);
    } else throw Error("Argument is undefined.");
    return (a += "</qrcode>");
};
StarWebPrintBuilder.prototype.createRawDataElement = function (b) {
    if (void 0 != b) {
        if (void 0 == b.data) throw Error('Argument "data" is undefined.');
        b = "<rawdata>" + this._encodeBase64Binary(b.data);
    } else throw Error("Argument is undefined.");
    return b + "</rawdata>";
};
StarWebPrintBuilder.prototype.createRuledLineElement = function (b) {
    var a = "<ruledline";
    void 0 != b &&
        ((a += this._analysisEnumAttribute(
            "thickness",
            b.thickness,
            /^(thin|medium|thick|double_(thin|medium|thick))$/
        )),
            (a += this._analysisValueAttribute("width", b.width, 1, 65535)));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createSoundElement = function (b) {
    var a = "<sound";
    void 0 != b &&
        ((a += this._analysisValueAttribute("channel", b.channel, 1, 2)),
            (a += this._analysisValueAttribute("repeat", b.repeat, 1, 20)));
    return a + "/>";
};
StarWebPrintBuilder.prototype.createTextElement = function (b) {
    var a;
    if (void 0 != b)
        (a =
            "<text" +
            this._analysisEnumAttribute("emphasis", b.emphasis, /^(false|true)$/)),
            (a += this._analysisEnumAttribute("invert", b.invert, /^(false|true)$/)),
            (a += this._analysisEnumAttribute("linespace", b.linespace, /^(24|32)$/)),
            (a += this._analysisEnumAttribute("font", b.font, /^(font_[ab])$/)),
            (a += this._analysisEnumAttribute(
                "underline",
                b.underline,
                /^(false|true)$/
            )),
            (a += this._analysisValueAttribute(
                "characterspace",
                b.characterspace,
                0,
                7
            )),
            (a += this._analysisValueAttribute("width", b.width, 1, 6)),
            (a += this._analysisValueAttribute("height", b.height, 1, 6)),
            (a += this._analysisEnumAttribute(
                "codepage",
                b.codepage,
                /^(cp(437|737|772|774|851|852|855|857|858|860|861|862|863|864|865|866|869|874|928|932|998|999|1001|1250|1251|1252|2001|3001|3002|3011|3012|3021|3041|3840|3841|3843|3844|3845|3846|3847|3848)|utf8|blank|utf8|shift_jis|gb18030|gb2312|big5|korea)$/
            )),
            (a += this._analysisEnumAttribute(
                "international",
                b.international,
                /^(usa|france|germany|uk|denmark|sweden|italy|spain|japan|norway|denmark2|spain2|latin_america|korea|ireland|legal)$/
            )),
            void 0 != b.data
                ? ((a += ">"),
                    (a =
                        !0 == b.binary
                            ? a + this._encodeEscapeSequenceBinary(b.data)
                            : a + this._encodeEscapeSequence(b.data)),
                    (a += "</text>"))
                : (a += "/>");
    else throw Error("Argument is undefined.");
    return a;
};
StarWebPrintBuilder.prototype._analysisEnumAttribute = function (b, a, d) {
    if (void 0 != a) {
        if (!d.test(a)) throw Error('Argument "' + b + '" is invalid.');
        return " " + b + '="' + a + '"';
    }
    return "";
};
StarWebPrintBuilder.prototype._analysisValueAttribute = function (b, a, d, e) {
    if (void 0 != a) {
        if (a < d || a > e) throw Error('Argument "' + b + '" is invalid.');
        return " " + b + '="' + a + '"';
    }
    return "";
};
StarWebPrintBuilder.prototype._encodeEscapeSequence = function (b) {
    var a = /[\\\x00-\x20\x26\x3c\x3e\x7f]/g;
    a.test(b) &&
        (b = b.replace(a, function (a) {
            return "\\" == a
                ? "\\\\"
                : "\\x" + ("0" + a.charCodeAt(0).toString(16)).slice(-2);
        }));
    return b;
};
StarWebPrintBuilder.prototype._encodeEscapeSequenceBinary = function (b) {
    var a = /[\\\x00-\x20\x26\x3c\x3e\x7f-\xff]/g;
    a.test(b) &&
        (b = b.replace(a, function (a) {
            return "\\" == a
                ? "\\\\"
                : "\\x" + ("0" + a.charCodeAt(0).toString(16)).slice(-2);
        }));
    return b;
};
StarWebPrintBuilder.prototype._encodeBase64Binary = function (b) {
    var a = "",
        d = b.length;
    b += "\x00\x00";
    for (var e = 0; e < d; e += 3)
        var c =
            (b.charCodeAt(e) << 16) |
            (b.charCodeAt(e + 1) << 8) |
            b.charCodeAt(e + 2),
            a =
                a +
                ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                    (c >> 18) & 63
                ) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                        (c >> 12) & 63
                    ) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                        (c >> 6) & 63
                    ) +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                        c & 63
                    ));
    switch (d % 3) {
        case 1:
            return a.slice(0, -2) + "==";
        case 2:
            return a.slice(0, -1) + "=";
    }
    return a;
};
StarWebPrintBuilder.prototype._encodeRasterImage = function (b, a, d) {
    for (
        var e = [
            [-254, -126, -222, -94, -246, -118, -214, -86],
            [-62, -190, -30, -158, -54, -182, -22, -150],
            [-206, -78, -238, -110, -198, -70, -230, -102],
            [-14, -142, -46, -174, -6, -134, -38, -166],
            [-242, -114, -210, -82, -250, -122, -218, -90],
            [-50, -178, -18, -146, -58, -186, -26, -154],
            [-194, -66, -226, -98, -202, -74, -234, -106],
            [-2, -130, -34, -162, -10, -138, -42, -170],
        ],
        c = "",
        f = 0,
        g = 0;
        g < d;
        g++
    ) {
        for (var h = 0, k = 128, l = 0; l < a; l++)
            if (
                (((30 * b[f] + 59 * b[f + 1] + 11 * b[f + 2]) * b[f + 3] + 12800) /
                    25500 -
                    b[f + 3] <
                    e[g & 7][l & 7] && (h |= k),
                    (f += 4),
                    0 == (k >>= 1))
            )
                (c += String.fromCharCode(h)), (h = 0), (k = 128);
        128 != k && (c += String.fromCharCode(h));
    }
    b = c;
    c = "";
    a = b.length;
    b += "\x00\x00";
    for (g = 0; g < a; g += 3)
        (d =
            (b.charCodeAt(g) << 16) |
            (b.charCodeAt(g + 1) << 8) |
            b.charCodeAt(g + 2)),
            (c +=
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                    (d >> 18) & 63
                ) +
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                    (d >> 12) & 63
                ) +
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                    (d >> 6) & 63
                ) +
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(
                    d & 63
                ));
    switch (a % 3) {
        case 1:
            return c.slice(0, -2) + "==";
        case 2:
            return c.slice(0, -1) + "=";
    }
    return c;
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = StarWebPrintBuilder;
}

var StarWebPrintTrader = function (a) {
    this.papertype = this.checkedblock = this.url = null;
    this.timeout = 9e4;
    this._json =
        this._url =
        this.onTimeout =
        this.onError =
        this.onReceive =
        null;
    void 0 != a &&
        (void 0 != a.url && (this.url = a.url),
            void 0 != a.checkedblock && (this.checkedblock = a.checkedblock),
            void 0 != a.papertype && (this.papertype = a.papertype),
            void 0 != a.timeout && (this.timeout = a.timeout));
},
    _handlerCallback = {},
    _onFinish = function (a) {
        var b = _handlerCallback[a.url],
            c = a.response;
        _handlerCallback[a.url] = null;
        if (200 == a.htmlCode)
            b.onReceive({
                traderSuccess: c.slice(
                    c.indexOf("&lt;success&gt;") + 15,
                    c.indexOf("&lt;/success&gt;")
                ),
                traderCode: c.slice(
                    c.indexOf("&lt;code&gt;") + 12,
                    c.indexOf("&lt;/code&gt;")
                ),
                traderStatus: c.slice(
                    c.indexOf("&lt;status&gt;") + 14,
                    c.indexOf("&lt;/status&gt;")
                ),
                status: a.htmlCode,
                responseText: c,
            });
        else b.onError({ status: a.htmlCode, responseText: c });
    };
StarWebPrintTrader.prototype._callMessageHandler = function () {
    var a = this;
    null == _handlerCallback[a._url]
        ? ((_handlerCallback[a._url] = a),
            webkit.messageHandlers.sendMessageHandler.postMessage(a._json))
        : setTimeout(function () {
            a._callMessageHandler();
        }, 500);
};
StarWebPrintTrader.prototype.sendMessage = function (a) {
    var b = "<root";
    void 0 != a.checkedblock
        ? !1 == a.checkedblock && (b += ' checkedblock="false"')
        : !1 == this.checkedblock && (b += ' checkedblock="false"');
    void 0 != a.papertype
        ? "normal" == a.papertype
            ? (b += ' papertype="normal"')
            : "black_mark" == a.papertype
                ? (b += ' papertype="black_mark"')
                : "black_mark_and_detect_at_power_on" == a.papertype &&
                (b += ' papertype="black_mark_and_detect_at_power_on"')
        : "normal" == this.papertype
            ? (b += ' papertype="normal"')
            : "black_mark" == this.papertype
                ? (b += ' papertype="black_mark"')
                : "black_mark_and_detect_at_power_on" == this.papertype &&
                (b += ' papertype="black_mark_and_detect_at_power_on"');
    var b = b + (">" + a.request + "</root>"),
        c;
    c =
        '<StarWebPrint xmlns="http://www.star-m.jp" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><Request>';
    c += this._encodeEscapeSequence(b);
    c += "</Request>";
    c += "</StarWebPrint>";
    b = "";
    b = void 0 != a.url ? a.url : this.url;
    if (
        /^https?:\/\/(localhost|127\.0\.0\.1):8001\//.test(b.toLowerCase()) &&
        -1 != navigator.userAgent.indexOf("webPRNTSupportMessageHandler")
    )
        (this._json = JSON.stringify({ url: b, body: c })),
            (this._url = b),
            this._callMessageHandler();
    else {
        var d = null;
        if (window.XMLHttpRequest) d = new XMLHttpRequest();
        else if (window.ActiveXObject) d = new ActiveXObject("Microsoft.XMLHTTP");
        else {
            if (this.onError)
                this.onError({
                    status: 10001,
                    responseText: "XMLHttpRequest is not supported.",
                });
            return;
        }
        if (
            -1 != navigator.userAgent.indexOf("iPad;") ||
            -1 != navigator.userAgent.indexOf("iPhone;") ||
            -1 != navigator.userAgent.indexOf("iPod touch;") ||
            -1 != navigator.userAgent.indexOf("Android")
        )
            if (
                -1 == navigator.userAgent.indexOf("WebPRNTSupportHTTPS") &&
                (0 == b.toLowerCase().indexOf("https://localhost") ||
                    0 == b.toLowerCase().indexOf("https://127.0.0.1"))
            )
                b = "http://" + b.substring(8);
        try {
            d.open("POST", b, !0);
        } catch (f) {
            if (this.onError)
                this.onError({ status: 10002, responseText: f.message });
            return;
        }
        try {
            void 0 != a.timeout
                ? (d.timeout = a.timeout)
                : this.timeout && (d.timeout = this.timeout);
        } catch (h) { }
        d.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
        var e = this;
        d.onreadystatechange = function () {
            if (4 == d.readyState)
                try {
                    if (200 == d.status) {
                        var a = d.responseXML.getElementsByTagName("Response");
                        if (0 < a.length) {
                            if (e.onReceive) {
                                var b = a[0].childNodes[0].nodeValue;
                                e.onReceive({
                                    traderSuccess: b.slice(
                                        b.indexOf("<success>") + 9,
                                        b.indexOf("</success>")
                                    ),
                                    traderCode: b.slice(
                                        b.indexOf("<code>") + 6,
                                        b.indexOf("</code>")
                                    ),
                                    traderStatus: b.slice(
                                        b.indexOf("<status>") + 8,
                                        b.indexOf("</status>")
                                    ),
                                    status: d.status,
                                    responseText: d.responseText,
                                });
                            }
                        } else if (e.onError)
                            e.onError({ status: d.status, responseText: d.responseText });
                    } else if (e.onError)
                        e.onError({ status: d.status, responseText: d.responseText });
                } catch (c) {
                    if (e.onError)
                        e.onError({
                            status: 0,
                            responseText: "Connection timeout occurred.",
                        });
                }
        };
        try {
            d.ontimeout = function () {
                if (e.onTimeout) e.onTimeout();
            };
        } catch (k) { }
        try {
            d.send(c);
        } catch (g) {
            if (this.onError)
                this.onError({ status: 10003, responseText: g.message });
        }
    }
};
StarWebPrintTrader.prototype._onHandlerSuccess = function (a) {
    if (trader.onReceive) trader.onReceive(a);
};
StarWebPrintTrader.prototype._onHandlerError = function (a) {
    if (trader.onError) trader.onError(a);
};
StarWebPrintTrader.prototype.isCoverOpen = function (a) {
    return parseInt(a.traderStatus.substr(4, 2), 16) & 32 ? !0 : !1;
};
StarWebPrintTrader.prototype.isOffLine = function (a) {
    return parseInt(a.traderStatus.substr(4, 2), 16) & 8 ? !0 : !1;
};
StarWebPrintTrader.prototype.isCompulsionSwitchClose = function (a) {
    return parseInt(a.traderStatus.substr(4, 2), 16) & 4 ? !0 : !1;
};
StarWebPrintTrader.prototype.isEtbCommandExecute = function (a) {
    return parseInt(a.traderStatus.substr(4, 2), 16) & 2 ? !0 : !1;
};
StarWebPrintTrader.prototype.isHighTemperatureStop = function (a) {
    return parseInt(a.traderStatus.substr(6, 2), 16) & 64 ? !0 : !1;
};
StarWebPrintTrader.prototype.isNonRecoverableError = function (a) {
    return parseInt(a.traderStatus.substr(6, 2), 16) & 32 ? !0 : !1;
};
StarWebPrintTrader.prototype.isAutoCutterError = function (a) {
    return parseInt(a.traderStatus.substr(6, 2), 16) & 8 ? !0 : !1;
};
StarWebPrintTrader.prototype.isBlackMarkError = function (a) {
    return parseInt(a.traderStatus.substr(8, 2), 16) & 8 ? !0 : !1;
};
StarWebPrintTrader.prototype.isPaperEnd = function (a) {
    return parseInt(a.traderStatus.substr(10, 2), 16) & 8 ? !0 : !1;
};
StarWebPrintTrader.prototype.isPaperNearEnd = function (a) {
    return parseInt(a.traderStatus.substr(10, 2), 16) & 4 ? !0 : !1;
};
StarWebPrintTrader.prototype.extractionEtbCounter = function (a) {
    var b = 0;
    parseInt(a.traderStatus.substr(14, 2), 16) & 64 && (b |= 16);
    parseInt(a.traderStatus.substr(14, 2), 16) & 32 && (b |= 8);
    parseInt(a.traderStatus.substr(14, 2), 16) & 8 && (b |= 4);
    parseInt(a.traderStatus.substr(14, 2), 16) & 4 && (b |= 2);
    parseInt(a.traderStatus.substr(14, 2), 16) & 2 && (b |= 1);
    return b;
};
StarWebPrintTrader.prototype._encodeEscapeSequence = function (a) {
    var b = /[<>&]/g;
    b.test(a) &&
        (a = a.replace(b, function (a) {
            switch (a) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
            }
            return "&amp;";
        }));
    return a;
};

function sendMessageApi(request, port) {
    // showNowPrinting();
    //document.getElementById('url').value
    var url = `http://192.168.8.145:${port}/StarWebPRNT/SendMessage`;

    var trader = new StarWebPrintTrader({ url: url });

    var isSuccess;
    // return new Promise((resolve, reject) => {
    // debugger
    document.querySelector('.loading').innerHTML = '- Loading Please Wait...'
    trader.onReceive = function (response) {
        isSuccess = true
        document.querySelector('.printting').innerHTML = '- Printing..'
        console.log('onReceive')
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

        document.querySelector('.print-result').innerHTML = 'Print Success'
        //      msg += 'Status : [ ' + response.status + ' ]\n';
        //
        //      msg += 'ResponseText : [ ' + response.responseText + ' ]\n';

        // alert(msg);
        // resolve("Stuff worked!");
    };

    trader.onError = function (response) {
        isSuccess = false
        console.log('onError')
        var msg = "- onError -\n\n";

        msg += "\tStatus:" + response.status + "\n";

        msg += "\tResponseText:" + response.responseText;

        // alert(msg);
        document.querySelector('.print-result').innerHTML = '- Print Failed'
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

    sendMessageApi(request, port)
}

export default test;
