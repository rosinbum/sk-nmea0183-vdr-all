/**
Apparent wind angle and speed:
$IIVWR,x.x,a,x.x,N,x.x,M,x.x,K*hh
 I I I I I I I__I_Wind speed in kph
 I I I I I__I_Wind speed in m/s
 I I I__I_Wind speed in knots
 I__I_Apparent wind angle from 0° to 180°, L=port, R=starboard
 */

// NMEA0183 Encoder VWR   $IIVWR,42.01,R,14.11,N,7.26,M,26.14,K*75
const nmea = require("../nmea");

module.exports = function () {
  return {
    sentence: "VWR",
    optionKey: "VWR",
    title: "VWR - Apparent wind angle and speed",
    keys: ["environment.wind.speedApparent", "environment.wind.angleApparent"],
    f(speedApparent, myAngleApparent) {
      let windDirection = "R";
      let angleApparent = myAngleApparent;
      if (angleApparent < 0) {
        angleApparent = -angleApparent;
        windDirection = "L";
      }
      return nmea.toSentence([
        "$IIVWR",
        nmea.radsToDeg(angleApparent).toFixed(2),
        windDirection,
        nmea.msToKnots(speedApparent).toFixed(2),
        "N",
        speedApparent.toFixed(2),
        "M",
        nmea.msToKM(speedApparent).toFixed(2),
        "K",
      ]);
    },
  };
};
