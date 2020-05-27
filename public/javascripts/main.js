var count = 1;

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function check(anw) {
    if(count === 1) {
        let el = document.querySelector("#desc" + anw.toString());
        let anw_el = document.querySelector("#anw");
        let num = isNaN(parseInt(getCookie("num"))) ? 0 : parseInt(getCookie("num"));
        num += anw === parseInt(anw_el.innerHTML) ? 1 : 0;
        setCookie("num", num, {"expires": new Date().getDate()+1});
        el.style.backgroundColor = anw === parseInt(anw_el.innerHTML) ? "#4CAF50" : "#F44336";
        anw_el.innerHTML = "text";
        count++;
        setTimeout(function () {
            window.location.replace(window.location.href);
        }, 1500);
    }
}

//TODO: Fix ios

function init() {
    // alert( document.cookie );
    let num;
    if (getCookie("num")) {
        num = getCookie("num");
    }
    else {
        num = 0;
        setCookie("num", 0, {"expires": new Date().getDate()+1});
    }
    let div = document.getElementById("num_anw");
    let p = document.createElement("div");
    p.id = "nums";
    p.className = "col text_form";
    p.innerHTML = "Верных ответов за сутки: " + num.toString();
    div.appendChild(p);
}