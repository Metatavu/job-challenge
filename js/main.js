(function () {
  'use strict';



  $(document).ready(function () {
    $('#game').metaGame({
      onFail: function () {
        console.log('You have failed');
      },
      onComplete: function () {
        console.log('You have succeeded');
      },
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]
    });

    $('#stop').click(function () {
      $('#game').metaGame('stop');
    });
    $('#start').click(function () {
      $('#game').metaGame('begin', function (map, player) {
        player.moveDown();
        /*player.moveDown();
        player.moveRight();
        player.moveDown();
        player.moveDown();
        player.moveRight();
        player.moveDown();
        player.moveDown();
        player.moveDown();
        player.moveRight();
        player.moveRight();
        player.moveRight();
        player.moveRight();
        player.moveRight();
        player.moveRight();
        player.moveDown();
        player.moveDown(); */
      });
    });

  });

})();