let map;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 16,
        });

        const marker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "ตำแหน่งของคุณ",
        });

        const mapURL = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
        document.getElementById("googleMapLink").value = mapURL;
      },
      () => {
        alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้");
      }
    );
  } else {
    alert("เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (!navigator.geolocation) {
    alert("เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const map = L.map('map').setView([lat, lng], 16);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([lat, lng]).addTo(map)
      .bindPopup('ตำแหน่งของคุณ')
      .openPopup();

    // ส่ง link ไป hidden input
    const mapURL = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
    document.getElementById('googleMapLink').value = mapURL;
  }, () => {
    alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้");
  })
})

// ส่งฟอร์มพร้อมเพิ่มวันและเวลา
document.addEventListener("DOMContentLoaded", function () {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzN-N6Txs1amLY3RMYi-8jeawW1j8BvgzfAzP3_79fa_TAr2BcDfTqAz7k45hRoM5ourA/exec';
  const form = document.getElementById('memberForm');
  const responseMsg = document.getElementById('responseMsg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    const now = new Date();
    formData.append('วันสมัคร', now.toLocaleDateString('th-TH'));
    formData.append('เวลาสมัคร', now.toLocaleTimeString('th-TH'));

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      responseMsg.innerHTML = "ส่งข้อมูลเรียบร้อยแล้ว!";
      form.reset();
    })
    .catch(error => {
      responseMsg.innerHTML = "เกิดข้อผิดพลาด: " + error.message;
    });
  });
});
