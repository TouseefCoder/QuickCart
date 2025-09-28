import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "next-ecomerce" });

// Inngest function to save user data to MongoDB when a user is created in Clerk
export const asyncUserCreation = inngest.createFunction(
  {
    id: "async/user/creation",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDb();
    await User.create(userData);
  }
);

// Inngest function to update user data in MongoDB when a user is updated in Clerk
export const asyncUserUpdate = inngest.createFunction(
  {
    id: "async/user/update",
  },
  {
    event: "cler/user.updated",
  },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDb();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user data from MongoDB when a user is deleted in Clerk

export const asyncUserDeletion = inngest.createFunction(
  {
    id: "async/user/deletion",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event, step }) => {
    const { id } = event.data;
    await connectDb();
    await User.findByIdAndDelete(id);
  }
);
