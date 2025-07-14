import React from "react";

const SubstableItem = ({ email, date, mongoId, deleteEmail }) => {
	const emailDate = new Date(date);
	return (
		<tr className="bg-white border-b text-left">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
			>
				{email || "No Email"}
			</th>
			<td className="px-6 py-4 hidden sm:block">
				{emailDate ? emailDate.toISOString() : "1 Jan 2025"}
			</td>
			<td
				className="px-6 py-4 cursor-pointer"
				onClick={() => {
					deleteEmail(mongoId);
				}}
			>
				x
			</td>
		</tr>
	);
};

export default SubstableItem;
