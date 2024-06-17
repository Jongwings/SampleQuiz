(function($) {

  // Define the line button
  $.cleditor.buttons.line = {
      name: "line",
      image: "line.gif",
      title: "Line Space",
      values:"1.0,1.15,1.5,2.0,2.5,3.0",        // sizes in the Line Space popup
      popupName: "line",
      buttonClass:"cleditorButton",
      popupClass: "cleditorList"
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("image", "line image");

/*  // Handle the line button click event
  function lineClick(e, data) {
console.log("asdasdas");
      // Wire up the submit button click event
      $(data.popup).children(":button")
      .unbind("click")
      .bind("click", function(e) {

          // Get the editor
          var editor = data.editor;

          // Get the entered name
          var name = $(data.popup).find(":text").val();

          // Insert some html into the document
          var html = "line " + name;
          editor.execCommand(data.command, html, null, data.button);

          // Hide the popup and set focus back to the editor
          editor.hidePopups();
          editor.focus();

      });

  }*/

})(jQuery);