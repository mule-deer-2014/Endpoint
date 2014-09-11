// Dynamically render the style background color property of the score div based on the inner html score

// div class stars?


// color = $('.circle').css({'background-color': '#99cc33'})
var scores = $('.circle h3')
function setColor(scores) {
  for (i = 0 ; i < scores.length; i++) { 
    score = $('.circle h3').html() 
    if (parseInt(score) > 50) {
      console.log(parseInt(score))
      $('.circle').css({'background-color': '#008000'})
    }
    else {
      console.log(parseInt(score))
      $('.circle').css({'background-color': '#FF0000'})
    }
  }
}


<div class="circle">
  <div class="stars"></div>
    <h3><%=Math.round(average_score*20)%></h3>
    <small> % </small>
  <div id="rate1"></div>
</div>
