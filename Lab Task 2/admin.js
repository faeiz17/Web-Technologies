$(document).ready(function() {
    showdata();
    $('#showdatabtn').click(function(event) {
        event.preventDefault(); // Prevent form submission
        showdata();
       
    });
});

function showdata(){
    $.ajax({
        type: "GET",
        url: "https://usmanlive.com/wp-json/api/stories",
        dataType: "json",
        success: function(data) {
            console.log(data);
            var showdata = $('#showdata');
            showdata.empty(); // Clear existing content

            for (var i = 0; i < data.length; i++) {
                var story = data[i];
                var htmlString = `
                    <div>
                        <h3>${story.title}</h3>
                        <div>${story.content}</div>
                        <button id="delbtn">Delete</button>
                        <button id="editbtn">Edit</button>
                    </div>
                `;
                showdata.append(htmlString);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}
