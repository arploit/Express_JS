let root = document.getElementById("root");

const getAPIResponse = async () => {
  let response = await fetch("http://localhost:3000/", {});
  //   console.log("response", await response.text());
  root.innerText = await response.text();
};

getAPIResponse();
