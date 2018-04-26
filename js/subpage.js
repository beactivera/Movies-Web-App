let urlParams = new URLSearchParams(window.location.search);

let id =urlParams.get('id');
console.log('I want to get to article '+ id);

fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/films?_embed/'+id).then(e =>e.json).then(showSinglePost);

function showSinglePost(aPost){
    console.log(aPost);
    document.querySelector('#singleMovie h1').textContent = aPost.title.rendered;
    
    // show carsection
    document.querySelector('#singleMovie').classList.add('slideInMovie')
}
