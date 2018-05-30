$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var userId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?dream_id=") !== -1) {
      userId = url.split("=")[1];
      getUserData(userId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var login_email = $("#login_email");
    var login_pw = $("login_pw");
    var first_name = $("#first_name");
    var last_name = $("#last_name");
    var username = $("#username");
    var user_email = $("#user_email");
    var user_pw = $("#user_password");
    var conf_pw = $("#confirm_password")
    var sign_up = $("#sign_up");
    // Giving the postCategorySelect a default value
    // postCategorySelect.val("Personal");
    // Adding an event listener for when the form is submitted
    $(sign_up).on("submit", function submitNewUser(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!login_email.val().trim() || !login_pw.val().trim() || !first_name.val().trim() || !last_name.val().trim() || !username.val().trim() || !user_email.val().trim() || !user_pw.val().trim() || !conf_pw.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newUser = {
        firstName: first_name.val().trim(),
        lastName: last_name.val().trim(),
        email: login_email.val().trim(),
        password: user_pw.val().trim()
      };
  
      console.log(newUser);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newUser.id = postId;
        updatePost(newPost);
      }
      else {
        submitNewUser(newUser);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitNewUser(User) {
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
  