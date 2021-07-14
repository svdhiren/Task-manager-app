console.log("The javascript file has been loaded.");

//Here we are going to learn about fetching the json from the url into the client-side javascript.
//We will be using a fetch function which accepts the url from where the json fetched. After this,
//'then' method is used to call a callback function.
//Callback function will just have one parameter; 'response.'
//After this we parse this and the data can be used later on.
fetch('http://puzzle.mead.io/puzzle').then((response) => {
      response.json().then((data) => {
        console.log(data);
      })
})

//Let us do the same thing with the our url.



const weather_info = document.querySelector('form')
const search = document.querySelector('input')

weather_info.addEventListener('submit', (e) => {
  e.preventDefault() // This command prevents the browser from refreshing.

  //search.value contains the text typed in the box.
  var location = search.value

  //We want the above fetch function to be here, ie., it has to executed only after
  //clicking the submit button.
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error)
      {
        document.getElementById('one').innerHTML = data.error;
        document.getElementById('two').innerHTML = "";
      }
      else{
        var one = document.getElementById('one');
        var two = document.getElementById('two');

        one.innerHTML = data.address.toUpperCase();
        two.innerHTML = data.text;
      }
    })
  })

})
