(function($) {

  // Define the increase button
  $.cleditor.buttons.defaultstyle1 = {
      name: "defaultstyle1",
      image: "sy3.gif",
      title: "Custom Style",
      command: "",
      buttonClass:"cleditorButton"
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("print", "defaultstyle1 print");
})(jQuery);