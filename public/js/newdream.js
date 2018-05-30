$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?dream_id=") !== -1) {
    dreamId = url.split("=")[1];
    getPostData(dreamId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var title = $("#title");
  var mood = $("#mood");
  var dream = $("#dream_input");
  var postPrivacy = $("#privacy");
  var cmsForm = $("#cms");
  // Giving the postCategorySelect a default value
  // postCategorySelect.val("Personal");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!title.val().trim() || !dream.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: title.val().trim(),
      mood: mood.val(),
      dream: dream.val(),
      privacy: postPrivacy.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      console.log("Updating post")
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      console.log("Submitting new post")
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/add-dream/", Post, function() {
      window.location.href = "/my-dreams";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/update-dream/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        title.val(data.title);
        dream.val(data.dream);
        if (data.privacy === false) {
          postPrivacy.val("0")
        }

        else if (data.privacy === true) {
          postPrivacy.val("1")
        }
        console.log("Mood: " + data.mood)
        mood.val(data.mood)

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }

      else {
        window.location.href = "/my-dreams"
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/add-dream",
      data: post
    })
      .then(function() {
        window.location.href = "/my-dreams";
      });
  }
});
