async function solution() {
  let initUrl = "http://localhost:3030/jsonstore/advanced/articles/list";

  let articles = await fetch(initUrl).then((res) => res.json());

  articles.forEach(async (art) => {
    let singleUrl = "http://localhost:3030/jsonstore/advanced/articles/details";
    let singleData = await fetch(`${singleUrl}/${art._id}`).then((r) =>
      r.json()
    );
    document
      .querySelector("#main")
      .appendChild(
        createAccordion(art._id, singleData.title, singleData.content)
      );
  });

  function createAccordion(currId, currTitle, currContent) {
    let accDiv = document.createElement("div");
    accDiv.classList.add("accordion");

    let headDiv = document.createElement("div");
    headDiv.classList.add("head");

    let span1 = document.createElement("span");
    span1.innerHTML = currTitle;

    let btn1 = document.createElement("button");
    btn1.classList.add("button");
    btn1.id = currId;
    btn1.innerHTML = "More";

    btn1.addEventListener("click", () => {
        if (extraDiv.style.display == 'block') {
            btn1.innerHTML = "More";
            extraDiv.style.display = 'none'
        } else {
            btn1.innerHTML = "Less";
            extraDiv.style.display = 'block'
        }
    });

    let extraDiv = document.createElement("div");
    extraDiv.classList.add("extra");

    let pContent = document.createElement("p");
    pContent.innerHTML = currContent;

    extraDiv.appendChild(pContent);

    headDiv.appendChild(span1);
    headDiv.appendChild(btn1);

    accDiv.appendChild(headDiv);
    accDiv.appendChild(extraDiv);

    return accDiv;
  }
}
solution();
