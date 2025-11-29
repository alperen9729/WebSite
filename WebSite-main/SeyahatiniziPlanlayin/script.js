//const seyahat_planlayici = document.getElementById("seyahat_planlayici");
//seyahat_planlayici.style.display = "none";


document.addEventListener("DOMContentLoaded",function(){
      
  let degisken_alan = document.getElementById("degisken_alan");

  const seyahat_planlayiciHTML = ` <div class="container py-5" id = "seyahat_planlayici">
      <h2 style = "padding-left:160px">🧳 Seyahat Planlayıcı ✈️</h2>

      <div class="card shadow-sm">
        <div class="card-body">

          <!-- Başlangıç Şehri -->
          <div class="mb-3">
            <label class="form-label">Başlangıç Şehri</label>
                <select id="baslangic_sehri" class="form-control">
                    <option value="" selected disabled>Şehir seç...</option>
            </select>
          
          </div>

          <!-- Varış Şehri -->
          <div class="mb-3">
            <label class="form-label">Varış Şehri</label>
                <select id="varis_sehri" class="form-control">
                    <option value="" selected disabled>Şehir seç...</option>
            </select>
          </div>

          <!-- Tarih -->
          <div class="mb-3">
            <label class="form-label">Gidiş tarihi</label>
            <input type="date" id="gidis_tarih" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Dönüş tarihi</label>
            <input type="date" id="donus_tarih" class="form-control">
          </div>

        

          <button class="btn btn-primary w-100" id="plan_butonu">Planı Oluştur</button>
        </div>
      </div>`;  





document.getElementById("planlama_linki").addEventListener("click",function(){


      degisken_alan.innerHTML = seyahat_planlayiciHTML;
      degisken_alan.style.display = "block";

      let sehirler;
      const baslangic_sehri = document.getElementById("baslangic_sehri");
      const varis_sehri = document.getElementById("varis_sehri");
      const plan_butonu = document.getElementById("plan_butonu");
      const gidis_tarihi = document.getElementById("gidis_tarih");
      const donus_tarihi = document.getElementById("donus_tarih");
      const gidilecek_sehir = varis_sehri.value;
      const request = new XMLHttpRequest();
      request.open("GET",`https://api.turkiyeapi.dev/v1/provinces`);
      request.send();
      request.addEventListener("load",function(){
         let veri = JSON.parse(this.responseText);
         sehirler = veri.data;
         console.log(sehirler);
       
         for(let i = 0;i<sehirler.length;i++){
            const shr = document.createElement("option");
            const shr2 = document.createElement("option");
            shr.value = sehirler[i].name;
            shr2.value = sehirler[i].name;
            shr.textContent = sehirler[i].name;
            shr2.textContent = sehirler[i].name;
            varis_sehri.appendChild(shr);
            baslangic_sehri.appendChild(shr2);
         }

      plan_butonu.addEventListener("click",function(){
      if(baslangic_sehri.value == "" || varis_sehri.value == "" || gidis_tarihi.value == "" || donus_tarihi.value == ""){
          alert("Hepsini doldurun.");
          return;
      } 

let varis_sehri_koor = [];
let baslangic_sehri_koor = [];
let mesafe;

const sehir1 = `${baslangic_sehri.value}, Turkey`;
const request = new XMLHttpRequest();
request.open("GET", `https://api.openrouteservice.org/geocode/search?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRjOTVlZDg4YjRkZTRhNjhhMjRjMDU4NzE3NjFkYjgwIiwiaCI6Im11cm11cjY0In0=&text=${encodeURIComponent(sehir1)}`);
request.send();

request.addEventListener("load", function() {
 
    const data = JSON.parse(request.responseText);
    console.log(data);

    baslangic_sehri_koor = data.features[0].geometry.coordinates; // Enlem,boylam
    console.log("Koordinatlar:", baslangic_sehri_koor);
    
    const sehir2 = `${varis_sehri.value}, Turkey`;
    const request5 = new XMLHttpRequest();
    request5.open("GET", `https://api.openrouteservice.org/geocode/search?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRjOTVlZDg4YjRkZTRhNjhhMjRjMDU4NzE3NjFkYjgwIiwiaCI6Im11cm11cjY0In0=&text=${encodeURIComponent(sehir2)}`);
    request5.send();
    request5.addEventListener("load", function() {
         const data = JSON.parse(request5.responseText);
         console.log(data);

        varis_sehri_koor = data.features[0].geometry.coordinates; // Enlem,Boylom
        console.log("Koordinatlar:", varis_sehri_koor);

        const request6 = new XMLHttpRequest(); // Mesafe Api
        request6.open("GET", `https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRjOTVlZDg4YjRkZTRhNjhhMjRjMDU4NzE3NjFkYjgwIiwiaCI6Im11cm11cjY0In0=&start=${baslangic_sehri_koor.join(",")}&end=${varis_sehri_koor.join(",")}`);
        request6.send(); 

        request6.addEventListener("load", function() {
    
        const data = JSON.parse(request6.responseText);
        console.log(data);

        const yol = data.features[0].properties.segments[0];
       // console.log("Mesafe:", yol.distance / 1000);
        mesafe = yol.distance / 1000;
       // console.log("Süre:", yol.duration / 3600);
        let sure = yol.duration / 3600;
        const modalIcerik3 = document.getElementById("modalIcerik3");
        modalIcerik3.innerHTML = `Yolculuğa başlayacağınız ${baslangic_sehri.value} ile gitmek
        istediğiniz ${varis_sehri.value} arası ${mesafe.toFixed(0)} kilometre olup, otomobil ile yaklaşık ${sure.toFixed(0)} saat sürmektedir`;
     
        });
   });
});


       // GİDİLECEK ŞEHİR HAKKINDA KISA BİLGİ
        const request2 = new XMLHttpRequest();
        request2.open("GET",`https://tr.wikipedia.org/api/rest_v1/page/summary/${varis_sehri.value}`);
        request2.send(); 
        request2.addEventListener("load",function(){
               const veri = JSON.parse(this.responseText);
               const modalIcerik = document.getElementById("modalIcerik");
               
               const modalLabel = document.getElementById("bilgiModalLabel");
               modalLabel.textContent = varis_sehri.value + " 📜";
               const sehirBilgi = veri.extract;
               modalIcerik.textContent = sehirBilgi;
               
        });
       
        // GİDİLECEK ŞEHRİN GİDİLEN GÜN İÇİN HAVA DURUMU BİLGİSİ
       const request3 = new XMLHttpRequest();
       request3.open("GET",`https://api.weatherapi.com/v1/current.json?key=c47ea2e2ad3841fd9f5204911252311&q=${varis_sehri.value}&dt=${gidis_tarihi.value}&lang=tr`)
       request3.send(); 
       request3.addEventListener("load",function(){
            const data = JSON.parse(this.responseText);
            console.log(data);
            const modalIcerik2 = document.getElementById("modalIcerik2");
            const sicaklik = data.current.temp_c;
            let oneri = "";
            let oneri2 = "";
            if(sicaklik > 25){
              oneri = "Kısa kollu giyebilirsiniz."
            }

            else if(sicaklik <= 25 && sicaklik > 15){
              oneri = "İnce bir sweatshirt veya hafif bir ceketle rahat edersiniz."
            }
            
            else if(sicaklik <= 10){
              oneri = "Soğuk olabilir.Tedbirli olun";
            }
            
            const ruzgar = data.current.wind_kph;
            if(ruzgar > 1 && ruzgar < 10){
              oneri2 = "Hafif rüzgar var."
            }

            else if(ruzgar > 50){
               oneri2 = "Rüzgar etkili oluyor."
            }
            const nem = data.current.humidity;
            const hava_durumu = data.current.condition.text.toLowerCase();
            modalIcerik2.innerHTML = `Seçtiğiniz ${varis_sehri.value} şehrinde, seyahati planladığınız ${gidis_tarihi.value} tarihinde hava ${sicaklik} derece,  
            ${hava_durumu}<img src = "https:${data.current.condition.icon}" alt = "icon" style = "width : 30px">. ${oneri2}
                                      nem %${nem} seviyesinde. ${oneri}`;
           
                                              
       });

       
      // KISA BİLGİ, HAVA DURUMU VE MESAFE MODALI
      const modalElement = document.getElementById("bilgiModal");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

       // OTEL SEÇME FİLTRELEME
    degisken_alan.innerHTML = ` <div class="container">  
             <header class="d-flex align-items-center mb-4">
             <h1 class="h3 me-auto">Otel Seçici</h1>
             <div>
               <button class="btn btn-outline-primary" id="viewFavoritesBtn"><i class="bi bi-heart"></i> Favoriler</button>
               </div>
             </header>

             <!-- Filtreler -->
            <section class="card mb-4 p-3">
            <div class="row g-2 align-items-center filter-row">
                <div class="col-md-4 col-lg-3">
                <input id="searchInput" class="form-control" placeholder="Otel ara..." />
            </div>
            <div class="col-6 col-md-3 col-lg-2">
               <select id="ratingSelect" class="form-select">
                 <option value="">Tüm Puanlar</option>
                 <option value="5">5 yıldız</option>
                 <option value="4">4 yıldız ve üstü</option>
                 <option value="3">3 yıldız ve üstü</option>
               </select>
            </div>
            <div class="col-md-2 col-lg-2">
               <select id="sortSelect" class="form-select">
                 <option>Sırala</option>
                 <option value="fiyat_artan">Fiyata göre (Artan)</option>
                 <option value="fiyat_azalan">Fiyata göre (Azalan)</option>
               </select>
            </div>
           <div class="col-12 col-md-2 col-lg-3 text-end">
              <button class="btn btn-primary" id="resetFilters">Filtreleri Sıfırla</button>
           </div>
         </div>
        </section>

    <!-- OTEL LİSTESİ -->
    
    <section id="otelListesi" class="row g-3">  <!-- OTELLER (OTEL KARTLARI) BURAYA EKLENECEK -->
  
    </section>

    <div id="noResults" class="no-results d-none">
      <h4>Uygun otel bulunamadı</h4>
      <p>Filtrelerinizi değiştirip tekrar deneyin.</p>
    </div>

    <!-- OTEL DETAY MODALI -->
    <div class="modal fade" id="hotelModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="hotelModalTitle" style = "position:relative;left:45%">Otel Adı</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat" style = " filter: brightness(0) saturate(100%) invert(37%) sepia(69%) saturate(4950%) hue-rotate(337deg) brightness(102%) contrast(102%);"></button>
          </div>
               <div class="modal-body">
                  <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                     <div class="carousel-inner">
                     <div class="carousel-item active">
                      <img class="d-block w-100" src="hotel1.jpg" alt="First slide">
                      </div>
                     <div class="carousel-item">
                   <img class="d-block w-100" src="kilim-otel-291-1024x683_1.jpg" alt="Second slide">
                  </div>
                 </div>
                  <!-- Geri Butonu -->
                 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                  </button>

                <!-- İleri Butonu -->
               <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Next</span>
                </button>

              </div>
            <label for="adults" class="form-label">Yetişkin Sayısı</label>
            <div class="input-group" style="width:120px;">
              <button class="btn btn-outline-secondary" type="button" id="decrease">−</button>
              <input type="text" class="form-control text-center" id="adults" value="1" readonly>
              <button class="btn btn-outline-secondary" type="button" id="increase">+</button>
             </div>
              <p id="hotelModalUcret" style = "font-size:1.4rem;font-weight: bold;color: #198754;">Fiyat: 0 TL</p>
            <p id="hotelModalDesc"></p>
            <ul id="hotelModalFeatures"></ul>
          </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Kapat</button>
             <button type="button" class="btn btn-primary btn-select-modal">Bu Oteli Seç</button>
           </div>
         </div>
        </div>
       </div>
       </div>`;



       const sehirler = [
          "adana","adıyaman","afyonkarahisar","ağrı","amasya","ankara","antalya","artvin","aydın",
          "balıkesir","bilecik","bingöl","bitlis","bolu","burdur","bursa","çanakkale","çankırı",
          "çorum","denizli","diyarbakır","edirne","elazığ","erzincan","erzurum","eskişehir",
          "gaziantep","giresun","gümüşhane","hakkari","hatay","ısparta","mersin","istanbul",
          "izmir","kars","kastamonu","kayseri","kırklareli","kırşehir","kocaeli","konya",
          "kütahya","malatya","manisa","kahramanmaraş","mardin","muğla","muş","nevşehir",
          "niğde","ordu","rize","sakarya","samsun","siirt","sinop","sivas","tekirdağ",
          "tokat","trabzon","tunceli","şanlıurfa","uşak","van","yozgat","zonguldak",
          "aksaray","bayburt","karaman","kırıkkale","batman","şırnak","bartın","ardahan",
           "ığdır","yalova","karabük","kilis","osmaniye","düzce"];
        
        const otelİsimleri = ["Grand","Hilton","Shariton","Inn","Kervansaray","Rixos","Vogue","Voyage","Paris","Sabancı","Green Park","Crowne Plaza"];   
        console.log(varis_sehri.value);
        const oteller = [];

        for(let i = 0;i<81;i++){
             for(let j = 0;j<Math.floor(Math.random()*12) + 5;j++){
                 oteller.push({
                  sehir : sehirler[i],
                  ad : otelİsimleri[Math.floor(Math.random()*11)],
                  fiyat : Math.floor(Math.random()*1000 + 10000),
                  yildiz : Math.floor(Math.random() * 5) + 1,
                  foto : `https://via.placeholder.com/150?`
                 })
             }
        }
             
        // OTEL SEÇME EKRANINA OTEL KARTI OLUŞTURMA
             for(let j = 0;j<oteller.length;j++){
                if(oteller[j].sehir == varis_sehri.value.toLowerCase()){
                  console.log("okkaaayyy");
                  const otelKartHTML = `
                       <div class="col-12 col-md-6 col-lg-4" data-name="${oteller[j].ad}" data-location="${oteller[j].sehir}" data-price="${oteller[j].fiyat}" data-rating="${oteller[j].yildiz}">
                       <div class="card hotel-card h-100" tabindex="0">
                      <img src="C:/Users/alper/Desktop/WebProjesi-main/Web_Programlama/index.html/kilim-otel-291-1024x683_1.jpg" class="card-img-top" alt="${oteller[j].ad}">
                     <div class="card-body d-flex flex-column">
                     <div class="d-flex justify-content-between align-items-start mb-2">
                      <h5 class="card-title mb-0">${oteller[j].ad}</h5>
                         <span class="badge bg-success price-badge">${oteller[j].fiyat} ₺</span>
                     </div>
                  <p class="mb-2 text-muted small">${oteller[j].sehir.toUpperCase()} • Boğaz manzaralı, şehir merkezine yakın</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                     <div>
                      <span class="badge bg-primary"><i class="bi bi-star-fill"></i> ${oteller[j].yildiz} ⭐</span>
                     <span class="ms-2 small text-muted">(245 değerlendirme)</span>
                     </div>
                      <div>
                        <button class="btn btn-sm btn-success btn-select secme_butonu">Seç</button>
                     </div>
                   </div>
                 </div>
                 </div>
               </div>
               </div>`
               const otelListesi = document.getElementById("otelListesi");
                otelListesi.insertAdjacentHTML("beforeend", otelKartHTML);
               
                }
             }
        
             const fiyat_filtre = document.getElementById("sortSelect");
             const yildiz_filtre = document.getElementById("ratingSelect");
             const dizi = Array.from(otelListesi.children);

             fiyat_filtre.addEventListener("change",function(){
                if(fiyat_filtre.value == "fiyat_azalan"){
                     for( let i = 0;i<dizi.length;i++){
                         for(let j = 0;j<dizi.length;j++){
                            if(parseInt(dizi[i].getAttribute('data-price')) > parseInt(dizi[j].getAttribute('data-price'))){
                                let temp = dizi[i];
                                dizi[i] = dizi[j];
                                dizi[j] = temp;
                          }
                        }
                     }
                }
                
                if(fiyat_filtre.value == "fiyat_artan"){
                     for( let i = 0;i<dizi.length;i++){
                         for(let j = 0;j<dizi.length;j++){
                            if(parseInt(dizi[i].getAttribute('data-price')) < parseInt(dizi[j].getAttribute('data-price'))){
                                let temp = dizi[i];
                                dizi[i] = dizi[j];
                                dizi[j] = temp;
                          }
                        }
                     }
                }
                
                otelListesi.innerHTML = "";
                for(let i = 0;i<dizi.length;i++){
                  otelListesi.appendChild(dizi[i]);
                }
                  
                });
              
                yildiz_filtre.addEventListener("change",function(){
                     
                   if(yildiz_filtre.value == "5"){
                      for(let i = 0;i<otelListesi.children.length;i++){
                            if(parseInt(otelListesi.children[i].getAttribute('data-rating')) == 5){
                              otelListesi.children[i].style.display = "block";
                            }

                            else{
                              otelListesi.children[i].style.display = "none";
                            }
                      }
                    }

                    else if(yildiz_filtre.value == "4"){
                      for(let i = 0;i<otelListesi.children.length;i++){
                            if(parseInt(otelListesi.children[i].getAttribute('data-rating')) >= 4){
                              otelListesi.children[i].style.display = "block";
                            }

                            else{
                              otelListesi.children[i].style.display = "none";
                            }
                      }
                    }

                    else if(yildiz_filtre.value == "3"){
                      for(let i = 0;i<otelListesi.children.length;i++){
                            if(parseInt(otelListesi.children[i].getAttribute('data-rating')) >= 3){
                              otelListesi.children[i].style.display = "block";
                            }

                            else{
                              otelListesi.children[i].style.display = "none";
                            }
                      }
                    }

                    else{
                      for(let i = 0;i<otelListesi.children.length;i++){  
                          otelListesi.children[i].style.display = "block"; 
                      }
                    }
                })
                 
                let ucret;
                document.addEventListener("click",e => {
                  if(e.target.classList.contains("secme_butonu")){
                     const modal2 = document.getElementById("hotelModal");
                     const otel_adi = document.getElementById("hotelModalTitle");
                     otel_adi.innerText = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-name') + " OTEL";
                     ucret = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-price');
                     const fiyat = document.getElementById("hotelModalUcret");
                     fiyat.innerHTML = `Fiyat : ${ucret} TL`
                     const modal = new bootstrap.Modal(modal2);
                     modal.show();
                  }
                  
          
                })

                  const dec = document.getElementById("decrease");
                  const inc = document.getElementById("increase");
                  const yetiskin_sayisi = document.getElementById("adults");
                  let yetiskin_sayisi_int = parseInt(yetiskin_sayisi.value);
                  const fiyat = document.getElementById("hotelModalUcret");
                  inc.addEventListener("click",function(){
                         ucret = parseInt(ucret) + 1500;
                         yetiskin_sayisi_int += 1;
                         yetiskin_sayisi.value = yetiskin_sayisi_int;
                         fiyat.innerHTML = `Fiyat : ${ucret} TL`
                         console.log(ucret);
                  })

                  dec.addEventListener("click",function(){
                         
                      if(yetiskin_sayisi_int > 1){
                          yetiskin_sayisi_int -= 1;
                          yetiskin_sayisi.value = yetiskin_sayisi_int;
                          ucret = parseInt(ucret) - 1500;
                          fiyat.innerHTML = `Fiyat : ${ucret} TL`;
                      }
                              
                  })

                  const otel_ara = document.getElementById("searchInput");
                  otel_ara.addEventListener("input",function(){
                     for(let i = 0;i<otelListesi.children.length;i++){
                            if(otelListesi.children[i].getAttribute("data-name").toLowerCase().includes(otel_ara.value.toLowerCase())){
                              otelListesi.children[i].style.display = "block";
                            }

                            else{
                              otelListesi.children[i].style.display = "none";
                            }
                     }
             })

             })          
           
      });

})

});














