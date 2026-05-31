
// GET CATEGORY
const params = new URLSearchParams(location.search);
const cat = params.get("cat");

// TITLE
const titles = {
  action: "اکشن",
  comedy: "کمدی",
  fantasy: "فانتزی",
  animation: "انیمیشن",
  horror: "ترسناک",
  drama: "درام"
};

document.getElementById("pageTitle").innerText =
  titles[cat] ? "دسته‌بندی: " + titles[cat] : "فیلم‌ها";

// RENDER
const grid = document.getElementById("moviesGrid");

const list = DATA.movies.filter(m => m.category === cat);

if(list.length === 0){
  grid.innerHTML = "<p>موردی یافت نشد</p>";
}

list.forEach(m=>{
  const div = document.createElement("div");
  div.className = "movie";
  div.style.backgroundImage = `url(${m.poster})`;
  div.innerHTML = `<span>${m.title}</span>`;
  div.onclick = ()=>location.href = "play.html?id=" + m.id;
  grid.appendChild(div);
});