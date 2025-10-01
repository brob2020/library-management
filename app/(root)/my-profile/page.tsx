import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { borrowRecords } from "@/database/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";

const Page = async () => {
  const session = await auth();
  const bookDetails = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id));
  if (!bookDetails) return <div>No books found</div>;
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={bookDetails} />
    </>
  );
};
export default Page;
