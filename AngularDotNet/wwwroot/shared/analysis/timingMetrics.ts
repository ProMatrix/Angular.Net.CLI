export class TimingMetrics {
  private metricName: string;
  private startName: string;
  private endName: string;
  private capturedMetric = false;
  private timerId: any;
  private startTimeMs = 0;

  constructor(metricName: string) {
    this.metricName = metricName;
  }

  setStartMarker() {
    if (this.startName) {
      console.log("start metric already set");
      return;
    }
    this.startName = "Start: " + this.metricName;
    this.startTimeMs = new Date().getTime();
    window.performance.mark(this.startName);
  }

  setEndMarker() {
    if (this.capturedMetric) {
      return;
    }

    if (!this.startName) {
      console.log("start metric not set");
      return;
    }

    if (this.endName) {
      console.log("end metric already set");
      return;
    }

    this.endName = "End: " + this.metricName;
    window.performance.mark(this.endName);
  }

  measureInterval(): number {
    if (this.capturedMetric) {
      return -1;
    }

    if (!this.startName) {
      console.log("start metric not set");
      return 0;
    }

    if (!this.endName) {
      console.log("end metric not set");
      return 0;
    }

    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.capturedMetric = true;
    window.performance.measure(": " + this.metricName, this.startName, this.endName);
    return new Date().getTime() - this.startTimeMs;
  }
}
