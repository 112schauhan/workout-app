import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest, NextResponse } from "next/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

import mongoose from "mongoose";

// Apply CORS middleware
// app.use(cors(corsOptions));

const uri = process.env.BACKEND_URL;
export const connectDB = async () => {
    try {
        if (uri) {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds (default is 10000ms)
            });
            console.log("🎉 connected to database successfully");
        }
    } catch (error) {
        console.error(error);
    }
};
connectDB();

const server = new ApolloServer({
    typeDefs, resolvers
});


const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
    return handler(request);
}

export async function POST(request: NextRequest) {
    return handler(request);
}