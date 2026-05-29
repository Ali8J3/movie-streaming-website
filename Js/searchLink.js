  document.getElementById("playBtn").onclick = () => {
    window.open(movie.playUrl, "_blank");
  };

// GET ID
const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));

// جستجو در هر دو آرایه
const movie = DATA.movies.find(m => m.id === id) || NEW_MOVIES.movies.find(m => m.id === id);

if(!movie){
  document.getElementById("notFound").style.display = "block";
}else{
  // SHOW INFO
  document.getElementById("infoBox").style.display = "flex";

  document.getElementById("title").innerText = movie.title;
  document.getElementById("desc").innerText = movie.desc || "";

  document.getElementById("meta").innerText =
    "🎬 ژانر: " + (movie.genre || "-") +
    " | 📅 سال: " + (movie.year || "-") +
    " | ⭐ امتیاز: " + (movie.rate || "-");

  document.getElementById("posterBox").style.backgroundImage =
    `url(media/${movie.poster})`;

  // VIDEO (فعلاً نمونه)
  const video = document.getElementById("videoPlayer");
  video.poster = `media/${movie.poster}`;

  // اگر بعداً لینک ویدیو داشتی:
  video.querySelector("source").src = movie.video;
video.load();
}