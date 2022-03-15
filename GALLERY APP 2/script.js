(function () {
  let saveAlbum = document.querySelector("#saveAlbum");
  let addAlbum = document.querySelector("#addAlbum");
  let importAlbum = document.querySelector("#importAlbum");
  let exportAlbum = document.querySelector("#exportAlbum");
  let deleteAlbum = document.querySelector("#deleteAlbum");
  let playAlbum = document.querySelector("#playAlbum");
  let selectAlbum = document.querySelector("#selectAlbum");
  let allTemplate = document.querySelector("#allTemplate");
  let overlay = document.querySelector("#overlay");
  let contentDetailOverlay = document.querySelector("#content-details-overlay");
  let newSlide = document.querySelector("#new-Slide");
  let createSlide = document.querySelector("#create-slide");
  let showSlide = document.querySelector("#show-slide");
  let txtSlideImage = document.querySelector("#textSlideImage");
  let txtSlideTitle = document.querySelector("#textSlideTitle");
  let txtSlideDesc = document.querySelector("#textSlideDesc");
  let btnSaveSlide = document.querySelector("#btnSaveSlide");
  let slideList = document.querySelector("#Slide-list");
  let uploadFile = document.querySelector("#uploadFile");
  let playOverlay = document.querySelector("#play-overlay");

  let albums = []; // array to store albums

  addAlbum.addEventListener("click", handleAddAlbum);
  selectAlbum.addEventListener("change", handleSelectAlbum);
  newSlide.addEventListener("click", handleCreateSlide);
  btnSaveSlide.addEventListener("click", handleSaveSlide);
  saveAlbum.addEventListener("click", saveToLocalStorage);
  deleteAlbum.addEventListener("click", handleDeleteAlbum);
  exportAlbum.addEventListener("click", handleExportAlbum);
  importAlbum.addEventListener("click", function () {
    uploadFile.click();
  });

  uploadFile.addEventListener("change", handleImportAlbum);
  playAlbum.addEventListener("click", handlePlayAlbum);

  //   To Handle add Album to page
  function handleAddAlbum() {
    let albumName = prompt("Please enter new album name");

    // If user pressed cancel
    if (albumName == null) {
      return;
    }

    //if user enter nothing and pressed ok
    albumName = albumName.trim();
    if (!albumName) {
      alert("Please enter an album name");
    }

    //if album name already exists
    let exists = albums.some((a) => a.name == albumName);
    if (exists) {
      alert(albumName + " Already exists , Please enter a new name");
      return;
    }

    let album = {
      name: albumName,
      selected: false,
      slides: [],
    };

    albums.push(album);

    let optionTemplate = allTemplate.content.querySelector(
      "[purpose='new-album']"
    );

    let newAlbumOption = document.importNode(optionTemplate, true);
    newAlbumOption.setAttribute("value", albumName);
    newAlbumOption.innerHTML = albumName;
    selectAlbum.appendChild(newAlbumOption);

    selectAlbum.value = albumName;
    selectAlbum.dispatchEvent(new Event("change"));
  }

  // To Handle page change when we select an Album
  function handleSelectAlbum() {
    if (this.value == "-1") {
      overlay.style.display = "block"; // it will show the element
      contentDetailOverlay.style.display = "none";
      createSlide.style.display = "none";
      showSlide.style.display = "none";
      slideList.innerHTML = "";
    } else {
      overlay.style.display = "none"; //it will hide the overlay
      contentDetailOverlay.style.display = "block";
      createSlide.style.display = "none";
      showSlide.style.display = "none";

      let album = albums.find((a) => a.name == selectAlbum.value);
      slideList.innerHTML = "";
      for (let i = 0; i < album.slides.length; i++) {
        let slideTemplate = allTemplate.content.querySelector(".slide");
        let slide = document.importNode(slideTemplate, true);

        slide.querySelector(".title").innerHTML = album.slides[i].title;
        slide.querySelector(".desc").innerHTML = album.slides[i].desc;
        slide
          .querySelector("#slide-img")
          .setAttribute("src", album.slides[i].url);
        slide.addEventListener("click", handleSlideClick);

        album.slides[i].selected = false;

        slideList.append(slide);
      }
    }
  }

  // To Download JSON file of selected album
  function handleExportAlbum() {
    if (selectAlbum.value == "-1") {
      alert("Please Select an Album to Export");
      return;
    }
    // For downloading first we have to find the album
    let album = albums.find((a) => a.name == selectAlbum.value);

    // converting to JSON
    let albumJson = JSON.stringify(album);

    // it is compulsory to encode Json data
    let encodedJSON = encodeURIComponent(albumJson);

    // create an anchor tag -> set attribute download with file name ->  href attribute with below data
    let a = document.createElement("a");
    a.setAttribute("Download", album.name + ".json");
    a.setAttribute("href", "data:text/plain;charset=utf-8, " + encodedJSON);

    // click on that anchor tag by JS
    a.click();
  }

  // To Import an Album and append it's slides to slidelist
  function handleImportAlbum() {
    if (selectAlbum.value == "-1") {
      alert("Select an Album to Import Data");
      return;
    }

    let file = window.event.target.files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      let data = window.event.target.result;
      let ImportedAlbum = JSON.parse(data);

      let album = albums.find((a) => a.name == selectAlbum.value);
      album.slides = album.slides.concat(ImportedAlbum.slides);

      slideList.innerHTML = "";
      for (let i = 0; i < album.slides.length; i++) {
        let slideTemplate = allTemplate.content.querySelector(".slide");
        let slide = document.importNode(slideTemplate, true);

        slide.querySelector(".title").innerHTML = album.slides[i].title;
        slide.querySelector(".desc").innerHTML = album.slides[i].desc;
        slide
          .querySelector("#slide-img")
          .setAttribute("src", album.slides[i].url);
        slide.addEventListener("click", handleSlideClick);

        album.slides[i].selected = false;

        slideList.append(slide);
      }
    });

    reader.readAsText(file);
  }

  function handleDeleteAlbum() {
    if (selectAlbum.value == "-1") {
      alert("Please Select an Album to Delete");
      return;
    }

    let res = confirm("Do You Want to Delete this Album");
    if (!res) {
      return;
    }
    // removal from HTML (RAM)
    selectAlbum.remove(selectAlbum.selectedIndex);

    // removal from album object (Storage)
    let aidx = albums.findIndex((a) => a.name == selectAlbum.value);
    albums.splice(aidx, 1);

    selectAlbum.value = "-1";
    selectAlbum.dispatchEvent(new Event("change"));
  }

  // function to play slide show
  function handlePlayAlbum() {
    if (selectAlbum.value == "-1") {
      alert("Please Select an Album to Play");
      return;
    }

    playOverlay.style.display = "block";
    playOverlay.querySelector("#text").innerHTML = "Playing Album...";

    let album = albums.find((a) => a.name == selectAlbum.value);

    let counter = album.slides.length;
    let i = 0;
    let id = setInterval(() => {
      if (i < counter) {
        slideList.children[i].click();
        playOverlay.querySelector("#text").innerHTML = "Showing Album " + (i + 1);
        i++;
      } else if (i == counter) {
        clearInterval(id);
        playOverlay.style.display = "none";
      }
    }, 1000);
  }

  function handleCreateSlide() {
    overlay.style.display = "none";
    contentDetailOverlay.style.display = "none";
    createSlide.style.display = "block";
    showSlide.style.display = "none";

    txtSlideImage.value = "";
    txtSlideTitle.value = "";
    txtSlideDesc.value = "";

    btnSaveSlide.setAttribute("purpose", "create");
  }

  function handleSaveSlide() {
    let url = txtSlideImage.value;
    let title = txtSlideTitle.value;
    let desc = txtSlideDesc.value;

    if (this.getAttribute("purpose") == "create") {
      let slideTemplate = allTemplate.content.querySelector(".slide");
      let slide = document.importNode(slideTemplate, true);

      slide.querySelector(".title").innerHTML = title;
      slide.querySelector(".desc").innerHTML = desc;
      slide.querySelector("#slide-img").setAttribute("src", url);
      slide.addEventListener("click", handleSlideClick);

      slideList.append(slide);
      let album = albums.find((a) => a.name == selectAlbum.value);
      album.slides.push({
        title: title,
        desc: desc,
        url: url,
      });
      slide.dispatchEvent(new Event("click"));
    } else {
      let album = albums.find((a) => a.name == selectAlbum.value);
      let slideToUpdate = album.slides.find((s) => s.selected == true);

      let slideDivToUpdate;
      for (let i = 0; i < slideList.children.length; i++) {
        let slideDiv = slideList.children[i];
        if (slideDiv.querySelector(".title").innerHTML == slideToUpdate.title) {
          slideDivToUpdate = slideDiv;
          break;
        }
      }

      // update in HTML
      slideDivToUpdate.querySelector(".title").innerHTML = title;
      slideDivToUpdate.querySelector(".desc").innerHTML = desc;
      slideDivToUpdate.querySelector("img").setAttribute("src", url);

      // update in slides array
      slideToUpdate.title = title;
      slideToUpdate.desc = desc;
      slideToUpdate.url = url;

      slideDivToUpdate.dispatchEvent(new Event("click"));
    }
  }

  function handleSlideClick() {
    overlay.style.display = "none";
    contentDetailOverlay.style.display = "none";
    createSlide.style.display = "none";
    showSlide.style.display = "block";

    showSlide.innerHTML = "";

    let slideInViewTemplate =
      allTemplate.content.querySelector(".slide-in-view");
    let slideInView = document.importNode(slideInViewTemplate, true);

    slideInView.querySelector(".title").innerHTML =
      this.querySelector(".title").innerHTML;
    slideInView.querySelector(".desc").innerHTML =
      this.querySelector(".desc").innerHTML;
    slideInView
      .querySelector("#slide-img")
      .setAttribute(
        "src",
        this.querySelector("#slide-img").getAttribute("src")
      );

    showSlide.append(slideInView);
    slideInView
      .querySelector("[purpose=edit]")
      .addEventListener("click", handleEditSlideClick);
    slideInView
      .querySelector("[purpose=delete]")
      .addEventListener("click", handleDeleteSlideClick);

    let album = albums.find((a) => a.name == selectAlbum.value);

    for (let i = 0; i < album.slides.length; i++) {
      if (album.slides[i].title == this.querySelector(".title").innerHTML) {
        album.slides[i].selected = true;
      } else {
        album.slides[i].selected = false;
      }
    }
  }

  function handleEditSlideClick() {
    overlay.style.display = "none"; // it will show the element
    contentDetailOverlay.style.display = "none";
    createSlide.style.display = "block";
    showSlide.style.display = "none";

    let album = albums.find((a) => a.name == selectAlbum.value);
    let slide = album.slides.find((s) => s.selected == true);

    txtSlideTitle.value = slide.title;
    txtSlideDesc.value = slide.desc;
    txtSlideImage.value = slide.url;

    btnSaveSlide.setAttribute("purpose", "update");
  }

  function handleDeleteSlideClick() {
    let album = albums.find((a) => a.name == selectAlbum.value);
    let sidx = album.slides.findIndex((s) => s.selected == true);

    let slideDivTBD;
    for (let i = 0; i < slideList.children.length; i++) {
      let slideDiv = slideList.children[i];
      if (
        slideDiv.querySelector(".title").innerHTML == album.slides[sidx].title
      ) {
        slideDivTBD = slideDiv;
        break;
      }
    }

    let res = confirm(
      "Do You Want to Delete Slide " + album.slides[sidx].title
    );
    if (!res) {
      return;
    }

    slideList.removeChild(slideDivTBD); // removing from HTML (Ram removal)
    album.slides.splice(sidx, 1); // removing from slides object (Storage removal)
    overlay.style.display = "none";
    contentDetailOverlay.style.display = "block";
    createSlide.style.display = "none";
    showSlide.style.display = "none";
  }

  function saveToLocalStorage() {
    let albumJSon = JSON.stringify(albums);
    localStorage.setItem("data", albumJSon);

    alert("Data saved Successfully");
  }

  function loadFromStorage() {
    let albumsJson = localStorage.getItem("data");
    if (!albumsJson) {
      // if albums array is emty then return
      return;
    }

    albums = JSON.parse(albumsJson); // converting json to object again

    for (let i = 0; i < albums.length; i++) {
      let optionTemplate = allTemplate.content.querySelector(
        "[purpose='new-album']"
      );
      let newAlbumOption = document.importNode(optionTemplate, true);
      newAlbumOption.setAttribute("value", albums[i].name);
      newAlbumOption.innerHTML = albums[i].name;
      selectAlbum.appendChild(newAlbumOption);

      selectAlbum.value = "-1";
    }
  }

  loadFromStorage();
})();

// IIFE is used to avoid namespace collision
