const { Finger, FingerCurl, FingerDirection } = require('../estimators/FingerDescription');
const GestureDescription = require('../estimators/GestureDescription');

// describe left gesture 👈
const leftDescription = new GestureDescription('left');

// index
// -not curled
// - vertical up (best) or diagonal up left / right
leftDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
leftDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
leftDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.25);
leftDescription.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.25);

// thumb:
// - not curled
// - vertical up (best) or diagonal up left / right
leftDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
leftDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);
leftDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);
leftDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);

// all other fingers:
// - curled
// - horizontal left or right
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  leftDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  leftDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  leftDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

exports.LeftGesture = leftDescription;
