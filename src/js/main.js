import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function setParkInfoLinks(parkData) {

    return [
        {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        image: parkData.images[2].url,
        description:
            "See what conditions to expect in the park before leaving on your trip!"
        },
        {
        name: "Fees and Passes &#x203A;",
        link: "fees.html",
        image: parkData.images[3].url,
        description: "Learn about the fees and passes that are available."
        },
        {
        name: "Visitor Centers &#x203A;",
        link: "visitor_centers.html",
        image: parkData.images[9].url,
        description: "Learn about the visitor centers in the park."
        }
    ];
}

function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner-title>${info.name || "Unknown Park"}</a>
    <p class="hero-banner-subtitle">
        <span>${info.designation || ""}</span>
        <span>${info.states || ""}</span>
    </p>`;
}
function setHeaderInfo(data) {
    // insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
    // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = data.fullName;
    // set the banner image
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    // use the template function above to set the rest of the park specific info in the header
    document.querySelector(".hero-banner-content").innerHTML =
      parkInfoTemplate(data);
  }

  function mediaCardTemplate(info) {
    return `
    <article class="card">
        <a href="${info.link}">
            <img src="${info.image}" alt="${info.name}">
        </a>
        <h2><a href="${info.link}">${info.name}</a></h2>
        <p>${info.description}</p>
    </article>
    `;
  }

  function setParkIntro(data) {
    const main = document.getElementById("main");
    const section = document.createElement("section");
    section.classList.add("park-intro");
    section.innerHTML = `
        <h1>${data.fullname}</h1>
        <p>${data.description}</p>
    `;
    main.appendChild(section);
  }

  function setParkInfo(data) {
    const main = document.getElementById("main");
    const section = document.createElement("section");
    const parkInfoLinks = setParkInfoLinks(data);
    section.classList.add("info-cards");

    // Make the cards and put them together
    section.innerHTML = parkInfoLinks.map(mediaCardTemplate).join("");

    main.appendChild(section);
  }


  function footerTemplate(address, phone) {
    return `
        <section class="contact-info">
            <h2>Contact Info</h2>
            <p><strong>Mailing Address:</strong><br>
                ${address.line1}, ${address.stateCode} ${address.postalCode}
            </p>
            <p><strong>Phone:</strong><br>${phone.phoneNumber}</p>
        </section>
    `;
  }

  function setParkFooter(data) {
    const footer = document.getElementById("park-footer");
    const address = data.addresses.find(addr => addr.type === "Mailing");
    const phone = data.contacts.phoneNumbers.find(num => num.type === "Voice");

    footer.innerHTML = footerTemplate(address, phone);
  }



  setHeaderInfo(parkData);
  setParkIntro(parkData);
  setParkInfo(parkData);
  setParkFooter(parkData);

