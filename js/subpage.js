let urlParams = new URLSearchParams(window.location.search);

let id =urlParams.get('id');
console.log('I want to get to article '+ id);

fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/films/'+id+'?_embed').then(e => e.json()).then(showSinglePost);

function showSinglePost(aPost){
    console.log(aPost);
    document.querySelector('#singleMovie h1').textContent = aPost.title.rendered;
 document.querySelector("img").setAttribute("src", aPost._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
    document.querySelector('#singleMovie h2').textContent = aPost.acf.genre;
    document.querySelector('#singleMovie span').textContent =aPost.acf.price;
    document.querySelector('#singleMovie .date').textContent = aPost.acf.data;
    document.querySelector('#singleMovie .location').textContent = aPost.acf.location;
    document.querySelector('#singleMovie .descript').innerHTML = aPost.content.rendered;
    if(aPost.acf.price >0){
        document.querySelector('#singleMovie .buy').style.display = "block";
    }
}
