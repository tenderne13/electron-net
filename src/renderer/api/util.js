//人类能看懂的时间
export const humanTime =  function (input) {
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    var min = (input / 1000 / 60) << 0,
        sec = Math.floor((input / 1000) % 60);

    return pad(min) + ':' + pad(sec);
}

//
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}