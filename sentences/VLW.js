/**
Total log and daily log:
$IIVLW,x.x,N,x.x,N*hh
 I I I__I_Daily log in miles
 I__I_Total log in miles
 */
// NMEA0183 Encoder VLW   $IIVLW,9417.40,N,43.18,N*4C

const nmea = require("../nmea");

module.exports = function () {
  return {
    sentence: "VLW",
    title: "VLW - Total log and daily log",
    keys: ["navigation.log", "navigation.logTrip"],
    f(logDistance, tripDistance) {
      return nmea.toSentence([
        "$IIVLW",
        nmea.mToNm(logDistance).toFixed(2),
        "N",
        nmea.mToNm(tripDistance).toFixed(2),
        "N",
      ]);
    },
  };
};
