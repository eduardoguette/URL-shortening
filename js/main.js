const $input = document.getElementById("shortern__input");
const $btn = document.getElementById("shortern__btn");
const $form = document.querySelector("form");
const mensajeError = document.querySelector(".error-input");
const shorterns = document.querySelector(".shorterns-urls__container");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($input.value.trim() === "") {
    mensajeError.style.display = "Block";
  } else {
    getUrl($input.value).then((data) => {
      data = "https://rel.ink/" + data[0].hashid;
      shorterns.innerHTML = `
      <div class="shorterns-urls__card">
      <a class="shorterns-urls__url">${$input.value.trim}</a>
      <hr class="separador" />
      <a class="short-url">${data}</a>
      <button class="btn-copy">Copy</button>
      </div>`;
      document.querySelector(".short-url").setAttribute("href", data);
      document.querySelector(".short-url").setAttribute("target", "_blank");
      document.querySelector(".shorterns-urls__url").setAttribute("href", $input.value.trim());
      document.querySelector(".shorterns-urls__url").setAttribute("target", "_blank");
      if ($input.value.trim().length > 35) {
        console.log("siii");
        document.querySelector(".shorterns-urls__url").innerHTML = document.getElementById("shortern__input").value.slice(0, 35) + "...";
      }
    });
  }
});

async function getUrl(url) {
  let response = [];
  await fetch("https://rel.ink/api/links/", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "es-US,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6",
      "content-type": "application/json;charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      url: url,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => (response = [...response, data]));
  return response;
}
