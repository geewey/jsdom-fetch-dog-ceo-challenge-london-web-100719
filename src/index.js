document.addEventListener("DOMContentLoaded", () => {

    console.log('%c HI', 'color: firebrick');

    const dogImageContainer = document.getElementById('dog-image-container');
    const dogBreeds = document.getElementById('dog-breeds');
    const dogListItems = dogBreeds.getElementsByTagName("li")
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    let dropdown = document.getElementById('breed-dropdown');

    
    function createImage(object) {
        let imgUrlArray = object['message'];
        for (const imgUrl of imgUrlArray) {
            let span = document.createElement('span');
            span.innerHTML = `<img src="${imgUrl}" height="150" >`;
            dogImageContainer.append(span);
        }
    }

    function addBreed(object) {
        let breedUrlObject = object['message'];
        for (const key in breedUrlObject) {
            let li = document.createElement('li');
            li.innerHTML = `${key}`;
            dogBreeds.append(li);
        }
    }

    function printBreeds() {
        for (li of dogListItems) {
            li.addEventListener("click",function(e) {
                event.target.style.color = `rgb(${Math.random()  * 255},${Math.random()  * 255},${Math.random()  * 255})`;
            });
        }
    }

    function addFilterToBreeds() {
        dropdown.addEventListener("change", function(e) {
            let selected = dropdown.value;
            for (li of dogListItems) {
                if (li.innerText.slice(0,1) == selected) {
                    li.style.display = "";
                } else {
                    li.style.display = "none";
                };
            }
        })
    }

    fetch(imgUrl)
        .then(resp => resp.json())
        .then(imgObj => createImage(imgObj));

    fetch(breedUrl)
        .then(resp => resp.json())
        .then(breedObj => addBreed(breedObj))
        .then(printBreeds)
        .then(addFilterToBreeds);

})