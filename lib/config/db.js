import mongoose from "mongoose";

export const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected Successfully");
		});

		connection.on("error", () => {
			console.log(
				"MongoDB connected failed. Please make sure MongoDB is running. " +
					error
			);
		});
	} catch (error) {
		console.log("Something went wrong while connecting to MongoDB", error);
	}
};
