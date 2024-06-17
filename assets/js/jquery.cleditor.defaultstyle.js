(function($) {

  // Define the increase button
  $.cleditor.buttons.defaultstyle = {
      name: "defaultstyle",
      image: "sy1.gif",
      title: "Default Style",
      command: "",
      buttonClass:"cleditorButton"
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("print", "defaultstyle print");
})(jQuery);