const $input = document.getElementById("shortern__input");
const $btn = document.getElementById("shortern__btn");
const $form = document.querySelector("form");
const mensajeError = document.querySelector(".error-input");
const shorterns = document.querySelector(".shorterns-urls__container");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newShorten = "";
  if ($input.value.trim() === "") {
    mensajeError.style.display = "Block";
  } else {
    getUrl($input.value).then((data) => {
      newShorten = data[0];
      if (!localStorage.getItem("arraysShorten")) {
        localStorage.setItem("arraysShorten", JSON.stringify([newShorten]));
      } else {
        let tmpLS = JSON.parse(localStorage.getItem("arraysShorten"));
        tmpLS = [...tmpLS, newShorten];
        localStorage.setItem("arraysShorten", JSON.stringify(tmpLS));
      }
    });
    setTimeout(() => {
      render();
    }, 2000);
  }
});

if (localStorage.getItem("arraysShorten")) {
  render();
}

function render() {
  let arrayRender = JSON.parse(localStorage.getItem("arraysShorten"));
  shorterns.innerHTML = "";
  arrayRender.map((elem, i) => {
    let urlShort = "https://rel.ink/" + elem.hashid;
    let divContainer = document.createElement("div");
    divContainer.className = "shorterns-urls__card";
    if (elem.url.length > 35) {
      var url_cor = elem.url.slice(0, 35) + "...";
      divContainer.innerHTML = `
      <a href=${elem.url} class="shorterns-urls__url">${url_cor}</a>
      <hr class="separador" />
      <a href=${urlShort} class="short-url">${urlShort}</a>
      <button class="btn-copy" id=${i} data-clipboard-text=${urlShort}>Copy</button>
      `;
    } else {
      divContainer.innerHTML = `
      <a href=${elem.url} class="shorterns-urls__url">${elem.url}</a>
      <hr class="separador" />
      <a href=${urlShort} class="short-url">${urlShort}</a>
      <button class='btn-copy '+${i} id=${i} data-clipboard-text=${urlShort}>Copy</button>
      `;
    }
    setTimeout(() => {
      shorterns.appendChild(divContainer);
    }, 100);
  });
}

document.querySelector(".shorterns-urls__container").addEventListener("click", (e) => {
  if (e.target.className === "btn-copy") {
    let ids = e.target.id;
   /*  var clipboard = new ClipboardJS();
    clipboard.on("success", function (e) {
      console.info("Action:", e.action);
      console.info("Text:", e.text);
      console.info("Trigger:", e.trigger);

      e.clearSelection();
    });

    clipboard.on("error", function (e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    }); */
  }
}); /* var clipboard = new ClipboardJS(".btn-copy");

clipboard.on("success", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);

  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
}); */

/* document.querySelectorAll(".btn-copy").forEach('')
 */ async function getUrl(url) {
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
