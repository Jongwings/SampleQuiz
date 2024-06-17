(function($) {

  // Define the increase button
  $.cleditor.buttons.defaultstyle2 = {
      name: "defaultstyle2",
      image: "sy2.gif",
      title: "Apply Gray",
      command: "",
      buttonClass:"cleditorButton"
  };

  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("source", "defaultstyle2 source");
})(jQuery);