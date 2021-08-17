const { Finger, FingerCurl, FingerDirection } = require('../estimators/FingerDescription');
const GestureDescription = require('../estimators/GestureDescription');

// describe open palm gesture ✋
const openPalmDescription = new GestureDescription('open_palm');

// all other fingers:
// - curled
// - horizontal left or right
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  openPalmDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  openPalmDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  openPalmDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  openPalmDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
  openPalmDescription.addDirection(finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);
}

exports.OpenPalmGesture = openPalmDescription;
