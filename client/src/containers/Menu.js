import React, { useState } from 'react';
import "./Menu.css";
import Categories from '../components/Categories';
import MenuItems from '../components/MenuItems';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const Menu = () => {
    const products = useSelector((state) => state.products);
    const allCategories = ["all", ...new Set(products.map((item) => item.product_category))];

    const [menuItems, setMenuItems] = useState(products);
    const [activeCategory, setActiveCategory] = useState("all");
    const [categories, setCategories] = useState(allCategories);
  
    const filterItems = (category) => {
      setActiveCategory(category);
      if (category === "all") {
        setMenuItems(products);
        return;
      }
      const newItems = products.filter((item) => item.product_category === category);
      setMenuItems(newItems);
    };

  return (
    <main>
      <Header />
      <br /> <br />
      <section className="menu section">
        {/* <div className="title">
          <h2>Menu List</h2>
          <div className="underline"></div>
        </div> */}
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
        />
        <MenuItems items={menuItems} />
      </section>
    </main>
  )
}

export default Menu