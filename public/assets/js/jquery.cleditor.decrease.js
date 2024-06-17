(function($) {

  // Define the decrease button
  $.cleditor.buttons.decrease = {
      name: "decrease",
      image: "decrease.gif",
      title: "Decrease Font",
      command: "fontsize",
      buttonClass:"cleditorButton"
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("unlink", "decrease unlink");
})(jQuery);