export default function PaymentTable() {
    return (
        <div className="overflow-x-auto text-black">
            <table className="table table-zebra">
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
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
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
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
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
                        <td>Tax Accountant</td>
                        <td>Red</td>
                        <td>
                            <button className="btn btn-success">Success</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
