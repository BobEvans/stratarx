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

  // This is a function to compute the average value of the numerical response, "item", over the last "numPast" responses.
  // This shows that we can create custom functions for analysing the data which is stored in an environmental variable, "experimentData".
  function averageOfLastNResponses(experimentData, item, numPast) {
     var total = 0;
     var count = numPast;
     if (count > experimentData.length) {
       count = experimentData.length;
     }
     for (var i = 0; i < count; i++) {
        for (var j =0 ; j < experimentData[i].responses.length; j++) {
          if (experimentData[i].responses[j]["inputName"] === item) {
            total = total + parseInt(experimentData[i].responses[j]["answer"]);
            break;
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
        return "You've really been keeping up a great pattern!";
      } else if (averageResponse < 2) {
        return "This hasn't taken off yet. No where to go but up!";
      } else {
        return "Keep Going! You're doing great.";
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
      var averageResponse = averageOfLastNResponses(experimentData, "alertness", 3);
      var intervention = computeFeedback(averageResponse);

      display.add(intervention);
      display.add("Average of last 3 responses: " + averageAnswer);
    }
  };
  main();

</script>