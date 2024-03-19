$(document).ready(function() {
    $('#submitbtn').click(function(event) {
        event.preventDefault(); // Prevent form submission

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
                        </div>
                    `;
                    showdata.append(htmlString);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});
