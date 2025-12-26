const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input[type='file']"),
infoText = form.querySelector(".content p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy"),
qrImg = form.querySelector("img"),
textarea = document.querySelector(".details textarea");

const html5QrCode = new Html5Qrcode("reader");

form.addEventListener("click", () => fileInp.click());

fileInp.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) {
    wrapper.classList.remove("active");
    return;
  }

  infoText.innerText = "Scanning QR Code...";

  try {
    const decodedText = await html5QrCode.scanFile(file, true);

    textarea.value = decodedText;
    qrImg.src = URL.createObjectURL(file);
    wrapper.classList.add("active");
    infoText.innerText = "Upload QR Code to Scan";

  } catch (err) {
    infoText.innerText = "Couldn't scan QR Code";
  }
});

copyBtn.addEventListener("click", () => {
  if (!textarea.value) return;
  navigator.clipboard.writeText(textarea.value);
  alert("Copied to Clipboard");
});

closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
  qrImg.src = "";
  textarea.value = "";
});
