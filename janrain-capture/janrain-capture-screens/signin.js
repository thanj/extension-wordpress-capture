//set the flow name for this screen here
janrain.settings.capture.flowName = 'plugins';
janrain.settings.width = 310;

// call our code/token exchanger, and use the token to set up a capture session
function getTokenForCode(code, redirect_uri) {
	  var url;
		url = janrain.settings.capture.redirectUri;
		url += "&code=" + code;
		window.location.href = url;
}

function janrainCaptureWidgetOnLoad() {
    //check for access token in localStorage and create session
    if(localStorage && localStorage.getItem("janrainCaptureTokenWP")) {
        janrain.capture.ui.createCaptureSession(localStorage.getItem("janrainCaptureTokenWP"));
        localStorage.removeItem("janrainCaptureTokenWP");
    }

    function handleCaptureLogin(result) {
        // console.log ("exchanging code for token...");
        getTokenForCode(result.authorizationCode, janrain.settings.capture.redirectUri);
    }

    janrain.events.onCaptureSessionFound.addHandler(function(result){
	    // console.log ("capture session found");
    });
    janrain.events.onCaptureSessionNotFound.addHandler(function(result){
	    // console.log ("capture session not found");
    });
	janrain.events.onCaptureAccessDenied.addHandler(function(result){
		janrain.capture.ui.createCaptureSession(access_token);
	});

    janrain.events.onCaptureLoginSuccess.addHandler(handleCaptureLogin);
    janrain.events.onCaptureRegistrationSuccess.addHandler(handleCaptureLogin);

    janrain.capture.ui.start();
}
