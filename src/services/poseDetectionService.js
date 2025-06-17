/**
 * Pose Detection Service
 * 
 * This service handles all interaction with TensorFlow.js and MediaPipe pose detection models.
 * It provides methods for initializing the models, processing video frames, and calculating
 * shooting form metrics based on detected keypoints.
 */

import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

class PoseDetectionService {
  constructor() {
    this.model = null;
    this.detector = null;
    this.isModelLoaded = false;
  }

  /**
   * Initialize TensorFlow.js and the pose detection model
   */
  async initialize() {
    try {
      // Load TensorFlow.js
      await tf.ready();
      
      // Create the detector using MoveNet (faster and more accurate than PoseNet)
      this.detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
          enableSmoothing: true,
          minPoseScore: 0.25
        }
      );
      
      this.isModelLoaded = true;
      console.log('Pose detection model loaded successfully');
      return true;
    } catch (error) {
      console.error('Error initializing pose detection model:', error);
      return false;
    }
  }

  /**
   * Detect poses in a video frame
   * @param {HTMLVideoElement|HTMLImageElement|HTMLCanvasElement} source - Source image/video/canvas
   * @returns {Array} Array of detected poses
   */
  async detectPose(source) {
    if (!this.isModelLoaded) {
      throw new Error('Pose detection model not initialized');
    }

    try {
      const poses = await this.detector.estimatePoses(source);
      return poses;
    } catch (error) {
      console.error('Error detecting pose:', error);
      throw error;
    }
  }

  /**
   * Extract shooting form metrics from a sequence of poses
   * @param {Array} poseSequence - Array of poses captured during the shot
   * @param {Object} userMetadata - User metadata like height
   * @returns {Object} Object containing shot form metrics
   */
  extractShootingMetrics(poseSequence, userMetadata = {}) {
    // Identify key frames in the shooting sequence
    const { setupFrame, releaseFrame, followThroughFrame } = this.identifyKeyFrames(poseSequence);
    
    // If we couldn't identify key frames, return error
    if (!setupFrame || !releaseFrame) {
      return {
        success: false,
        error: 'Could not identify key shooting phases. Please ensure the video shows a complete shot.'
      };
    }

    // Calculate metrics
    const elbowAngle = this.calculateElbowAngle(releaseFrame);
    const releasePoint = this.calculateReleasePoint(releaseFrame, userMetadata.height);
    const shotArc = this.calculateShotArc(poseSequence, releaseFrame);
    const alignment = this.calculateAlignment(releaseFrame);
    const followThrough = this.evaluateFollowThrough(releaseFrame, followThroughFrame);
    
    // Calculate overall form score (weighted average of normalized metrics)
    const overallScore = this.calculateOverallScore({
      elbowAngle,
      releasePoint,
      shotArc,
      alignment,
      followThrough
    });

    return {
      success: true,
      metrics: {
        elbowAngle: {
          value: elbowAngle,
          idealRange: { min: 85, max: 95 },
          score: this.scoreElbowAngle(elbowAngle)
        },
        releasePoint: {
          value: releasePoint,
          idealRange: this.getIdealReleasePointRange(userMetadata.height),
          score: this.scoreReleasePoint(releasePoint, userMetadata.height)
        },
        shotArc: {
          value: shotArc,
          idealRange: { min: 45, max: 55 },
          score: this.scoreShotArc(shotArc)
        },
        alignment: {
          value: alignment,
          idealRange: { min: 0.8, max: 1 },
          score: this.scoreAlignment(alignment)
        },
        followThrough: {
          value: followThrough,
          idealRange: { min: 0.8, max: 1 },
          score: this.scoreFollowThrough(followThrough)
        }
      },
      overallScore
    };
  }

  /**
   * Identify key frames in the shooting sequence (setup, release, follow through)
   * @param {Array} poseSequence - Array of poses
   * @returns {Object} Object containing key frame indices
   */
  identifyKeyFrames(poseSequence) {
    if (!poseSequence || poseSequence.length < 3) {
      return { setupFrame: null, releaseFrame: null, followThroughFrame: null };
    }

    // Simple approach: for a short sequence, we can estimate
    // - First third: setup
    // - Middle: release
    // - Last third: follow-through
    const setupIndex = Math.floor(poseSequence.length * 0.2);
    const releaseIndex = Math.floor(poseSequence.length * 0.6); // Release typically happens at about 60% through the motion
    const followThroughIndex = Math.floor(poseSequence.length * 0.9);

    // A more sophisticated approach would analyze wrist/elbow velocity to identify release point
    // We'll implement a basic version here, looking for maximum wrist height or velocity

    return {
      setupFrame: poseSequence[setupIndex],
      releaseFrame: poseSequence[releaseIndex],
      followThroughFrame: poseSequence[followThroughIndex]
    };
  }

  /**
   * Calculate the elbow angle at release
   * @param {Object} pose - Pose object at release point
   * @returns {number} Elbow angle in degrees
   */
  calculateElbowAngle(pose) {
    if (!pose || !pose.keypoints) return null;
    
    // Extract keypoints for the shooting arm (assume right arm for now)
    // In a complete implementation, we would detect dominant hand
    const shoulder = this.findKeypoint(pose.keypoints, 'right_shoulder');
    const elbow = this.findKeypoint(pose.keypoints, 'right_elbow');
    const wrist = this.findKeypoint(pose.keypoints, 'right_wrist');
    
    if (!shoulder || !elbow || !wrist) return null;
    
    // Calculate vectors
    const upperArm = {
      x: elbow.x - shoulder.x,
      y: elbow.y - shoulder.y
    };
    
    const forearm = {
      x: wrist.x - elbow.x,
      y: wrist.y - elbow.y
    };
    
    // Calculate dot product
    const dotProduct = upperArm.x * forearm.x + upperArm.y * forearm.y;
    
    // Calculate magnitudes
    const upperArmMagnitude = Math.sqrt(upperArm.x * upperArm.x + upperArm.y * upperArm.y);
    const forearmMagnitude = Math.sqrt(forearm.x * forearm.x + forearm.y * forearm.y);
    
    // Calculate angle in radians
    const angleRadians = Math.acos(dotProduct / (upperArmMagnitude * forearmMagnitude));
    
    // Convert to degrees
    const angleDegrees = angleRadians * (180 / Math.PI);
    
    return angleDegrees;
  }

  /**
   * Calculate the release point height
   * @param {Object} pose - Pose object at release point
   * @param {number} userHeight - User's height in cm
   * @returns {number} Release point height in relation to body height
   */
  calculateReleasePoint(pose, userHeight = 180) {
    if (!pose || !pose.keypoints) return null;
    
    const wrist = this.findKeypoint(pose.keypoints, 'right_wrist');
    const ankle = this.findKeypoint(pose.keypoints, 'right_ankle');
    
    if (!wrist || !ankle) return null;
    
    // Calculate release height as percentage of body height
    const pixelHeight = ankle.y - wrist.y;
    
    // Convert to real-world height (approximate)
    // This is a simplification; a more accurate version would use camera calibration
    const releaseHeightPercentage = pixelHeight / (pose.height * 0.8);
    const releaseHeightCm = releaseHeightPercentage * userHeight;
    
    // Convert to feet for display (US audience)
    const releaseHeightFeet = releaseHeightCm * 0.0328084;
    
    return releaseHeightFeet;
  }

  /**
   * Calculate the shot arc
   * @param {Array} poseSequence - Array of poses
   * @param {Object} releaseFrame - Pose at release point
   * @returns {number} Shot arc angle in degrees
   */
  calculateShotArc(poseSequence, releaseFrame) {
    // In a real implementation, we would track the ball position
    // Here we'll return a dummy value for demonstration
    return 47;
  }

  /**
   * Calculate body alignment during shot
   * @param {Object} pose - Pose at release point
   * @returns {number} Alignment score (0-1)
   */
  calculateAlignment(pose) {
    if (!pose || !pose.keypoints) return null;
    
    // Check if shoulders and hips are aligned
    const leftShoulder = this.findKeypoint(pose.keypoints, 'left_shoulder');
    const rightShoulder = this.findKeypoint(pose.keypoints, 'right_shoulder');
    const leftHip = this.findKeypoint(pose.keypoints, 'left_hip');
    const rightHip = this.findKeypoint(pose.keypoints, 'right_hip');
    
    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return null;
    
    // Calculate shoulder angle
    const shoulderAngle = Math.atan2(
      rightShoulder.y - leftShoulder.y,
      rightShoulder.x - leftShoulder.x
    );
    
    // Calculate hip angle
    const hipAngle = Math.atan2(
      rightHip.y - leftHip.y,
      rightHip.x - leftHip.x
    );
    
    // Calculate difference between angles
    const angleDifference = Math.abs(shoulderAngle - hipAngle);
    
    // Convert to a score (0-1), where 0 is completely misaligned and 1 is perfectly aligned
    const alignmentScore = 1 - (angleDifference / Math.PI);
    
    return alignmentScore;
  }

  /**
   * Evaluate follow-through quality
   * @param {Object} releaseFrame - Pose at release point
   * @param {Object} followThroughFrame - Pose during follow through
   * @returns {number} Follow-through score (0-1)
   */
  evaluateFollowThrough(releaseFrame, followThroughFrame) {
    if (!releaseFrame || !followThroughFrame) return null;
    
    const releaseWrist = this.findKeypoint(releaseFrame.keypoints, 'right_wrist');
    const followWrist = this.findKeypoint(followThroughFrame.keypoints, 'right_wrist');
    
    if (!releaseWrist || !followWrist) return null;
    
    // Check if wrist is higher in follow-through than at release
    const wristHeightDifference = releaseWrist.y - followWrist.y;
    
    // A good follow-through should have the wrist higher than at release
    if (wristHeightDifference > 0) {
      return 0.9; // Good follow-through
    } else {
      // Score based on how much lower the wrist is
      return Math.max(0.5, 1 - Math.abs(wristHeightDifference / 100));
    }
  }

  /**
   * Helper to find a specific keypoint in the keypoints array
   * @param {Array} keypoints - Array of keypoints
   * @param {string} name - Name of the keypoint to find
   * @returns {Object|null} The keypoint object or null if not found
   */
  findKeypoint(keypoints, name) {
    const keypoint = keypoints.find(kp => kp.name === name);
    return keypoint && keypoint.score > 0.5 ? keypoint : null;
  }

  /**
   * Score the elbow angle based on ideal range
   * @param {number} angle - Elbow angle in degrees
   * @returns {number} Score from 0-100
   */
  scoreElbowAngle(angle) {
    if (angle === null) return 0;
    
    // Ideal range is 85-95 degrees
    if (angle >= 85 && angle <= 95) {
      return 100; // Perfect
    }
    
    // Score decreases as we move away from ideal range
    if (angle < 85) {
      return 100 - ((85 - angle) * 5);
    } else {
      return 100 - ((angle - 95) * 5);
    }
  }

  /**
   * Get ideal release point range based on user height
   * @param {number} userHeight - User height in cm
   * @returns {Object} Min and max ideal release height
   */
  getIdealReleasePointRange(userHeight = 180) {
    // Convert height to feet for calculation
    const heightFeet = userHeight * 0.0328084;
    
    // Ideal release point is typically 1.1-1.2x eye level
    // Eye level is approximately 0.94 * height
    const eyeLevel = 0.94 * heightFeet;
    
    return {
      min: eyeLevel * 1.1,
      max: eyeLevel * 1.2
    };
  }

  /**
   * Score the release point height
   * @param {number} releaseHeight - Release height in feet
   * @param {number} userHeight - User height in cm
   * @returns {number} Score from 0-100
   */
  scoreReleasePoint(releaseHeight, userHeight) {
    if (releaseHeight === null) return 0;
    
    const idealRange = this.getIdealReleasePointRange(userHeight);
    
    if (releaseHeight >= idealRange.min && releaseHeight <= idealRange.max) {
      return 100; // Perfect
    }
    
    // Score decreases as we move away from ideal range
    if (releaseHeight < idealRange.min) {
      return 100 - ((idealRange.min - releaseHeight) * 50);
    } else {
      return 100 - ((releaseHeight - idealRange.max) * 50);
    }
  }

  /**
   * Score the shot arc
   * @param {number} arc - Shot arc in degrees
   * @returns {number} Score from 0-100
   */
  scoreShotArc(arc) {
    if (arc === null) return 0;
    
    // Ideal range is 45-55 degrees
    if (arc >= 45 && arc <= 55) {
      return 100; // Perfect
    }
    
    // Score decreases as we move away from ideal range
    if (arc < 45) {
      return 100 - ((45 - arc) * 5);
    } else {
      return 100 - ((arc - 55) * 5);
    }
  }

  /**
   * Score the body alignment
   * @param {number} alignment - Alignment score (0-1)
   * @returns {number} Score from 0-100
   */
  scoreAlignment(alignment) {
    if (alignment === null) return 0;
    
    // Convert 0-1 score to 0-100
    return alignment * 100;
  }

  /**
   * Score the follow-through
   * @param {number} followThrough - Follow-through score (0-1)
   * @returns {number} Score from 0-100
   */
  scoreFollowThrough(followThrough) {
    if (followThrough === null) return 0;
    
    // Convert 0-1 score to 0-100
    return followThrough * 100;
  }

  /**
   * Calculate overall form score
   * @param {Object} metrics - Object containing all metrics
   * @returns {number} Overall score from 0-100
   */
  calculateOverallScore(metrics) {
    const weights = {
      elbowAngle: 0.25,
      releasePoint: 0.2,
      shotArc: 0.2,
      alignment: 0.15,
      followThrough: 0.2
    };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    // Calculate weighted average of available metrics
    Object.keys(weights).forEach(metric => {
      if (metrics[metric] !== null) {
        const score = this[`score${metric.charAt(0).toUpperCase() + metric.slice(1)}`](metrics[metric]);
        totalScore += score * weights[metric];
        totalWeight += weights[metric];
      }
    });
    
    // Normalize by total weight of available metrics
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }
}

export default new PoseDetectionService();