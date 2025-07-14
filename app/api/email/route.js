import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
	try {
		await ConnectDB();
		return NextResponse.json({ msg: "API working" });
	} catch (error) {
		console.error("DB connection failed:", error);
		return NextResponse.json(
			{ success: false, msg: "Failed to connect to DB" },
			{ status: 500 }
		);
	}
};

LoadDB();

export async function POST(request) {
	const formData = await request.formData();
	const emailData = {
		email: `${formData.get("email")}`,
	};

	await EmailModel.create(emailData);
	return NextResponse.json({
		success: true,
		msg: "Email Subscribed",
	});
}

export async function GET(request) {
	const emails = await EmailModel.find({});
	return NextResponse.json({ emails });
}

export async function DELETE(request) {
	const id = await request.nextUrl.searchParams.get("id");
	await EmailModel.findByIdAndDelete(id);
	return NextResponse.json({ success: true, msg: "Email deleted" });
}
