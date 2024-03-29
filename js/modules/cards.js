function cards() {
  class Menu {
    constructor(img, alt, title, descr, price, selector, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(selector);
      this.transfer = 36.94;
      this.changeToUAH();
      this.render();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
       <img src=${this.img} alt=${this.alt} />
       <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
       <div class="menu__item-descr">${this.descr}</div>
       <div class="menu__item-divider"></div>
       <div class="menu__item-price">
           <div class="menu__item-cost">Цена:</div>
           <div class="menu__item-total"><span>${Math.floor(
             this.price
           )}</span> грн/день</div>
       </div>
     `;
      this.parent.append(element);
    }
  }

  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Menu(img, altimg, title, descr, price, '.menu .container');
    });
  });
}

export default cards;
