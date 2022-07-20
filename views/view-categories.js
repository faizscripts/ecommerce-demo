const { printWishlistModal, printCartModal, wishlistButton, cartButton} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = 'Categories'

module.exports = ( {req, categories, wishlist, cart}) => {
    const renderedCategories = categories.map(
        category => {
            return `
               <li class="list-group-item" onclick="window.location.href='/${category._id}'">${category.category_name}</li> 
            `}
    ).join('')

    return layout({
        title: title,
        req: req,
        content: `

<ul class="list-group viewCat">
    ${renderedCategories}
</ul>

${printWishlistModal(req, wishlist)}
      
${printCartModal(req, cart)} 
  
        `})
}