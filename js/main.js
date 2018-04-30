let template = document.querySelector("#movietemp").content;
let musiclist = document.querySelector("#movielist");
let page = 1;
let lookingForData = false;

function fetchMovie(){
  lookingForData=true;
    
    let urlParams = new URLSearchParams(window.location.search);

    let catid =urlParams.get('categories');
    let endpoint = 'http://wilmakorpinen.com/wp00/wp-json/wp/v2/films?_embed&per_page=2&page='+page;
    if(catid){ // DRY
     endpoint = "http://wilmakorpinen.com/wp00/wp-json/wp/v2/films?_embed&per_page=2&page="+page+'&categories='+ catid;
    }
    fetch(endpoint)
    .then(e => e.json())
    .then(showMovie);
}

function showMovie(data){
  //console.log(data)
  lookingForData=false;
  data.forEach(showSingleMovie);
}

function showSingleMovie(aMovie){
  let clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = aMovie.title.rendered;
  clone.querySelector(".price span").textContent=aMovie.acf.price;
  clone.querySelector(".weekday").textContent = aMovie.acf.weekday;

    let month = aMovie.acf.data.substring(0, 2);
    var day = aMovie.acf.data.substring(2, 4);
    var year = aMovie.acf.data.substring(4, 8);

    clone.querySelector(".date").textContent = month + "" + day + "" + year;

  if(aMovie._embedded["wp:featuredmedia"]){//img is there
     clone.querySelector("img").setAttribute("src", aMovie._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  } else { // no img
      clone.querySelector("img").remove()
  }

  clone.querySelector('.readmore').href = 'subpages.html?id=' + aMovie.id;

  movielist.appendChild(clone);
}
fetchMovie();


//found this stuff online
setInterval(function(){

  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchMovie();
  }
}, 1000)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight-20
  return bottomOfPage || pageHeight < visible
}