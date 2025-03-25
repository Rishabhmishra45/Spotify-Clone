// Mobile menu toggle
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
document.body.appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});


// DOM Elements
const playButtons = document.querySelectorAll('.play-btn');
const prevBtn = document.querySelector('.fa-chevron-left').parentElement;
const nextBtn = document.querySelector('.fa-chevron-right').parentElement;
const loginBtn = document.querySelector('.login');
const signUpBtn = document.querySelector('.sign-up');
const createPlaylistBtn = document.querySelector('.create-playlist button');
const browsePodcastsBtn = document.querySelectorAll('.create-playlist button')[1];
const englishBtn = document.querySelector('.eng-btn button');

// Audio Element
const audioPlayer = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

// Sample songs data
const songs = [
    {
        title: "ANIMAL",
        artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
        cover: "images/item-6.jpg",
        audio: "songs/_Chhad_Dila__Lehmber_Hussainpuri_Full_Video_Song___Chhad_Dila___Latest_Punjabi_Song_2014(256k).mp3"
    },
    {
        title: "Still Rollin",
        artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
        cover: "images/item-7.jpg",
        audio: "songs/Aaj Ki Raat.mp3"
    },
    {
        title: "Husn",
        artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
        cover: "images/item-8.jpg",
        audio: "songs/husn.mp3"
    },
    {
        title: "Moosetape",
        artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
        cover: "images/item-9.jpg",
        audio: "songs/moosetape.mp3"
    },
    {
        title: "Satranga(From...)",
        artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
        cover: "images/item-10.jpg",
        audio: "songs/satranga.mp3"
    },
    {
        title: "2 Khatole",
        artist: "Masoom Sharma, Manjeet Mor, Chahal...",
        cover: "images/item-6.jpg",
        audio: "songs/khatole.mp3"
    },
    {
        title: "Premalo (From 'Court')",
        artist: "Vijai Bulganin, Anurag Kulkarni, Sameera...",
        cover: "images/item-7.jpg",
        audio: "songs/premalo.mp3"
    },
    {
        title: "Raanjhan (From 'Do Patti')",
        artist: "Sachet-Parampara, Parampara, Parampara Tandon,...",
        cover: "images/item-8.jpg",
        audio: "songs/raanjhan.mp3"
    },
    {
        title: "Finding Her",
        artist: "Kushagra, Bharath, Saaheal",
        cover: "images/item-9.jpg",
        audio: "songs/finding-her.mp3"
    },
    {
        title: "Jhol",
        artist: "Maanu, Annural Khalid",
        cover: "images/item-10.jpg",
        audio: "songs/jhol.mp3"
    }
];

// Initialize the player
function initPlayer() {
    // Set the first song
    loadSong(currentSongIndex);

    // Event listeners for buttons
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // If the same song is clicked and it's playing, pause it
            if (currentSongIndex === index && isPlaying) {
                pauseSong();
            }
            // If the same song is clicked and it's paused, play it
            else if (currentSongIndex === index && !isPlaying) {
                playSong();
            }
            // If a different song is clicked
            else {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            }
        });
    });

    // Previous and next buttons
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    // Login/signup buttons
    loginBtn.addEventListener('click', () => {
        alert('Login functionality will be implemented here');
    });

    signUpBtn.addEventListener('click', () => {
        alert('Sign up functionality will be implemented here');
    });

    // Other buttons
    createPlaylistBtn.addEventListener('click', () => {
        alert('Create playlist functionality will be implemented here');
    });

    browsePodcastsBtn.addEventListener('click', () => {
        alert('Browse podcasts functionality will be implemented here');
    });

    englishBtn.addEventListener('click', () => {
        alert('Language selection functionality will be implemented here');
    });

    // When song ends, play next one
    audioPlayer.addEventListener('ended', nextSong);
}

// Load a song
function loadSong(index) {
    const song = songs[index];

    // Update the audio source
    audioPlayer.src = song.audio;

    // Update the UI to show which song is playing
    updateActiveCard(index);
}

// Play the current song
function playSong() {
    audioPlayer.play();
    isPlaying = true;

    // Update play button to show pause icon
    const currentPlayButton = playButtons[currentSongIndex].querySelector('i');
    currentPlayButton.classList.remove('fa-play');
    currentPlayButton.classList.add('fa-pause');
}

// Pause the current song
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;

    // Update play button to show play icon
    const currentPlayButton = playButtons[currentSongIndex].querySelector('i');
    currentPlayButton.classList.remove('fa-pause');
    currentPlayButton.classList.add('fa-play');
}

// Play previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

// Play next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

// Update the active card in the UI
function updateActiveCard(index) {
    // Remove active class from all cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to current card
    document.querySelectorAll('.card')[index].classList.add('active');

    // Update all play buttons
    playButtons.forEach((button, i) => {
        const icon = button.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    });

    // If song is playing, update current play button
    if (isPlaying) {
        const currentPlayButton = playButtons[currentSongIndex].querySelector('i');
        currentPlayButton.classList.remove('fa-play');
        currentPlayButton.classList.add('fa-pause');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    } else if (e.code === 'ArrowRight') {
        nextSong();
    } else if (e.code === 'ArrowLeft') {
        prevSong();
    }
});

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', initPlayer);