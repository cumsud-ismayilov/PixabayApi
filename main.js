const searchInput = document.querySelector("#searchInput");
const cardElem = document.querySelector("#card");
const BaseUrl = "https://pixabay.com/api"; // DOĞRU URL
const ApiKey = "key=24090419-925e057925ba4cc124682bb5f";
const notResult = document.querySelector("#notResult");
const loader = document.querySelector("#loader");
searchInput.focus();
domRender("baku");

searchInput.addEventListener("keyup", (e) => {
  const searchValue = searchInput.value.toLowerCase();
  if (e.key === "Enter") {
    domRender(searchValue);
  }
});

function sliceTag(tags) {
  let result = "";
  tags.split(", ").forEach((tag) => {
    result += `<span class="text-blue-500">#${tag}</span>`;
  });
  return result;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function domRender(param) {
  cardElem.innerHTML = "";
  notResult.classList.add("hidden");
  loader.classList.remove("hidden");
  try {
    await delay(1500);
    const response = await fetch(`${BaseUrl}/?${ApiKey}&q=${param}`);
    const data = await response.json();

    if (data.hits.length) {
      data.hits.forEach((info) => {
        cardElem.innerHTML += `
        <div class="shadow-lg rounded-md border border-[violet]">
          <img src="${
            info.webformatURL
          }" alt="" class="w-full object-cover h-[300px]">
          <div class="p-[20px]">
            <p class="mb-[10px] flex flex-wrap gap-[4px]">${sliceTag(
              info.tags
            )}</p>
            <button>
              <a href="${info.previewURL}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>
            </button>
          </div>
        </div>
      `;
      });
    } else {
      notResult.classList.remove("hidden");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    loader.classList.add("hidden");
  }
}
