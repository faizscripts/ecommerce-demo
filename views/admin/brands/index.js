const layout = require('../layout');
const title = 'View Brands'

module.exports = ({brands, categories}) => {

    function subCheck(brand) {
        if (brand.subBrands.length>0){
            return `
            <td class="hasSub view_table_name" data-bs-toggle="collapse" data-bs-target="#_${brand._id}" >${brand.brand_name} <i class="fas fa-caret-down ms-1"></i></td>
            <td></td>
        `} else {
            return `
            <td class="view_table_name"><a href="/admin/products/brands/${brand._id}">${brand.brand_name}</a> </td>
            <td class="view_table_name">${categoryName(brand.brandCategoryID, categories)}</td>
        `}
    }

    function subBrandsPrint(brand) {
        let renderedSubBrands;
        if (brand.subBrands.length>0){
            const headerRow =  `
                        <tr class="collapse" id="_${brand._id}">
                        <td class="view_table_name"><a href="/admin/products/brands/${brand._id}">View all ${brand.brand_name}</a> </td>
                        <td></td> <td></td> <td></td> <td></td> 
                        </tr>
                    `
            brand.subBrands.sort((a,b) => a.subBrandName.localeCompare(b.subBrandName))
            renderedSubBrands = brand.subBrands.map(subBrand => {
                return `
                        <tr  class="collapse table-secondary table-bordered" id="_${brand._id}">
                            <td class="subBrandsCollapse text-muted">${subBrand.subBrandName}</td>
                            <td class="subBrandCategory text-muted">${categoryName(subBrand.subBrandCategoryID, categories)}</td>
                            <td>${subBrand.unitsSold}</td>
                            <td>${subBrand.income}</td>
                            <td></td>
                        </tr>
                `
            }).join('');
            renderedSubBrands = headerRow.concat(renderedSubBrands)
        } else {
            renderedSubBrands = ''
        }
        return renderedSubBrands
    }

    function categoryName(categoryID, categories) {
        const result = categories.filter(value => value._id.toString() === categoryID.toString())
        return result[0].category_name;
    }

    const renderedBrands = brands.map(
        brand => {
            return `
    <tr>
    ${subCheck(brand)}
    <td>${brand.unitsSold}</td>
    <td>${brand.income}</td>
    <td>
        <a href="/admin/brands/edit/${brand._id}"><i class="far fa-edit"></i></a>
        <div>
<!--        <div  class="deleteForm ms-4">-->
<!--            <button type="button" data-bs-toggle="modal" data-bs-target="#_${brand._id}" class="formBtn">-->
<!--            <i class="far fa-trash-alt "></i>-->
<!--            </button>-->
<!--        </div>-->
<!--        -->
<!--        <div class="modal fade" id="_${brand._id}" tabindex="-1" aria-labelledby="brandModal" aria-hidden="true">-->
<!--            <div class="modal-dialog modal-dialog-centered">-->
<!--                <div class="modal-content">-->
<!--                <form method="POST" >-->
<!--                    <div class="modal-body">-->
<!--                        <p><b>DELETE</b> ${brand.brand_name}?</p>-->
<!--                    </div>-->
<!--                    <div class="modal-footer">-->
<!--                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>-->
<!--                        <button class="btn btn-danger" type="submit" formaction="/admin/brands/delete/${brand._id}">Confirm</button>-->
<!--                    </div>-->
<!--                </form>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        </div>
    </td>
    ${subBrandsPrint(brand)}

    `}).join(``);

    return layout({
        title: title,
        content: `
<div id="viewProducts" class="card ">
    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary mt-4 me-3" style="font-size: 0.8rem" onclick="location.href='/admin/brands/new'">Add New Brand</button>
    </div>  
    <div class="card-body table-responsive">
        <table class="table table-hover table-bordered" id="brandsT">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeaderBig">Brand Name</th>
                <th scope="col" class="tableHeader">Category</th>
                <th scope="col" class="tableHeader">Units Sold</th>
                <th scope="col" class="tableHeader">Income</th>
                <th scope="col" class="tableHeader">Edit</th>
            </tr>
            </thead>
            <tbody>
            ${renderedBrands}
            </tbody>
        </table>
    </div>
</div>`})
}