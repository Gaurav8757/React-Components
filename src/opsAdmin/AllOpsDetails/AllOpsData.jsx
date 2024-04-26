/* eslint-disable react/prop-types */
import UpdateOps from '../updateOPS/UpdateOps.jsx';

function AllOpsData({ data, policy, deleteStaff }) {
    return (
        <tr
            className="divide-y text-sm font-medium border border-black">
            <td className="whitespace-nowrap px-1  border border-black">
                <UpdateOps UpdateOps={data} update={policy} />
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.policyrefno}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.entryDate}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.branch}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.insuredName}
            </td>

            <td className="whitespace-nowrap px-1  border border-black">
                {data.contactNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.staffName}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.currentTime}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.empTime}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.company}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.category}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.policyType}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.policyNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.engNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.chsNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.odPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.liabilityPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.netPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.taxes}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.rsa}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.finalEntryFields}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.odDiscount}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.ncb}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.policyPaymentMode}
            </td>
            <td className="px-1 py-0 border border-black">
                <button type="button" onClick={() => deleteStaff(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2 py-1 text-center ">Delete</button>
            </td>

        </tr>
    )
}

export default AllOpsData;