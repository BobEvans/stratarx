<script>
  var output = document.createElement("div");
  output.setAttribute("id", "output");
  document.body.appendChild(output);

  function getData() {
        var jsondata = window.eventLoader.loadAllEvents();
        var experimentData = $.parseJSON(jsondata);
        if (!experimentData) {
          // hack for samsung tmobile phones
          experimentData = eval('(' + jsondata + ')');
        }
        return experimentData;    
  };

  var experimentData = getData();
  if (experimentData === undefined || experimentData.length == 0) {
    $("#output").html("No responses to give feedback on");
  } else {
    var answer = experimentData[0].responses[0]["answer"];
    var intervention;
    if (answer === "5") {
	intervention = "Great job on your elite ninja skills!";
    } else if (answer === "1") {
	intervention = "Perhaps you might take a walk to get some fresh air";
    } else {
      intervention = "Keep Going! You're doing great.";
    }
    $("#output").html(intervention);

  }
</script>
