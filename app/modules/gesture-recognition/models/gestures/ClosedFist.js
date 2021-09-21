const { Finger, FingerCurl, FingerDirection } = require('../estimators/FingerDescription');
const GestureDescription = require('../estimators/GestureDescription');

// describe closed fist gesture ✊
const closedFistDescription = new GestureDescription('closed_fist');

// thumb
// - curled
// - horizontal left or right
closedFistDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
closedFistDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
closedFistDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// all other fingers:
// - curled
// - vertical left or right
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  closedFistDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  closedFistDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  closedFistDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

exports.ClosedFistGesture = closedFistDescription;
