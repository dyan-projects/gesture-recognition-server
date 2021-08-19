const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-backend-cpu');

const models = require('./models/estimators');

exports.startHandpose = async () => {
  const net = await handpose.load();
  return net;
};

exports.detect = async (net, input) => {
  // check if data is available - not really doing anything useful at the moment
  if (input === null) {
    console.log('Image or video feed not found!');
    return null;
  }
  // Make detections
  const handGesture = await net.estimateHands(input);
  console.log(handGesture);

  if (handGesture.length < 1) {
    return null;
  }
  const GE = new models.GestureEstimator([
    models.Gestures.VictoryGesture,
    models.Gestures.ThumbsUpGesture,
    models.Gestures.ThumbsDownGesture,
    models.Gestures.LeftGesture,
    models.Gestures.RightGesture,
    models.Gestures.OpenPalmGesture,
    models.Gestures.ClosedFistGesture,
  ]);
  const gesture = GE.estimate(hand[0].landmarks, 4);
  if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
    console.log(gesture.gestures);
    const confidence = gesture.gestures.map(prediction => prediction.confidence);
    const maxConfidence = confidence.indexOf(Math.max(confidence));
    console.log(confidence);
    console.log(maxConfidence);
    console.log(gesture.gestures[maxConfidence].name);

    return {
      handgesture: handGesture,
      detectedGesture: gesture.gestures[maxConfidence].name,
    };
  }
};
