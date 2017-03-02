export default class Utils {
    static formatTime(publishedTime) {
        var lastTime = new Date(publishedTime);
        var year = lastTime.getFullYear().toString();
        var month = (lastTime.getMonth() + 1).toString();
        var day = lastTime.getDate().toString();
        var hour = this.zeroize(lastTime.getHours());
        var minute = this.zeroize(lastTime.getMinutes());

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    static zeroize(value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    }
}
