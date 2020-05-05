"use strict"

// hide mainPage
let main = document.getElementById("mainPage");
main.style.display = "none";
document.getElementById("dashboard").style.display = "block";

// vueApp
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Kamvan!',
      tasks: [
          {title: 'Deploy', Description: 'Maecenas mattis felis ut elit ultrices mattis at sit amet neque.', Category: 'Todo'},
          {title: 'Vue SPA', Description: 'Nulla laoreet dapibus nibh quis tempor.', Category: 'Todo'},
          {title: 'Vue CRUD', Description: 'Sed elit eros, tempus sit amet convallis nec, fringilla nec metus.', Category: 'Todo'},
          {title: 'OAuth', Description: 'Aenean fringilla tristique risus fringilla maximus.', Category: 'Backlog'},
          {title: 'CSS', Description: 'Sed varius in augue et iaculis.', Category: 'Done'},
          {title: 'HMTL', Description: 'Donec varius diam felis, id pharetra lorem tempus id.', Category: 'Completed'}
      ]
    }
});