angular.module('transxelaWebApp')
  .controller('PrincipalCtrl', function ($scope) {
  var baseURL="http://lorempixel.com/900/300";
  $scope.setInterval=5000;

  $scope.slides=[
    {
      title:"Bienvenido",
      image:baseURL+'/nature',
      text:"Bienvenido al modulo de cultura de transxela"
    }
  ];


var baseURL='http://lorempixel.com/200/200'

  $scope.contenido=[
    {
      img:baseURL+'/people',
      title:"Actividades Culturales",
      about:"Cree actividades para que toda la ciudad se entere que esta ocurriendo en el area cultural"
    },
    {
      img:baseURL+'/nature',
      title:"Consejo del dia",
      about:"Haga conocer a los usuarios de tranxela sobre sus derechos y obligaciones"
    },
    {
      img:baseURL+'/sport',
      title:"FAQ",
      about:"Cree preguntas que serviran a la poblacion"
    }
  ];


  });
