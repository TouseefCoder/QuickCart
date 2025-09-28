import { serve } from "inngest/next";
import {
  asyncUserCreation,
  asyncUserDeletion,
  asyncUserUpdate,
  inngest,
} from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [asyncUserCreation, asyncUserUpdate, asyncUserDeletion],
});
