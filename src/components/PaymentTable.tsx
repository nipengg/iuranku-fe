export default function PaymentTable() {
    return (
        <div className="overflow-x-auto text-black">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Invoice</th>
                        <th>Address</th>
                        <th>Payment Date</th>
                        <th>Invoice Detail</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Invoice #001</td>
                        <td>123 Blue St</td>
                        <td>2024-12-10</td>
                        <td>Detail of invoice #001</td>
                        <td>
                            <button className="btn btn-success btn-sm">
                                Success
                            </button>
                        </td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Invoice #002</td>
                        <td>456 Purple Ave</td>
                        <td>2024-12-09</td>
                        <td>Detail of invoice #002</td>
                        <td>
                            <button className="btn btn-sm btn-success mr-4">
                                Edit
                            </button>
                            <button className="btn btn-sm btn-error">
                                Delete
                            </button>
                        </td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Invoice #003</td>
                        <td>789 Red Blvd</td>
                        <td>2024-12-08</td>
                        <td>Detail of invoice #003</td>
                        <td>
                            <button className="btn btn-success btn-sm">
                                Success
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
