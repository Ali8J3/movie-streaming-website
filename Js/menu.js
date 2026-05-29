function toggleMenu(el){
  document.querySelectorAll('.menu-item').forEach(i=>{
    if(i!==el) i.classList.remove('active');
  });
  el.classList.toggle('active');
}

document.addEventListener('click',e=>{
  if(!e.target.closest('.menu')){
    document.querySelectorAll('.menu-item')
      .forEach(i=>i.classList.remove('active'));
  }
});

// OPEN PLAY
function openPlay(id){
  location.href = "play.html?id=" + id;
}

// RENDER MOVIES
const topBox = document.getElementById("moviesGrid");

DATA.movies.forEach(m=>{
  const div = document.createElement("div");
  div.className = "movie";
  div.style.backgroundImage = `url(Media/${m.poster})`;
  div.innerHTML = `<span>${m.title}</span>`;
  div.onclick = () => location.href = "play.html?id=" + m.id;;

  topBox.appendChild(div);
});
const newBox = document.getElementById("newMovies");

NEW_MOVIES.movies.forEach(m=>{
  const div = document.createElement("div");
  div.className = "movie new-movie";  // کلاس اضافی برای استایل
  div.style.backgroundImage = `url(Media/${m.poster})`;
  div.innerHTML = `<span>${m.title}</span>`;
  div.onclick = () => location.href = "play.html?id=" + m.id;

  newBox.appendChild(div);
});

// SEARCH
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

document.getElementById("searchIcon").onclick = ()=>{
  searchBox.style.display="block";
  searchInput.focus();
};

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") searchBox.style.display="none";
});

searchInput.addEventListener("input",()=>{
  const v = searchInput.value.toLowerCase();
  searchResults.innerHTML="";
  DATA.movies
    .filter(m=>m.title.toLowerCase().includes(v))
    .forEach(m=>{
      const d=document.createElement("div");
      d.className="search-item";
      d.innerText=m.title;
      d.onclick=()=>openPlay(m.id);
      searchResults.appendChild(d);
    });
});