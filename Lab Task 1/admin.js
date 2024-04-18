$(document).ready(function () {
    $("#submitbtn").click(function (event) {
      event.preventDefault(); // Prevent form submission
      showstories();
    });
  
    // Click event for the delete button
    $(document).on("click", ".deletebtn", function(event){
      event.preventDefault();
      var id = $(this).data("id");
      deletedata(id);
    });
  });
  
  function showstories(){
    $.ajax({
      type: "GET",
      url: "https://usmanlive.com/wp-json/api/stories",
      dataType: "json",
      success: function (data) {
        console.log(data);
        var showdata = $("#showdata");
        showdata.empty(); // Clear existing content
  
        for (var i = 0; i < data.length; i++) {
          var story = data[i];
          var htmlString = `
            <div>
                <h3>${story.title}</h3>
                <div>${story.content}</div>
                <button class="deletebtn" data-id="${story.id}">Delete</button>
                <button class="editbtn">Edit</button>
            </div>
          `;
          showdata.append(htmlString);
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  
  function deletedata(id){
    $.ajax({
      type: "DELETE",
      url:`https://usmanlive.com/wp-json/api/stories/${id}`,
      success:function () {
        console.log("Story deleted successfully");
        showstories();
      },
      error: function (error) {
        console.log("Error deleting story:", error);
      },
    });
  }
  