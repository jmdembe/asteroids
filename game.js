(function gameSetup() {
    'use strict';

    var shipElem = document.getElementById('ship');

    // Create your "ship" object and any other variables you might need...
    var ship = {
        htmlElem: shipElem,
        velocity: 0,
        angle: 0
    };

    ship.htmlElem.style.top='400px';
    ship.htmlElem.style.left='50px';

    var allAsteroids = [];
    var asteroidCheck;

    shipElem.addEventListener('asteroidDetected', function (event) {
        // You can detect when a new asteroid appears with this event.
        // The new asteroid's HTML element will be in:  event.detail

        // What might you need/want to do in here?
        var asteroidDetected = 'false';
        var newAsteroid=event.detail;
        allAsteroids.push(newAsteroid);
        console.log(allAsteroids);

    });

    /**
     * Use this function to handle when a key is pressed. Which key? Use the
     * event.keyCode property to know:
     *
     * 37 = left
     * 38 = up
     * 39 = right
     * 40 = down
     *
     * @param  {Event} event   The "keyup" event object with a bunch of data in it
     * @return {void}          In other words, no need to return anything
     */
    function handleKeys(event) {
        console.log(event.keyCode);
        if(event.keyCode === 37){
            ship.angle -= 5;
            ship.htmlElem.style.transform = 'rotate('+ ship.angle + 'deg)';
            console.log('rotate('+ ship.angle + '5deg)')
            console.log()
          }
        else if (event.keyCode === 38) {
          ship.velocity += 1;
          // console.log(shipMove.left, 'shipMoveleft');
          // console.log('shipmove', shipMove);
          // console.log(shipMove.top, 'shipMovetop')
          }
        else if(event.keyCode === 39){
            ship.angle += 5;
            ship.htmlElem.style.transform = 'rotate('+ ship.angle + 'deg)';
            console.log('rotate('+ ship.angle + 'deg)')
          }
        else if(event.keyCode === 40) {
          ship.velocity -=1;

          if (ship.velocity <= 0) {
            ship.velocity = 0;
          }
        }
    }
    document.querySelector('body').addEventListener('keyup', handleKeys);

    /**
     * This is the primary "game loop"... in traditional game development, things
     * happen in a loop like this. This function will execute every 20 milliseconds
     * in order to do various things. For example, this is when all game entities
     * (ships, etc) should be moved, and also when things like hit detection happen.
     *
     * @return {void}
     */
    function gameLoop() {
        // This function for getting ship movement is given to you (at the bottom).
        // NOTE: you will need to change these arguments to match your ship object!
        // What does this function return? What will be in the `move` variable?
        // Read the documentation!
        var move = getShipMovement(ship.velocity, ship.angle);  // { top: 2, left:5 }
        var top = parseInt(ship.htmlElem.style.top);  // 20
        top -= move.top;  // 22
        ship.htmlElem.style.top = top + 'px'; // "22px"

        var left = parseInt(ship.htmlElem.style.left);
        left+= move.left;
        ship.htmlElem.style.left=left+'px';
        // Move the ship here!


        // Time to check for any collisions (see below)...
        checkForCollisions();

    }

    /**
     * This function checks for any collisions between asteroids and the ship.
     * If a collision is detected, the crash method should be called with the
     * asteroid that was hit:
     *    crash(someAsteroidElement);
     *
     * You can get the bounding box of an element using:
     *    someElement.getBoundingClientRect();
     *
     * A bounding box is an object with top, left, width, and height properties
     * that you can use to detect whether one box is on top of another.
     *
     * @return void
     */
    function checkForCollisions() {

        var shipCoordinates = ship.htmlElem.getBoundingClientRect();
        console.log(shipCoordinates)

        console.log(asteroidCheck);
        for (var i=0; i < allAsteroids.legnth; i++) {
            asteroidCheck=allAsteroids[i].getBoundingClientRect();
            console.log(asteroidCheck);
        }

      }
    /**
     * This event handler will execute when a crash occurs
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function () {
        console.log('A crash occurred!');

        // What might you need/want to do in here?

    });



    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

     var loopHandle = setInterval(gameLoop, 20);

     /**
      * Executes the code required when a crash has occurred. You should call
      * this function when a collision has been detected with the asteroid that
      * was hit as the only argument.
      *
      * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
      * @return {void}
      */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', { detail: asteroidHit });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
