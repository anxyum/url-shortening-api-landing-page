const $burgerMenuButton = document.querySelector(
  ".hero-header-burger-menu-btn"
);
const $nav = document.querySelector(".hero-header-nav");
const $heroForm = document.querySelector(".hero-form");
const $heroFormInputs = {
  link: document.getElementById("hero-form-link-input"),
};

console.log($burgerMenuButton);
console.log($nav);
console.log($heroForm);

async function shortenLink(url) {
  const res = await fetch("http://10.59.122.39:3000/shorten", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  const data = res.json();
  return data;
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
  console.log(shortLink);
});
