import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  contanerClassName?: string;
}
const BookList = ({ title, books, contanerClassName }: Props) => {
  return (
    <section className={contanerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100"> {title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
