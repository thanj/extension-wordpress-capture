function janrainCaptureWidgetOnLoad() {
    // check for access token in localStorage and create session
    if(localStorage && localStorage.getItem("janrainCaptureTokenWP")) {
        janrain.capture.ui.createCaptureSession(localStorage.getItem("janrainCaptureTokenWP"));
        localStorage.removeItem("janrainCaptureTokenWP");
    }
    janrain.capture.ui.start();
}
