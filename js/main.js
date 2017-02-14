(function () {
  'use strict';

  function storageSupported() {
    if (typeof (Storage) !== "undefined") {
      return true;
    } else {
      return false;
    }
  }

  function getCodeFromStorage() {
    if (storageSupported() && localStorage.code) {
      return localStorage.code;
    } else {
      return null;
    }
  }

  function storeCode(code) {
    if (storageSupported()) {
      localStorage.code = code;
    }
  }

  function emptyStorage() {
    if (storageSupported()) {
      localStorage.removeItem('code');
    }
  }

  function handleError(message) {
    noty({
      layout: 'topCenter',
      type: 'error',
      text: message,
      timeout: 3000,
      theme: 'metroui'
    });
  };

  function handleSuccess(message) {
    noty({
      layout: 'topCenter',
      type: 'success',
      text: message,
      timeout: 3000,
      theme: 'metroui'
    });
  }

  function showDialog(message, moves) {
    var usedMoves = 0;
    if (typeof (moves) !== 'undefined') {
      usedMoves = moves;
    }

    vex.dialog.open({
      className: 'vex-theme-wireframe',
      message: message,
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
        if (data) {
          $.ajax({
            url: 'https://api.backand.com/1/objects/replies',
            type: 'POST',
            data: JSON.stringify({
              name: data.name,
              email: data.email,
              additionalinfo: data.details,
              moves: '' + usedMoves,
              code: $('#code-editor').codeMirror('value')
            }),
            headers: {
              AnonymousToken: '95910362-1862-4c04-9794-ddba2cf25670'
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
              handleSuccess('Data saved successfully.');
            },
          }).fail(function (msg) {
            handleError('Something went wrong, check all the fields and try again.');
          });
        }
      }
    })
  }

  $(document).ready(function () {

    $('#code-editor').codeMirror({
      mode: 'text/javascript',
      lineWrapping: true
    });

    $('#code-editor').change(function () {
      storeCode($('#code-editor').codeMirror('value'));
    });

    if (storageSupported) {
      var code = getCodeFromStorage();
      if (code) {
        $('#code-editor').codeMirror('value', code);
      }
    } else {
      handleError('WARNING: LocalStorage not supported, code will reset on page refresh.');
    }

    $('#game').metaGame({
      onFail: function (error) {
        if (error) {
          handleError('line: ' + error.lineNumber + ' ' + error.message);
        } else {
          handleError('You have failed');
        }
      },
      onComplete: function (moves) {
        showDialog('You win! You have completed the maze in ' + moves + ' moves. Enter your information below:', moves);
      },
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]
    });

    $('#resetcode').click(function () {
      vex.dialog.confirm({
        message: 'Do you really want to reset code to the default value?',
        className: 'vex-theme-wireframe',
        buttons: [
          $.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' }),
          $.extend({}, vex.dialog.buttons.YES, { text: 'Reset' })
        ],
        callback: function (reset) {
          if (reset) {
            emptyStorage();
            location.reload(true);
          }
        }
      })
    });
    $('#giveup').click(function () {
      showDialog("Hey! Don't give up now... Well if you must you can leave your information below:");
    });
    $('#stop').click(function () {
      $('#game').metaGame('stop');
    });
    $('#start').click(function () {
      $('#game').metaGame('stop');
      try {
        var updateFunction = eval('(function(){' + $('#code-editor').codeMirror('value') + '; return update;})();');
        if (!typeof (updateFunction) == 'function') {
          handleError('Code has to provide function named "update"');
        } else {
          $('#game').metaGame('begin', updateFunction);
        }
      } catch (error) {
        handleError('line: ' + error.lineNumber + ' ' + error.message);
      }
    });

  });

})();