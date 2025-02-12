// NMEA0183 Encoder HDMC   $IIHDM,212.2,M*21
const nmea = require("../nmea");

module.exports = function () {
  return {
    sentence: "HDM",
    title: "HDM - Heading Magnetic, calculated from True",
    keys: ["navigation.headingTrue", "navigation.magneticVariation"],
    f(headingTrue, magneticVariation) {
      const heading = headingTrue + magneticVariation;
      return nmea.toSentence([
        "$IIHDM",
        nmea.radsToDeg(heading).toFixed(1),
        "M",
      ]);
    },
  };
};
