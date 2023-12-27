let totalMrp = 0;
let discountPrice = 0;
let convenienceFee = 99;
let TotalAmount = 0;
onload();


function onload() {
  cartitems();
  itemCartsummary();
  CartBagSummary();
}

function CartBagSummary() {
  let bagSummaryele = document.querySelector('.bag-summary');
  bagSummaryele.innerHTML = displayBagSummary();
  console.log(totalMrp);
  console.log(discountPrice);
}

function cartitems() {
  itemInBagArry = itemInBag.map(itemId => {
    for(let i = 0; i<=items.length; i++){
      if(itemId == items[i].id) {
        return items[i];
      }
    }
  });
  
}

function itemCartsummary() {
  let itemCartsummaryElement = document.querySelector('.bag-items-container');
  itemCartsummaryElement.innerHTML = displaycartItems();
}

function displayBagSummary() {
  let baginnerhtml = '';
  TotalAmount = (totalMrp-discountPrice)+convenienceFee;
  baginnerhtml+= `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${itemInBag.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${discountPrice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹${convenienceFee}</span>
            </div>
            <hr>
              <div class="price-footer">
                <span class="price-item-tag">Total Amount</span>
                <span class="price-item-value">₹ ${TotalAmount}</span>
              </div>
            </div>
            <button class="btn-place-order">
              <div class="css-xjhrni">PLACE ORDER</div>
            </button>
        </div>
  `

  return baginnerhtml;
}

function removeFromBag(itemsId) {
  itemInBag = itemInBag.filter(itemElement => itemElement != itemsId);
  localStorage.setItem('bagItems', JSON.stringify(itemInBag));
  totalMrp = 0;
  discountPrice = 0;
  convenienceFee = 99;
  TotalAmount = 0;
  cartitems();
  itemCartsummary();
  bagItemCount();
  displayBagSummary();
  CartBagSummary();

  
}

function displaycartItems() {
  let innerhtml = '';
  itemInBagArry.forEach(element => {
    let mrp = element.pricing.original_price;
    let discount = 100-element.pricing.discount_percentage;
    originalmrp = mrp*discount/100;
    discountPrice+=Math.round(originalmrp);
    totalMrp+=mrp;
    innerhtml+= `
    <div class="bag-item-container">
        <div class="item-left-part">
          <img class="bag-item-img" src="/${element.image}">
        </div>
        <div class="item-right-part">
          <div class="company">${element.company}</div>
          <div class="item-name">${element.item_name}</div>
          <div class="price-container">
            <span class="current-price">Rs ${element.pricing.current_price}</span>
            <span class="original-price">Rs ${element.pricing.original_price}</span>
            <span class="discount-percentage">(${element.pricing.discount_percentage}% OFF)</span>
          </div>
          <div class="return-period">
            <span class="return-period-days">${element.return_period} days</span> return available
          </div>
          <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${element.delivery_date}</span>
          </div>
        </div>

       <div class="remove-from-cart" onclick = "removeFromBag(${element.id});">X</div>
    </div>
    `
  });

  return innerhtml;
}