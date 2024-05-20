const q = console.log;

let noUser = true;
const searchItem = document.getElementById("searchName");

document
  .getElementById("searchName")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter" && searchItem.value !== "") {
      searchUser(searchItem.value);
    }
  });

async function searchUser(name) {
  try {
    const response = await axios.get(`https://api.github.com/users/${name}`);
    let data = response.data;
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("main").innerHTML = `<div id="img" class="mainPart">
    <div class="img"></div>
</div>
<div id="info" class="info mainPart">
    <h2 id="name"></h2>
    <p></p>
    <div class="nums">
        <div id="followers" class="followers item1"></div>
        <div id="following" class="following item1"></div>
        <div id="repos" class="repos item1"></div>
    </div>
    <div id="reposes">
          </div>

</div>`;

    // if (noUser) {
    //   document.getElementById("img").style;
    // }

    if (data.name !== null) {
      document.getElementById("name").innerText = `${data.name}`;
    } else {
      document.getElementById("name").innerText = `${data.login}`;
    }

    if (data.bio !== null) {
      document.querySelector("p").innerText = `${data.bio}`;
    } else if (data.location !== null) {
      document.querySelector("p").innerText = `${data.location}`;
    } else {
      document.querySelector("p").innerText = "...";
    }

    document.getElementById(
      "followers"
    ).innerText = `${data.followers} Followers`;
    document.getElementById(
      "following"
    ).innerText = `${data.following} Following`;
    document.getElementById("repos").innerText = `${data.public_repos} Repos`;

    document.getElementsByClassName(
      "img"
    )[0].style = `background-image: url("${data.avatar_url}")`;

    noUser = false;
    q(data.avatar_url);
    // return data;
  } catch (error) {
    noUser = true;
    document.getElementById("main").innerHTML =
      "<h1>No Profile With This Username!</h1>";
  }

  try {
    const response1 = await axios.get(
      `https://api.github.com/users/${name}/repos`
    );
    let reposArray = response1.data;
    if (reposArray.length >= 5) {
      document.getElementById("reposes").innerHTML = `
    <div class="item">${reposArray[reposArray.length - 1].name}</div>
    <div class="item">${reposArray[reposArray.length - 2].name}</div>
    <div class="item">${reposArray[reposArray.length - 3].name}</div>
    <div class="item">${reposArray[reposArray.length - 4].name}</div>
    <div class="item">${reposArray[reposArray.length - 5].name}</div>
    `;
    } else {
      for (let i = 0; i < reposArray.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerText = `${reposArray[reposArray.length - i - 1].name}`;
        document.getElementById("reposes").appendChild(newDiv);
      }
    }
    // q(reposArray[reposArray.length - 1].name);
  } catch (error) {
    q("no repo!");
  }
}

// async function getrepos(name) {
//   try {
//     const response = await axios.get(
//       `https://api.github.com/users/${name}/repos`
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
