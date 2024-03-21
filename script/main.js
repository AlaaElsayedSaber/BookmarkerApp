var siteNameInput = document.getElementById("site-name");
var siteUrlInput = document.getElementById("site-url");
var tableBody = document.getElementById("table-body");
var siteList = [];
var a ="text";

a.search()

var urlRegex = /^((ftp|http|https):\/\/)?(www\.)?([A-z]+)\.([A-z]{2,})/;
var nameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
if (window.localStorage.getItem("ourSites") != undefined) {
  siteList = JSON.parse(window.localStorage.getItem("ourSites"));
  displaySitesTable(siteList);
}
function addNewSite() {
    var urlValue;
  if (
    validationInput(siteNameInput, nameRegex) &
    validationInput(siteUrlInput, urlRegex)
  ) {
    if(siteUrlInput.value.search(/https|http|ftp/)==-1)
    {
        urlValue="https://".concat(siteUrlInput.value);
       
    }
    else{
        urlValue=siteUrlInput.value;
       
    }
    

    var siteInfo = {
      Name: siteNameInput.value,
      URL: urlValue,
    };
   

    siteList.push(siteInfo);
    resetInput();
    window.localStorage.setItem("ourSites", JSON.stringify(siteList));
    displaySitesTable(siteList);
  } else {
    window.alert(
      "Site Name or Url is not valid, Please follow the rules below :"
    );
  }
}
function displaySitesTable(arr) {
  var conatiner = ``;
  for (var i = 0; i < arr.length; i++) {
    conatiner += `
          <tr>
                <td >${i + 1}</td>
                <td >${arr[i].Name}</td>
                <td>
                  <button class=" btn  visit-btn">
                    <a href="${
                      arr[i].URL
                    }" class="text-decoration-none text-white"target="_blank" >
                      <i class=" fa-solid fa-eye pe-2"></i>
                       Visit
                    </a>
                   </button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteSite(${i})">
                        <i class="fa-solid fa-trash-can  pe-2"></i>
                         Delete
                    </button>
                </td>
            </tr>
        
        `;
  }
  tableBody.innerHTML = conatiner;
}
function resetInput() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}
function deleteSite(index) {
  siteList.splice(index, 1);
  displaySitesTable(siteList);
  window.localStorage.setItem("ourSites", JSON.stringify(siteList));
}
function validationInput(element, regex) {
  if (regex.test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
