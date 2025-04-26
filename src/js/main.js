import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner_title>${info.name}</a>
    <p class="hero-banner_subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
    </p>`;
}

document.querySelector("head > title").textContent = parkData.fullName;

document.querySelector(".hero-banner > img").src = parkData.images[0].url;

document.querySelector(".hero-banner-content").innerHTML = parkInfoTemplate(parkData);