export class TimingMetrics {
  private metricName: string;
  private startName: string;
  private endName: string;
  private capturedMetric = false;
  private timerId: any;

  constructor(metricName: string) {
    this.metricName = metricName;
  }

  setStartMarker() {
    if (this.startName) {
      console.log("start metric already set");
      return;
    }
    this.startName = "Start: " + this.metricName;
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

  measureInterval() {
    if (this.capturedMetric) {
      return;
    }

    if (!this.startName) {
      console.log("start metric not set");
      return;
    }

    if (!this.endName) {
      console.log("end metric not set");
      return;
    }

    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.capturedMetric = true;
      window.performance.measure(": " + this.metricName, this.startName, this.endName);
    }, 0);
  }
}
