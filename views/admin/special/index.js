const layout = require('../layout');
const title = 'View Special'

module.exports = ({specials}) => {
    const renderedSpecials = specials.map(
        special => {
            return `<tr>
    <td class="view_table_name"><a href="/admin/products/special/${special._id}">${special.special_name}</a></td>
    <td>${special.unitsSold}</td>
    <td>${special.income}</td>
    <td>
        <div>
                <a href="/admin/special/edit/${special._id}"><i class="far fa-edit"></i></a>

        <div  class="deleteForm ms-4">
            <button type="button" data-bs-toggle="modal" data-bs-target="#_${special._id}" class="formBtn">
            <i class="far fa-trash-alt "></i>
            </button>
        </div>
        
        <div class="modal fade" id="_${special._id}" tabindex="-1" aria-labelledby="specialModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <form method="POST" >
                    <div class="modal-body">
                        <p><b>WARNING!</b> Deleting a special category will affect all the products in this category</p>
                        <p><b>DELETE</b> ${special.special_name}?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button class="btn btn-danger" type="submit" formaction="/admin/special/delete/${special._id}">Confirm</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
    </td>
</tr>
            `}).join('')

    const printAddButton = (specials) => {
        if (specials.length<=2){
            return `<button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/special/new'">Add New Special Category</button>`
        } else return ""
    }

    return layout({
        title: title,
        content: `<div id="viewProducts" class="card ">
        <div class="d-flex justify-content-between">
        <h4 class="special-heading">Only a maximum of 3 special categories is allowed!</h4>
        ${printAddButton(specials)}
    </div> 
    <div class="card-body table-responsive">
        <table class="table table-hover table-bordered">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeaderBig">Special Category Name</th>
                <th scope="col" class="tableHeader">Units Sold</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Edit</th>
            </tr>
            </thead>
            <tbody>
            ${renderedSpecials}
            </tbody>
        </table>
    </div>
</div>`})
}