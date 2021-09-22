const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-node');

const models = require('./models/estimators');

const startHandpose = async () => {
  const net = await handpose.load();
  return net;
};

const detect = async (net, input) => {
  if (!input) return null;
  // Make detections
  const predictions = await net.estimateHands(input);

  if (predictions.length < 1) {
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
  const gesture = GE.estimate(predictions[0].landmarks, 4);
  if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
    const confidence = gesture.gestures.map(prediction => prediction.confidence);
    const maxConfidence = confidence.indexOf(Math.max(confidence));

    return {
      predictions: predictions,
      detectedGesture: gesture.gestures[maxConfidence].name,
    };
  }
};

module.exports = { startHandpose, detect };
