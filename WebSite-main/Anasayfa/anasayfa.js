//                                         Dark mode sistemi

const darkBtn = document.getElementById("darkModeBtn");

// Sayfa acildiginda daha onceki tercih uygulanir
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark-mode");
    darkBtn.innerHTML="☀️ Light Mode";
}

// btn ile mod degistir
darkBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
        darkBtn.innerHTML = "☀️ Light Mode";
    }else{
        localStorage.setItem("theme", "light");
        darkBtn.innerHTML = "🌙 Dark Mode"
    }
})

//                                           Tema sec

// deniz tatili
const temaDeniz = document.getElementById("tema-deniz");
temaDeniz.addEventListener("click", ()=>{
    window.location.href = "...Temalar/deniz_tatili.html";
})

// Kultur turu
const temaKultur = document.getElementById("tema-kultur");
temaKultur.addEventListener("click", ()=>{
    window.location.href = "...Temalar/kultur_turu.html";
})

// dag turu
const temaDag = document.getElementById("tema-dag");
temaDag.addEventListener("click", ()=>{
    window.location.href = "...Temalar/dag_turu.html";
})
