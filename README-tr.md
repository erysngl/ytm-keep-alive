<div align="right">
  <a href="README.md">🇬🇧 English</a> | <b>🇹🇷 Türkçe</b>
</div>

# 🎵 YTM Keep-Alive

<img width="1919" height="1079" alt="screenshot (3)" src="https://github.com/user-attachments/assets/cec301b1-2d8d-49bf-8288-2192fa0441bf" />
<br> <div align="center">
  <img src="https://github.com/user-attachments/assets/254a8d7b-50ee-4673-904d-335dd96314a1" width="49%" alt="screenshot (1)" />
  <img src="https://github.com/user-attachments/assets/69bb4f2b-cfac-4f47-b6b3-1140a6aef72b" width="49%" alt="screenshot (2)" />
</div>

YouTube ve YouTube Music'in *"Video duraklatıldı. İzlemeye devam edilsin mi?"* uyarısıyla duraklamasını engelleyen, hafif ve saf DOM tabanlı bir yer imi (bookmarklet) aracı.

## ✨ Özellikler
* **Eklenti Gerektirmez:** Tarayıcınızı hızlı ve temiz tutar.
* **%100 Güvenli (TrustedHTML Bypass):** Tamamen saf DOM elementleriyle (`document.createElement`) oluşturulmuştur. `innerHTML` kullanmaz ve YouTube'un sıkı İçerik Güvenlik Politikası'nı (CSP) tamamen aşar.
* **Sürüklenebilir Arayüz:** Ekranın herhangi bir yerine sürükleyebileceğiniz, şık, karanlık temalı ve kayan bir panel sunar.
* **Akıllı Algılama:** "Evet" onay butonu ekranda belirdiği anda, saniyeler içinde otomatik olarak tıklar.

## 🚀 Kolay Kurulum
Herhangi bir kodu kopyalayıp yapıştırmanıza gerek yoktur. 

1. **[Kurulum Sayfasına](https://erysngl.github.io/ytm-keep-alive/index-tr.html)** gidin.
2. Kırmızı renkli **"Sürükle-Bırak"** butonunu tarayıcınızın yer imleri çubuğuna sürükleyip bırakın.
3. YouTube Music'i açın, yer imine tıklayın ve kesintisiz müziğin keyfini çıkarın!

## 🛠️ Nasıl Çalışır?
Aktifleştirildiğinde, ekranda şık, kayan bir araç çubuğu oluşturur. Şimşek hızında tepki verebilmek için onay uyarısını **her saniye** tarar. Tarayıcının arka plandaki sekmeyi uyku moduna almasını engellemek için Sayfa Görünürlük (Page Visibility) API'sini güvenli bir şekilde aşar ve her dakikada bir 1 piksellik mikro bir kaydırma işlemi yapar. Onay uyarısını bulduğunda otomatik olarak tıklar, canlı **"Engellenen" (Prevented) sayacını** artırır ve panelde "Engel Aşıldı!" uyarısını gösterir.

## 🌐 Tarayıcı Desteği

Bu yer imi, standart web API'lerini ve saf DOM manipülasyonunu kullanır; bu sayede tüm modern masaüstü tarayıcılarla tam uyumludur:

- ✅ **Google Chrome** (Windows, macOS, Linux)
- ✅ **Mozilla Firefox**
- ✅ **Microsoft Edge**
- ✅ **Brave Browser**
- ✅ **Opera / Opera GX**
- ✅ **Safari** (macOS)

*Not: Mobil tarayıcılar genellikle bu tür araçlar için geleneksel bir yer imleri çubuğunu desteklemediğinden, bu araç masaüstü kullanım için tasarlanmıştır.*

## 👨‍💻 Geliştiriciler İçin

`index.html` sayfasındaki kurulum butonunun içindeki kod, tek satırlık bir yer imi olarak etkili bir şekilde çalışabilmesi için küçültülmüştür (minified). 

Kaynak kodunu okumak, incelemek veya katkıda bulunmak isterseniz, lütfen **[`ytm-keep-alive.js`](./ytm-keep-alive.js)** dosyasını kontrol edin. Bu dosya script'in tam olarak biçimlendirilmiş, yorum satırları eklenmiş ve okunabilir versiyonunu içerir. 

*Not: Temel mantığı değiştiren tüm çekme istekleri (pull request) öncelikle `ytm-keep-alive.js` dosyasına uygulanmalıdır.*

<div align="center">

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-blue.svg?style=for-the-badge)

</div>
