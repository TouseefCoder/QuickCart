import connectDb from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "You are not a seller" },
        { status: 401 }
      );
    }
    await connectDb();

    const productData = await Product.find({});
    return NextResponse.json({ success: true, productData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
