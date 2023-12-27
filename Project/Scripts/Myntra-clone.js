let itemInBag;
onload();

function onload() {
  let itemInBagstr = localStorage.getItem('bagItems');
  itemInBag = itemInBagstr ? JSON.parse(itemInBagstr) : [];
  homePagefunction();
  bagItemCount();
}

function addToBag(itemId) {
  itemInBag.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(itemInBag));
  bagItemCount();
}


function bagItemCount(){
  let bagCountElement = document.querySelector('.bag-count');
  bagCountElement.style.visibility = 'hidden';
  if (itemInBag.length > 0) {
    bagCountElement.style.visibility = 'visible';
    bagCountElement.innerText = itemInBag.length;
  } else {
    bagCountElement.style.visibility = 'hidden';
  }
}

function homePagefunction() {

  let itemContainerElement = document.querySelector('.items-container');

  
  if(!itemContainerElement){
    return;
  }

  let innerhtml = ''

  items.forEach(item => {
    console.log(itemContainerElement);
    innerhtml+=`<div class="item-container">
          <img class="image-item" src=${item.image} alt="item-image">
          <div class="item-rating">
            ${item.rating.stars} ⭐ | ${item.rating.count}
          </div>
          <div class="item-name">${item.company}</div>
          <div class="item-desc">${item.item_name}</div>
          <div class="item-pricing">
            <span class="Current-Price">Rs ${item.pricing.current_price}</span>
            <span class="Original-Price">Rs ${item.pricing.original_price}</span>
            <span class="discount">(${item.pricing.discount_percentage}% OFF)</span>
          </div>
          <button class="Bag-add-btn" onclick="addToBag(${item.id})">Add to Bag</button>
      </div>`
  })

  itemContainerElement.innerHTML = innerhtml;
}



