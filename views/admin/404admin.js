const layout = require('./layout');
const title = '404 Admin'

module.exports = ({err}) => {

    return layout({
        title: title,
        content: `
<section id="errorPage">

    <h2>${err}</h2>
    
</section>
`})
}