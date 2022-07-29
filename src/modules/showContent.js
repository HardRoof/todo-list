function showContent() {
  let temp = document.getElementsByTagName("template")[0];
  let clon = temp.content.cloneNode(true);
  document.getElementById("LibContainer").append(clon)
}

function showCheck(e) {
  console.log(e.target);
  if (e.target.classList.contains('unchecked')) {
    e.target.classList.toggle("checked");
  }
}

export {showContent, showCheck}