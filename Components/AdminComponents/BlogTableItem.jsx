import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({
	authorImg,
	title,
	author,
	date,
	deleteBlog,
	mongoId,
}) => {
	const blogDate = new Date(date);

	return (
		<tr className="bg-white border-b">
			<th
				scope="row"
				className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
			>
				<Image
					width={40}
					height={40}
					src={authorImg || assets.profile_icon}
					alt=""
				/>
				<p>{author || "No author"}</p>
			</th>
			<td className="px-6 py-4">{title || "No title"}</td>
			<td className="px-6 py-4">{blogDate.toDateString() || "11 Jan 2024"}</td>
			<td
				onClick={() => deleteBlog(mongoId)}
				className="px-6 py-4 cursor-pointer"
			>
				x
			</td>
		</tr>
	);
};

export default BlogTableItem;
