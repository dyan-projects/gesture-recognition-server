const { Finger, FingerCurl, FingerDirection } = require('../estimators/FingerDescription');
const GestureDescription = require('../estimators/GestureDescription');

// describe left gesture 👉
const rightDescription = new GestureDescription('right');

//index
//-not curled
// - vertical up (best) or diagonal up left / right
rightDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
rightDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
rightDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.25);
rightDescription.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.25);

// thumb:
// - not curled
// - vertical up (best) or diagonal up left / right
rightDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
rightDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);
rightDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);
rightDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);

// all other fingers:
// - curled
// - horizontal left or right
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  rightDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  rightDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  rightDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

exports.RightDescription = rightDescription;
