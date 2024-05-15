$(document).ready(function() {
    function closeNav() {
        $('#side-menu').fadeOut(500)
        $('section').css('filter', 'blur(0px)');

    }

    function openNav() {
        $('#side-menu').show();
        $('section').css('filter', 'blur(5px)');
    }
    $('#close').click(function(e) {
        e.preventDefault();
        closeNav();

    });

    // $("video").hover(
    //   function() {
    //     this.play();
    //   }, 
    //   function() {
    //     this.pause();
    //     this.currentTime = 0;
    //   }
    // );

    $('#user').click(function(e) {
        e.preventDefault();
        openNav();

    });

});



document.getElementById("loginButton").onclick = function() {
    window.location.href = "login.html";

}

function videofullerscreen(getElementById) {
    let videofullscreen = document.getElementById(getElementById);

    videofullscreen.requestFullscreen();
    document.addEventListener("fullscreenchange", function() {
        if (document.fullscreenElement === videofullscreen) {

            videofullscreen.style.objectFit = "contain";
        } else {

            videofullscreen.style.objectFit = "cover";
        }
    });
}

function toggleAudio(elementID, volumeIconID) {
    videovoice = document.getElementById(elementID);
    videovoice.muted = !videovoice.muted;

    var volumeIcon = document.getElementById(volumeIconID);

    if (volumeIcon.classList.contains("fa-volume-up")) {
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-off");
    } else {
        volumeIcon.classList.remove("fa-volume-off");
        volumeIcon.classList.add("fa-volume-up");
    }
    var allVideos = document.getElementsByTagName("video");
    for (var i = 0; i < allVideos.length; i++) {
        if (allVideos[i] !== videovoice) {
            allVideos[i].muted = true;
        }
    }
    let allvoiceicons = document.getElementsByClassName("fa-volume-up");
    console.log(allvoiceicons);
    for (var j = 0; j < allvoiceicons.length; j++) {
        if (allvoiceicons[j] !== volumeIcon) {
            allvoiceicons[j].classList.add("fa-volume-off");
            allvoiceicons[j].classList.remove("fa-volume-up");

        }
    }

}

var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 1500);
}

// // Define the video element and section element
// const section = document.querySelector('section.vid');
// const vid = document.querySelector('video.vid-scrub');

// // Pause the video initially
// vid.pause();

// // Define variables to track the previous scroll position
// let prevScrollPos = window.scrollY;

// // Define the scroll function
// const scroll = () => {
//     const currentScrollPos = window.scrollY;
//     const distance = currentScrollPos - section.offsetTop;
//     const total = section.clientHeight - window.innerHeight;
//     let percentage = distance / total;
//     percentage = Math.max(0, percentage);
//     percentage = Math.min(percentage, 1);

//     // Calculate the scrolling direction
//     const scrollDirection = currentScrollPos > prevScrollPos ? 'up' : 'down';

//     if (vid.duration > 0) {
//         // If scrolling down, play the video forward
//         // If scrolling up, play the video in reverse
//         if (scrollDirection === 'up') {
//             vid.currentTime = vid.duration * percentage;
//             if (vid.currentTime >= vid.duration) {
//                 video.pause()
//             } else { vid.play(); }


//         } else {
//             vid.currentTime = vid.duration * (1 - percentage);
//             vid.playbackRate = -1; // Set playback rate to reverse
//             if (vid.currentTime >= vid.duration) {
//                 video.pause()
//             } else { vid.play(); }

//         }
//     }


//     // Update the previous scroll position
//     prevScrollPos = currentScrollPos;
// };

// // Add scroll event listener
// window.addEventListener('scroll', scroll);