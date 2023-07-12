async function attachEvents() {
  //Get static parts
  const LoadPostsBtn = document.getElementById('btnLoadPosts');
  const selectPosts = document.getElementById('posts');
  const viewBtn = document.getElementById('btnViewPost');
  const postDetails = document.getElementById('post-title');
  const postBody = document.getElementById('post-body');
  const commentsDetails = document.getElementById('post-comments');

  //Get posts
  const postResponse = await fetch(
    'http://localhost:3030/jsonstore/blog/posts'
  );
  const posts = await postResponse.json();
  //   console.log(posts);

  //Get comments
  const commentsResponse = await fetch(
    'http://localhost:3030/jsonstore/blog/comments'
  );
  const comments = await commentsResponse.json();
  //   console.log(comments);

  //Add event listener for loading posts
  LoadPostsBtn.addEventListener('click', (e) => {
    Object.values(posts).forEach(({ body, id, title }) => {
      //Prevent to append many times
      const existingOption = selectPosts.querySelector(`option[value="${id}"]`);
      if (!existingOption) {
        const option = document.createElement('option');
        option.textContent = title;
        option.value = id;
        option.body = body;
        selectPosts.appendChild(option);
      }
    });
  });

  //View button functionality
  viewBtn.addEventListener('click', async () => {
    // Clear previous comments
    commentsDetails.innerHTML = '';

    //All comments
    Object.values(comments).forEach(async ({ id, postId, text }) => {
      const current = selectPosts.options[selectPosts.selectedIndex];
      if (current.value === postId) {
        // //Get data
        // const currRes = await fetch(
        //   `http://localhost:3030/jsonstore/blog/comments/${id}`
        // );
        // const currData = await currRes.json();
        // console.log('here: ', currData);

        // postDetails.textContent = current.body;
        postDetails.textContent = current.textContent;
        postBody.textContent = current.body;
        // postDetails.appendChild(postBody);

        const li = document.createElement('li');
        li.textContent = text;
        li.id = id;
        commentsDetails.appendChild(li);
      }
    });
  });
}

attachEvents();
