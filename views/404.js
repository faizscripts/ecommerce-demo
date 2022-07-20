const { printWishlistModal, printCartModal} = require('../middlewares/otherFunctions');
const layout = require('./layout');
const title = '404'

module.exports = ({req, wishlist, cart, err}) => {

    return layout({
        title: title,
        req: req,
        content: `
<!--Cases Main-->
<section id="errorPage">

    <h2>${err}</h2>
    
</section>

${printWishlistModal(req, wishlist)}
      
${printCartModal(req, cart)} 
  
        `})
}