// module.exports = (response, totalData, page, limit) => {
//     return response.send({
//         totalData,
//         page,
//         limit
//     })
// }

module.exports = {
    pageInfo: (response, totalData, page, limit) => {
        return response.send({
            totalData,
            page,
            limit
        })
    }
}