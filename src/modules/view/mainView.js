class View {
  constructor() {}

  showContent() {
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    document.getElementById("LibContainer").append(clon);
  }
  
  dynamicDescription(e) {
    console.log(e.target);
    //fires func. that creates dom elem.
  }
};


export {View}