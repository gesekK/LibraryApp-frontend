import React, { useState } from 'react';
import BookService from '../../services/BookService';
import '../../styles/DeleteBook.css';
import { Button } from '@mui/material';
import { Field } from 'formik'; // Importowanie stylu CSS

const DeleteBook: React.FC = () => {
  const [id, setId] = useState<number | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.target.value));
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await BookService.deleteBook(id);
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('There was an error deleting the book!', error);
      }
    }
  };

  return (
    <div className="delete-book-container">
      <input
        type="number"
        placeholder="Enter book ID to delete"
        onChange={handleChange}
      />
      <Button onClick={handleDelete}>Delete Book</Button>
    </div>
  );
};

export default DeleteBook;
