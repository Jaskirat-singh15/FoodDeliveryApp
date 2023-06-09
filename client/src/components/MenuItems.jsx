import React from 'react'

const MenuItems = ( { items } ) => {
    return (
        <div className="section-center">
          {items.map((item) => {
            const { productId, imageURL, product_price, product_name } = item;
            return (
              <article key={productId} className="menu-item">
                <img src={imageURL} alt={product_name} className="photo" />
                <div className="item-info">
                  <header>
                    <h4>{product_name}</h4>
                    <h4 className="price">₹{product_price}</h4>
                  </header>
                  <p className="item-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, eveniet.</p>
                </div>
              </article>
            );
          })}
        </div>
      );
}

export default MenuItems