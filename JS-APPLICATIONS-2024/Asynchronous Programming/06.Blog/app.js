function attachEvents() {
  const postUrl = "http://localhost:3030/jsonstore/blog/posts";
  const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
  const loadPostsBtn = document.querySelector("#btnLoadPosts");
  const viewBtn = document.querySelector("#btnViewPost");
  const selectPosts = document.querySelector("#posts");

  loadPostsBtn.addEventListener("click", async () => {
    document.querySelector("#posts").replaceChildren();

    let posts = await fetch(postUrl).then((res) => res.json());
    Object.values(posts).forEach(({ body, id, title }) => {
      let opt = document.createElement("option");
      opt.value = id;
      opt.innerHTML = title;
      opt.body = body;
      document.querySelector("#posts").appendChild(opt);
    });

    viewBtn.addEventListener("click", async () => {
      document.querySelector("#post-comments").replaceChildren();
      let current = selectPosts.options[selectPosts.selectedIndex];
      // let currD = await fetch(`${postUrl}/${current.value}`).then((res) =>
      //   res.json()
      // );

      // document.querySelector("#post-title").innerHTML = currD.title;
      // document.querySelector("#post-body").innerHTML = currD.body;

      let comments = await fetch(commentsUrl).then((res) => res.json());

      Object.values(comments).forEach((comment) => {
        if (comment.postId == current.value) {
          document.querySelector("#post-title").innerHTML = current.textContent;
          document.querySelector("#post-body").innerHTML = current.body;

          let listItem = document.createElement("li");
          listItem.id = comment.id;
          listItem.innerHTML = comment.text;
          document.querySelector("#post-comments").appendChild(listItem);
        }
      });
    });
  });
}

attachEvents();
