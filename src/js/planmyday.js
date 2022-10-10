// Gallery
lightGallery(document.getElementById('lightGallery'), {
    thumbnail: true,
    mobileSettings:  {
        controls: true,
        showCloseIcon: true,
        download: true
    }
});

// AOS
AOS.init();


// Music
var music = $("#musicPlayer")[0],
    selectorMusic = $("#control-music");

selectorMusic.click(function(){
    if (music.paused == false) {
        music.pause();
        $(this).addClass("paused");
    } else {
        music.play();
        $(this).removeClass("paused");
    }
});
  


// Tamu
var urlParams = new URLSearchParams(window.location.search),
    tamu = urlParams.get('tamu');

$('#greeting .form-group #name').val(tamu);
$('.popup-opening .tamu-name').text(tamu);
// Open popup
$('#opening .guest').click(function(){
    $("#opening").hide();
    $("body").removeClass("fixed-body");
    music.play();
});

// ============================== COUNTER ============================= //
var countDownDate = new Date("Oct 18, 2022 09:00:00").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var tagDays = $("#countdown #days .time"),
        tagHours = $("#countdown #hours .time"),
        tagMinutes = $("#countdown #minutes .time"),
        tagseconds = $("#countdown #seconds .time"),
        tagAll = $("#countdown .time");
    
    // Output
    tagDays.text(days);
    tagHours.text(hours);
    tagMinutes.text(minutes);
    tagseconds.text(seconds);

    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    tagAll.text("0");
  }
}, 1000);


function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
}

function success(e) {
    $(e).addClass("copied");

    setTimeout(function() { 
        $(e).removeClass("copied");
    }, 2000);
}
// Greeting
const rdb = firebase.database();

let nama = document.getElementById("name"),
    prayersBox = document.getElementById("prayersbox"),
    date = document.getElementById("date"),
    contentPrayers = document.getElementById("contentprayers"),
    checkAttending = document.getElementById("attending");

// Send
function sendPrayers(){
    let data = {
        "Nama": nama.value,
        "Tanggal": new Date().toLocaleString(),
        "Ucapan": prayersBox.value,
        "Kehadiran": checkAttending.value
    }

    rdb.ref("ucapanData").push().set(data);

    nama.value = '',
    prayersBox.value = '';
}

// Read
rdb.ref("ucapanData").on("value", getData);

function getData(prayer) {
    let card = '';

    prayer.forEach(data => {

        card += `
            <li>
                <h2>${data.val().Nama}</h2>
                <p class="greetcheck ${data.val().Kehadiran}">${data.val().Kehadiran}</p>
                <p class="greettext">${data.val().Ucapan}</p>
            </li>
        `;
    });

    contentPrayers.innerHTML = card;
}