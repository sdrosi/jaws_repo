$(document).ready(function () {
  //dream container that holds all dreams posted.
  var dreamContainer = $("#dream-container");
  // Points to the dropdown menu for selecting what privacy setting to query 
  var privacySetting = $("#privacy");
  //click events for the edit and delete button
  $(document).on("click", "td.button-delete", handleDreamsDelete);
  $(document).on("click", "td.button-edit", handleDreamsEdit);
  privacySetting.on("change", handlePrivacyChange);
  var dreams;

  // This function grabs dreams from the database and updates the view
  function getDreams(privacy_setting) {
    var privacyString = privacy_setting || "";
    if (privacyString) {
      privacyString = "/privacy/" + privacyString;
      console.log("Privacy String:" + privacyString)
    }
    $.get("/my-feed" + privacyString, function (data) {
      console.log("Dreams", data);
      dreams = data;
      if (!dreams || !dreams.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }


  // This function does an API call to delete dreamss
  function deleteDream(id) {
    $.ajax({
      method: "DELETE",
      url: "/delete-dream/" + id
    })
      .then(function () {
        getDreams(privacySetting.val());
      });
  }

  // Getting the initial list of dreams
  getDreams();

  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    dreamContainer.empty();
    var dreamsToAdd = [];
    for (var i = 0; i < dreams.length; i++) {
      dreamsToAdd.push(createNewRow(dreams[i]));
      console.log(dreams[i])
    }
    dreamContainer.append(dreamsToAdd);
  }

  // This function constructs a dream's HTML
  function createNewRow(dream) {
    console.log(dream.polarity);
    var dreamPrivacy;
    if (dream.privacy === true) {
      dreamPrivacy = "Private"
    }
    else if (dream.privacy === false) {
      dreamPrivacy = "Public"
    }
    var polcon = dream.polarity_confidence;
    var formattedPolCon = (parseFloat(polcon)*100).toFixed(1)
    console.log(typeof(dream.polarity_confidence));

    var newDreamCard = $("<tr>");
    newDreamCard.addClass("card");

    var newDreamCardHeading = $("<td>");
    newDreamCardHeading.addClass("card-header");

    var deleteBtn = $("<td><button>");
    deleteBtn.text("X");
    deleteBtn.addClass("button-delete is-danger");

    var editBtn = $("<td><button is-primary is-inverted>");
    editBtn.text("EDIT");
    editBtn.addClass("button-edit is-dark");

    var newDreamTitle = $("<td>");
    newDreamTitle.addClass("newPostTitle");

    var newDreamDate = $("<td>");
    newDreamDate.addClass("dream-date")

    var newDreamPolarity = $("<td>");
    newDreamPolarity.text("Polarity: " + dream.polarity);
    newDreamPolarity.addClass("polarity")

    var newDreamPolarityConfidence = $("<td>");
    newDreamPolarityConfidence.text("Polarity Confidence: " + formattedPolCon + "%");
    newDreamPolarityConfidence.addClass("polarity_confidence")

    var newDreamCategory = $("<td>");
    newDreamCategory.text("Dream Privacy: " + dreamPrivacy);
    newDreamCategory.addClass("dream-category")

    var newDreamCardBody = $("<td>");
    newDreamCardBody.addClass("card-body");

    var newDreamBody = $("<td>");
    newDreamBody.addClass("dream-body");

    newDreamTitle.text(dream.title + " ");

    newDreamBody.text(dream.dream);

    var formattedDate = new Date(dream.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newDreamDate.text(formattedDate);

    // newPostTitle.append(newPostDate);

    newDreamCardHeading.append(deleteBtn);
    newDreamCardHeading.append(editBtn);
    // newPostCardHeading.append(newPostTitle);
    newDreamCardHeading.append(newDreamCategory);
    newDreamCardHeading.append(newDreamDate);
    newDreamCardHeading.append(newDreamPolarity);
    newDreamCardHeading.append(newDreamPolarityConfidence);


    newDreamCardBody.append(newDreamTitle);
    newDreamCardBody.append(newDreamBody);

    newDreamCard.append(newDreamCardHeading);
    newDreamCard.append(newDreamCardBody);
    newDreamCard.data("dream", dream);

    return newDreamCard;
  }

  // This function figures out which dream we want to delete and then calls
  // deletePost
  function handleDreamsDelete() {
    var currentDream = $(this)
    .parent()
    .parent()
    .data("dream");
    deleteDream(currentDream.id);
  }
  // This function figures out which dream we want to edit and takes it to the
  // Appropriate url
  function handleDreamsEdit() {
    var currentDream = $(this)
      .parent()
      .parent()
      .data("dream");
    window.location.href = "/new-dream?dream_id=" + currentDream.id;
  }

  // This function displays a message when there are no dreams
  function displayEmpty() {
    dreamContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new dream.");
    dreamContainer.append(messageH2);
  }

  // This function handles reloading new dreams when the category changes
  function handlePrivacyChange() {
    var newDreamCategory = $(this).val();
    getDreams(newDreamCategory);
  }

});

