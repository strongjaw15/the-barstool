videoUrl = localStorage.getItem("videoUrl")
console.log(videoUrl)
$("iframe").attr("src", `${videoUrl}`)

const player = new Plyr('#player');

window.player = player;
