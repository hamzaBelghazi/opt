if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
  CKEDITOR.tools.enableHtml5Elements(document);

CKEDITOR.config.height = 400;
CKEDITOR.config.width = 'auto';

let initSample = (function () {
  let wysiwygareaAvailable = isWysiwygareaAvailable(),
    isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

  return function () {
    let editorElement = CKEDITOR.document.getById('text_editor');

    // :(((
    if (isBBCodeBuiltIn) {
      editorElement.setHtml(
        'Hello world!\n\n' +
          "I'm an instance of [url=https://ckeditor.com]CKEditor[/url]."
      );
    }

    if (wysiwygareaAvailable) {
      CKEDITOR.replace('text_editor');
    } else {
      editorElement.setAttribute('contenteditable', 'true');
      CKEDITOR.inline('text_editor');
    }
  };

  function isWysiwygareaAvailable() {
    if (CKEDITOR.revision == '%RE' + 'V%') {
      return true;
    }

    return !!CKEDITOR.plugins.get('wysiwygarea');
  }
})();
