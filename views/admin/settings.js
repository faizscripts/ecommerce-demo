const layout = require('./layout');
const title = 'Settings'

module.exports = () => {

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <h3 class="m-3">At settings page</h3>
</div>`
    })
}