let playbtn = document.getElementById("playbtn");
let pausebtn = document.getElementById("pausebtn");
let progressbar = document.getElementById("progressbar");
let gifs = document.getElementById("gif");
let songs = document.getElementsByClassName("songs");
let sname=document.getElementById("sname");
let effect=document.querySelectorAll(".effect");
let audio = new Audio(); // Initialize audio
let currentSongIndex = -1; // Track the current song index
let lbtn=document.getElementById("back");
let rbtn=document.getElementById("front");
let music = [
    { songpath: "spotify_songs/aayuda_puja.mp3", songname: "Aayuda puja, DEVARA", coverpath: "spotify_posters/devara_poster.jpg",},
    { songpath: "spotify_songs/All_Hail_The_Tiger.mp3", songname: "ALL HAIL THE TIGER, DEVARA", coverpath: "spotify_posters/devara_poster.jpg" },
    { songpath: "spotify_songs/Chuttamalle.mp3", songname: "CHUTTAMALLE, DEVARA", coverpath: "spotify_posters/devara_poster.jpg" },
    { songpath: "spotify_songs/daavudi.mp3", songname: "DAAVUDI, DEVARA", coverpath: "spotify_posters/devara_poster.jpg" },
    { songpath: "spotify_songs/Fear_Song.mp3", songname: "Fear Song, DEVARA", coverpath: "spotify_posters/devara_poster.jpg" },
    { songpath: "spotify_songs/red_sea.mp3", songname: "Red Sea, DEVARA", coverpath: "spotify_posters/devara_poster.jpg" },
    { songpath: "spotify_songs/Ammayi.mp3", songname: "Ammayi, Animal", coverpath: "spotify_posters/Animal_poster.jpg" },
    { songpath: "spotify_songs/Arjan_Vailly.mp3", songname: "Arjan Vailly, Animal", coverpath: "spotify_posters/Animal_poster.jpg" },
    { songpath: "spotify_songs/Evarevaro.mp3", songname: "Evarevaro, Animal", coverpath: "spotify_posters/Animal_poster.jpg" },
    { songpath: "spotify_songs/yaalo yaalo.mp3", songname: "Yaalo Yaalo, Animal", coverpath: "spotify_posters/Animal_poster.jpg" }
];
lbtn.addEventListener("click",()=>{
    if(currentSongIndex>0){
        currentSongIndex-=1;
    }else{
        currentSongIndex=music.length-1;
    }
    audio.src=music[currentSongIndex].songpath;
    sname.innerText=`${music[currentSongIndex].songname}`;
    effect.forEach((image)=>{
        image.style.backgroundImage=`url(${music[currentSongIndex].coverpath})`;
    })
    updateUI(true);
    audio.play();
})
rbtn.addEventListener("click",()=>{
    if(currentSongIndex<music.length-1){
        currentSongIndex+=1;
    }else{
        currentSongIndex=0;
    }
    audio.src=music[currentSongIndex].songpath;
    sname.innerText=`${music[currentSongIndex].songname}`;
    effect.forEach((image)=>{
        image.style.backgroundImage=`url(${music[currentSongIndex].coverpath})`;
    })
    updateUI(true);
    audio.play();
})
// Add click event listener for each song
Array.from(songs).forEach((song, index) => {
    song.addEventListener("click", () => {
        if (currentSongIndex !== index) {
            audio.src = music[index].songpath;
            currentSongIndex = index;
            sname.innerText=`${music[index].songname}`;
            effect.forEach((image)=>{
                image.style.backgroundImage=`url(${music[index].coverpath})`;
            })
            song.classList.add("far fa-1.3x fa-pause-circle")
            audio.play();
            updateUI(true);
        } else {
            audio.paused ? audio.play() : audio.pause();
            updateUI(!audio.paused);
        }
    });
});

// Handle audio progress updates
audio.addEventListener("timeupdate", () => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressbar.value = progress;
});

// Update audio time on progressbar change
progressbar.addEventListener("change", () => {
    audio.currentTime = (progressbar.value * audio.duration) / 100;
});

// Play button event listener
playbtn.addEventListener("click", () => {
    audio.play();
    updateUI(true);
});

// Pause button event listener
pausebtn.addEventListener("click", () => {
    audio.pause();
    updateUI(false);
});

// Update UI elements based on play/pause state
function updateUI(isPlaying) {
    playbtn.style.display = isPlaying ? "none" : "inline-block";
    pausebtn.style.display = isPlaying ? "inline-block" : "none";
    gifs.style.display = isPlaying ? "inline-block" : "none";
}
