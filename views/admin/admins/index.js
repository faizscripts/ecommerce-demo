const {displayDate} = require('../../../middlewares/otherFunctions')
const layout = require('../layout');
const title = 'View Admins'

module.exports = ({admins}) => {
    const renderedAdmins = admins.map(
        admin => {
            return `<tr>
    <td>${displayDate(admin.dateCreated)}</td>
    <td style="text-transform: capitalize;">${admin.admin_name}</td>
    <td><a href="mailto:${admin.email}"> ${admin.email}</a></td>
    <td><a href="tel:0${admin.phone}">0${admin.phone}</a></td>
</tr>
            `}).join('')

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/admins/new'">Add New Admin</button>
    </div> 
    <div class="card-body table-responsive">
        <table class="table table-hover table-bordered" id="adminT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader" style="text-transform: capitalize;">Name</th>
                <th scope="col" class="tableHeader">Email</th>
                <th scope="col" class="tableHeader">Phone</th>
            </tr>
            </thead>
            <tbody>
            ${renderedAdmins}
            </tbody>
        </table>
    </div>
</div>`})
}