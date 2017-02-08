(function () {
  'use strict';

  function handleError(message) {
    noty({
      layout: 'topCenter',
      type: 'error',
      text: message,
      timeout: 3000,
      theme: 'metroui'
    });
  };

  $(document).ready(function () {
    $('#code-editor').codeMirror({
      mode: 'text/javascript',
      lineWrapping: true
    });
    $('#game').metaGame({
      onFail: function (error) {
        if (error) {
          handleError('line: ' + error.lineNumber + ' ' + error.message);
        } else {
          handleError('You have failed');
        }
      },
      onComplete: function (moves) {
        vex.dialog.open({
          className: 'vex-theme-wireframe',
          message: 'You win! You have completed the maze in '+moves+' moves. Enter your information below:',
          input: [
            '<input name="name" type="text" placeholder="Name" />',
            '<input name="email" type="email" placeholder="Email" />',
            '<textarea name="details">Additional information like link to your github repository.</textarea>'
          ].join(''),
          buttons: [
            $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' }),
            $.extend({}, vex.dialog.buttons.YES, { text: 'Send' })
          ],
          callback: function (data) {
          }
        })
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
      $('#game').metaGame('stop');
      try {
        var updateFunction = null;
        eval('updateFunction = ' + $('#code-editor').codeMirror('value') + ';');
        $('#game').metaGame('begin', updateFunction);
      } catch (error) {
        handleError('line: ' + error.lineNumber + ' ' + error.message);
      }
    });

  });

})();