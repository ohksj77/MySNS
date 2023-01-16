
const moment = require("moment");

/**
 * 오늘 날짜의 글일경우 N분전 또는 N시간전 등으로 표기
 * 오늘 이전의 날짜의 경우엔 YYYY-MM-DD 형식으로 표기
 * @param {string} date 'YYYY-MM-DD HH:mm:ss 형식의 문자
 * @return {string}
 */
exports.dateFromNow = (date) => {
    let now = moment();
    date = moment(date);
    let dayDiff = now.diff(date, 'days')
    if (dayDiff) {
        return date;
    } else {
        return now.diff(date, 'hours') > 1 ? now.diff(date, 'hours') + '시간전' : now.diff(date, 'minutes') + '분전';
    }
}

/**
 * 현재 등록한 글이 새 글인지 판단해주는 함수
 * 글을 작성한지 10분 이내의 글은 true를, 이후면 false를 반환
 * @param {string} date 'YYYY-MM-DD HH:mm:ss 형식의 문자
 * @return {boolean}
 */
exports.isNewFeed = (date) => {
    return moment(date).isAfter(moment().add(-10, 'minute'));
}
