// Dynamically render the style background color property of the score div based on the inner html score

// div class stars?

// This doesn't work yet btw..............
var scores = $('.circle h3')

var setColor = function() {
  for (i = 0 ; i < scores.length; i++) {
    particularScoreDiv = scores[i]
    innerScore = $(particularScoreDiv).html()
    
    switch (true) {
      case (innerScore >= 80 && innerScore <= 100):
        $('.circle').css({'background-color': '#3BB878'})  // GREEN
        break;
      case (innerScore >= 70 && innerScore < 80):
        $('.circle').css({'background-color': '#7CC576'})
        break;
      case (innerScore >= 60 && innerScore < 70):
        $('.circle').css({'background-color': '#ACD372'})
        break;
      case (innerScore >= 50 && innerScore < 60):
        $('.circle').css({'background-color': '#FFF467'})
        break;
      case (innerScore >= 40 && innerScore < 50):
        $('.circle').css({'background-color': '#FBAF5C'})
        break;
      case (innerScore >= 30 && innerScore < 40):
        $('.circle').css({'background-color': '#F68E55'})
        break;
      case (innerScore >= 0 && innerScore <= 30):
        $('.circle').css({'background-color': '#F26C4F'}) // RED
        break;
    }   
  }
}

// Index needs to be modified for this to work ^^
<div class="circle">
  <div class="stars"></div>
    <h3><%=Math.round(average_score*20)%></h3>
    <small> % </small>
  <div id="rate1"></div>
</div>
