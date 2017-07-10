function initMovies(){var e;$.getJSON("src/omdb_id.json").then(function(t){moviesArray=t.movies,e=randomMovies(),displayDescriptionBox(moviesArray[e],"JSON"),displayVideoBoxes(moviesArray)})}function randomMovies(){return Math.floor(45*Math.random())}function searchMovie(e,t){var o,i;return"ID"===e?i="?i=":"Title"===e&&(i="?t="),requestURl="https://www.omdbapi.com/"+i+t+"&apikey=3a2d81a4",$.ajax({url:requestURl,type:"GET",dataType:"json",async:!1,success:function(e){o=e}}),o}function displayDescriptionBox(e,t){var o;"JSON"===t?o=searchMovie("ID",e.id):"OMDB"===t&&(o=searchMovie("ID",e.imdbID)),$(".filmTitle").text(o.Title),$(".filmDescriptionP1").text(o.Plot.slice(0,100)),$(".filmDescriptionP2").text(o.Plot.slice(100,o.Plot.length)),$(".filmGenre").text(o.Genre),$(".filmDirector").text(o.Director),$(".filmWriter").text(o.Writer),$(".filmActors").text(o.Actors),$(".filmAwards").text(o.Awards),$(".filmRating").text(o.imdbRating),$(".filmYear").text(o.Year),$(".filmRuntime").text(o.Runtime),$(".filmPoster").attr("src",o.Poster),$(".btnWatchVideo").attr("data-video-id","_KJHRF6RlTQ"),$(".btnShowIMDB").attr("data-url","http://www.imdb.com/title/"+o.imdbID+"/"),$("#videoBackground").attr("poster",o.Poster)}function displayVideoBoxes(e){var t,o;for(i=0;i<e.length;i++)t="",t+='<div class="videoBox">',t+='<img src="'+(o=searchMovie("ID",e[i].id)).Poster+'">',t+='<i class="fa fa-play-circle"></i>',t+="<p>"+o.Title+"</p>",t+="</div>",$(".videoBoxes").append(t);setVideoRows(4)}function eventListenerVideoBox(){var e;btnShowIMDB.addEventListener("click",function(){window.open($(".btnShowIMDB").attr("data-url"))}),menuSearch.addEventListener("click",function(){expandedBox.value=""}),menuSearch.addEventListener("mouseenter",function(){menuSearchDisplay("show")}),menuSearch.addEventListener("mouseleave",function(){menuSearchDisplay("hide")}),menuSearch.addEventListener("keyup",function(e){13==(e.which||e.keyCode)&&(scrollViewTo("#heroImage"),hamburgerMenu(),searchInput(expandedBox.value),menuSearchDisplay("hide"))}),window.addEventListener("keydown",function(t){t.preventDefault(),27==(t.which||t.keyCode)&&(modal.removeClass("modalOpen"),e.pause()),32==(t.which||t.keyCode)&&(!0===e.paused()?e.play():e.pause())}),closeModal.addEventListener("click",function(){modal.removeClass("modalOpen"),e.pause()}),btnWatchVideo.addEventListener("click",function(){var t=$(".btnWatchVideo").attr("data-video-id"),o=$("#modalVideo");modal.addClass("modalOpen"),o.find("source").attr("src","https://www.youtube.com/watch?v="+t),(e=videojs("modalVideo")).ready(function(){e.currentTime(5),e.volume(.5),e.play()}),e.on("ended",function(){modal.removeClass("modalOpen")})})}function menuSearchDisplay(e){"show"==e?(smallBox.style.display="none",expandedBox.style.display="block",menuSearch.classList.add("mouseSearchClick")):"hide"==e&&(smallBox.style.display="block",expandedBox.style.display="none",menuSearch.classList.remove("mouseSearchClick")),expandedBox.value="Wpisz film"}function searchInput(e){displayDescriptionBox(searchMovie("Title",e),"OMDB")}var btnWatchVideo=document.querySelector(".btnWatchVideo"),btnShowIMDB=document.querySelector(".btnShowIMDB"),menuSearch=document.querySelector(".menuSearch"),expandedBox=document.querySelector(".expandedBox"),smallBox=document.querySelector(".smallBox"),closeModal=document.querySelector(".fa-window-close-o"),modal=$(".modalBackground");initMovies(),eventListenerVideoBox();