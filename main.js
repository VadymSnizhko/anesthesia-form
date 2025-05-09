const apiUrl = "https://script.google.com/macros/s/AKfycbzA9Hbs0kh9vG8-RDlc62eZbU30COOhpnUMeMzdJyDn7Zs0-TXM-X8zi76sN5WJfbDCRQ/exec";

function loadNames() {
  const hist = document.getElementById("histNumber").value;
  fetch(`${apiUrl}?number=${hist}`)
    .then(res => res.json())
    .then(data => {
      const sel = document.getElementById("nameSelect");
      sel.innerHTML = "";
      data.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        sel.appendChild(opt);
      });
      if (data.length > 0) {
        document.getElementById("patientBlock").style.display = "block";
      }
    });
}

function submitForm() {
  const d = val => document.getElementById(val).value;

  const start = new Date(`${d("startDate")}T${d("startHour")}:${d("startMinute")}`);
  const end = new Date(`${d("endDate")}T${d("endHour")}:${d("endMinute")}`);
  const durationMin = Math.round((end - start) / 60000);
  const dur = `${Math.floor(durationMin/60)}:${("0"+(durationMin%60)).slice(-2)}`;

  const data = {
    histNumber: d("histNumber"),
    name: d("nameSelect"),
    startDate: d("startDate"),
    startHour: d("startHour"),
    startMinute: d("startMinute"),
    endDate: d("endDate"),
    endHour: d("endHour"),
    endMinute: d("endMinute"),
    duration: dur,
    place: d("place"),
    operationType: d("operationType"),
    doctor: d("doctor"),
    nurse: d("nurse"),
    anesthesiaType: d("anesthesiaType"),
    transferPlace: d("transferPlace")
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.json())
  .then(r => alert("Успішно збережено!"))
  .catch(err => alert("Помилка: " + err));
}