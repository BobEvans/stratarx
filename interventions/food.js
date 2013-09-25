<script>
 // This function will become boilerplate, but it shows how the ui is completely controllable for the feedback/intervention
  function createDisplay() {
    var output = document.createElement("div");
    output.setAttribute("id", "output");
    document.body.appendChild(output);
    var display = $("#output");
    return {
        title : function(titlemsg) {
          display.html("<h1>"+titlemsg+"</h1>\n" + display.html());
        },
        add : function(msg) {
          display.html(display.html() + "\n<p style=\"font-size: large;\">"+msg+"</p>");
        }
    };
  };

  // This function is also boilerplate that brings the data from the phone's datastore into the javascript environment
  // so that is can be used to create a custom response for the user.
  function getData() {
        var jsondata = window.eventLoader.loadAllEvents();
        var experimentData = $.parseJSON(jsondata);
        if (!experimentData) {
          // hack for samsung tmobile phones
          experimentData = eval('(' + jsondata + ')');
        }
        return experimentData;    
  };

  function lastResponse(experimentData, item, numPast) {
     var total = 0;
     var count = numPast;
     if (count > experimentData.length) {
       count = experimentData.length;
     }
     for (var i = 0; i < count; i++) {
        for (var j =0 ; j < experimentData[i].responses.length; j++) {
          if (experimentData[i].responses[j]["inputName"] === item) {
            return parseInt(experimentData[i].responses[j]["answer"]);
          }
        }        
     }
    if (count > 0) {
     return total / count;
    } else {
      return 0;
    }
  };
   
  // This is the key function for showing feedback predicated on their responses
  function computeFeedback(averageResponse) {
      if (averageResponse > 4) {
        return "Eat something lighter";
      } else if (averageResponse < 2) {
        return "You need energy!";
      } else {
        return "You're doing great with your choices.";
      }
  };

  // This is the main part of the script that creates the display, gets the data, and 
  // shows conditional feedback based on analysis.
  function main() {
    var experimentData = getData();
    var display = createDisplay();

    display.title("Your Progress Report");
 
    if (experimentData === undefined || experimentData.length == 0) {
      display.add("No responses yet to give feedback on");
    } else {
      var averageResponse = lastResponse(experimentData, "energy", 3);
      var intervention = computeFeedback(averageResponse);

      display.add(intervention);
    }
  };
  main();

</script>