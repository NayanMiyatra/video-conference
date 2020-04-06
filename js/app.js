// replace these values with those generated in your TokBox Account
var apiKey = "46650752";
var sessionId =
  "2_MX40NjY1MDc1Mn5-MTU4NjE1NzY2MzA1MH5wanZJNUlPV0VCd1hDS2JZbFV3L2RwUVh-fg";
var token =
  "T1==cGFydG5lcl9pZD00NjY1MDc1MiZzaWc9ZTY4MmVjMGQwZjc5YjhlNzA3MjZiMDIzNjYxZTE4Mjc2NTE2YWE2MTpzZXNzaW9uX2lkPTJfTVg0ME5qWTFNRGMxTW41LU1UVTROakUxTnpZMk16QTFNSDV3YW5aSk5VbFBWMFZDZDFoRFMySlpiRlYzTDJSd1VWaC1mZyZjcmVhdGVfdGltZT0xNTg2MTY0MzY3Jm5vbmNlPTAuNTE2NzQ2MzY4OTc5Nzk1MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg2MTY3OTYzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
