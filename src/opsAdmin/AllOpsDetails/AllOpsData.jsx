/* eslint-disable react/prop-types */
import UpdateOps from '../updateOPS/UpdateOps.jsx';
// import axios from 'axios';
function AllOpsData({ data, policy }) {
    return (
        <tr
            className="divide-y text-sm font-medium border border-black">
            <td className="whitespace-nowrap px-1  border border-black">
                <UpdateOps UpdateOps={data} update={policy} />
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data._id}
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
            <td className="whitespace-nowrap px-1 border border-black">
                {data.category}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.company}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.vehRegNo}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.segment}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.sourcing}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.hypo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.advisorName}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.subAdvisor}
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
                {data.finalEntryFields}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.odDiscount}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.ncb}
            </td>
        </tr>
    )
}

export default AllOpsData;