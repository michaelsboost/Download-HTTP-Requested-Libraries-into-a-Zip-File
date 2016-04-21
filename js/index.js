var download_to_textbox = function (url, el) {
  return $.get(url, null, function (data) {
    el.val(data);
  }, "text");
};

// Setup Grid
$("#mainSplitter").jqxSplitter({
  theme: "metro"
}).jqxSplitter({
  height: "100%",
  width: "100%",
  orientation: "horizontal",
  showSplitBar: true,
  panels: [{ size: '50%' },
           { size: '100%',collapsible:false }]
});

// Paste library urls to get their source code
$(".libraries").on("keyup", function() {
  $(".assets").empty();
  var lines = $(".libraries").val().split("\n");
  for (i = 0; i <= lines.length - 1; i += 1) {
    $(".assets").append('<div><input class="fn" value="'+ lines[i] +'"/></div><textarea class="block">'+ lines[i] +'</textarea>');
  }
  

  // Remove URL String and leave file name
  $(".assets input").each(function(index, value) {
   	var str = $(this).val();
  	str = str.split("/").pop();
    $(this).val(str);
  });
  // Add library source to textarea
  $(".assets textarea").each(function(index, value) {
     download_to_textbox($(this).val(), $(this));
  });
}).trigger("keyup");

// Download libraries in a zip file
$("[data-action=download]").click(function() {
  var zip = new JSZip();
  $(".assets input").each(function(value) {
    zip.file("sources/"+ $(this).val() +"", ""+ $(this).parent().next().filter('textarea').val() +"");
  });
  var content = zip.generate({type:"blob"});
  saveAs(content, "libraries.zip");
});