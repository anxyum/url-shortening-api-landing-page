const $burgerMenuButton = document.querySelector(
  ".hero-header-burger-menu-btn"
);
const $nav = document.querySelector(".hero-header-nav");

const $heroForm = document.querySelector(".short-links-form");
const $heroFormInputs = {
  link: document.getElementById("short-links-form-link-input"),
};

const $shortenLinks = document.querySelector(".short-links-shortened-links");

console.log($burgerMenuButton);
console.log($nav);

console.log($heroForm);
console.log($heroFormInputs);

console.log($shortenLinks);

async function shortenLink(url) {
  try {
    const res = await fetch("http://10.59.122.39:3000/shorten", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = res.json();
    return data;
  } catch {
    return "aaa";
  }
}

function displayNewShortenLink(link, shortenLink) {
  let newShortenLink = document.createElement("div");
  newShortenLink.innerHTML = `<li class="short-links-shortened-link">
    <div class="short-links-shortened-link-links-wrapper">
      <a
        class="short-links-shortened-link-link"
        href="${link}"
      >
        ${link}
      </a>
      <hr class="short-links-shortened-link-separator" />
      <a
        class="short-links-shortened-link-short-link"
        href="${shortenLink}"
      >
        ${shortenLink}
      </a>
    </div>
    <button class="btn short-links-shortened-link-copy-btn">Copy</button>
    <button class="btn short-links-shortened-link-copy-btn--copied hidden">
      Copied!
    </button>
  </li>`;
  newShortenLink = newShortenLink.querySelector("*");

  const $copyBtn = newShortenLink.querySelector(
    ".short-links-shortened-link-copy-btn"
  );
  const $copiedBtn = newShortenLink.querySelector(
    ".short-links-shortened-link-copy-btn--copied"
  );
  $copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(shortenLink);
    $copyBtn.classList.add("hidden");
    $copiedBtn.classList.remove("hidden");
  });

  $shortenLinks.appendChild(newShortenLink);
}

$burgerMenuButton.addEventListener("click", () => {
  console.log("saucisson");
  $nav.classList.toggle("hero-header-nav--active");
});

$heroForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const link = $heroFormInputs.link.value;

  if (link.trim().length === 0) {
    $heroFormInputs.link.parentElement.classList.add("error");
    return;
  }
  $heroFormInputs.link.parentElement.classList.remove("error");

  const shortLink = await shortenLink(link);
  displayNewShortenLink(link, shortLink);
});
