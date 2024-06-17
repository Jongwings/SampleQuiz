(function($) {

  // Define the increase button
  $.cleditor.buttons.increase = {
      name: "increase",
      image: "increase.gif",
      title: "Increase Font",
      command: "fontsize",
      buttonClass:"cleditorButton"
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("link", "increase link");
})(jQuery);