const $input = document.getElementById("shortern__input");
const $btn = document.getElementById("shortern__btn");
const $form = document.querySelector("form");
const mensajeError = document.querySelector('.error-input')


$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if($input.value.trim() === ""){
    mensajeError.style.display = "Block"
  }
  getUrl($input.value).then(data => console.log('https://rel.ink/'+data[0].hashid))
});

async function getUrl(url) {
  let response = []
  await fetch("https://rel.ink/api/links/", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "es-US,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6",
      "content-type": "application/json;charset=UTF-8"
    },
    "method": "POST",
    "body": JSON.stringify({
      url: url,
    }),
  }).then(resp => resp.json())
  .then(data => response = [...response, data])
  return response;
}
