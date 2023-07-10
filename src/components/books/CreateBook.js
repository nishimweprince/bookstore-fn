import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../states/apiSlice';
import { getBase64 } from '../helpers/uploads';
import { setBookCover } from '../../states/features/bookSlice';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {

  const dispatch = useDispatch();
  const bookCover = useSelector(state => state.book.bookCover);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      copies: 1,
      isbn: '978-0735211292',
      genreName: 'Self-Improvement',
    },
  });


  const [
    addBook,
    {
      data: bookData,
      isLoading: bookLoading,
      isSuccess: bookSuccess,
      isError: bookError,
    },
  ] = useAddBookMutation();

  const onSubmit = (data) => {
    const book = {...data, cover: bookCover, releaseYear: data.releaseYear.split('-')[0]}
    addBook({ book })
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (bookSuccess) setTimeout(() => {
      navigate('/')
    }, 1500);
  }, [bookData, bookLoading, bookSuccess, bookError])

  const inputsClassName =
    'py-4 px-8 w-full rounded-lg text-[1.3rem] border-[.1rem] border-slate-400 focus:border-primary outline-none';
  const labelClassName = 'flex flex-col items-start gap-4 text-[1.5rem] w-1/2';

  return (
    <section className="create_book_container w-[90%] p-12 flex items-center justify-evenly mx-auto h-full min-h-[80vh]">
      <form
        className="create_book flex flex-col gap-8 w-1/2 items-center shadow-xl p-8 lg:w-2/3 md:w-3/4 sm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-[2rem] font-medium my-8">
          Add new book to your collection
        </h2>
        <label className={labelClassName}>
          Book Title
          <input
            type="text"
            placeholder="Atomic Habits"
            className={inputsClassName}
            {...register('title', { required: true })}
          />
        </label>
        <label className={labelClassName}>
          Author Name
          <input
            type="text"
            placeholder="James Clear"
            className={inputsClassName}
            {...register('authorName', { required: true })}
          />
        </label>
        <label className={labelClassName}>
          Genre
          <input
            type="text"
            placeholder="Atomic Habits"
            className={inputsClassName}
            {...register('genreName', { required: true })}
          />
        </label>
        <label className={labelClassName}>
          Release Year
          <input
            type="month"
            placeholder="2019"
            className={inputsClassName}
            {...register('releaseYear', { required: true })}
          />
        </label>
        <label className={labelClassName}>
          ISBN
          <input
            type="text"
            placeholder="978-0735211292"
            className={inputsClassName}
            {...register('isbn', { required: true })}
          />
        </label>
        <label className={labelClassName}>
          Copies
          <input
            type="number"
            placeholder="1"
            className={inputsClassName}
            {...register('copies', { required: true })}
          />
        </label>
        <label className={labelClassName}>
          Book Cover
          <input
            type="file"
            alt="Book Title"
            className={inputsClassName}
            {...register('cover', {
              required: true,
              onChange: (e) => {
                getBase64(e.target.files[0], (result) => {
                  dispatch(setBookCover(result));
                });
              }
            })}
          />
        </label>
        <div
          className={`create_book_feedbacks ${
            bookSuccess || bookError ? 'flex flex-col items-center' : 'hidden'
          }`}
        >
          <p
            className={`text-[1.5rem] text-red-600 ${
              bookError ? 'flex' : 'hidden'
            }`}
          >
            Could not create book
          </p>
          <p
            className={`text-[1.5rem] text-green-600 ${
              bookSuccess ? 'flex' : 'hidden'
            }`}
          >
            Book created successfully
          </p>
        </div>
        <input
          type="submit"
          value={`${bookLoading ? 'Loading...' : 'Add Book'}`}
          className="py-6 px-8 w-full max-w-[50%] rounded-[.5rem] my-6 cursor-pointer text-[1.5rem] bg-primary text-white ease-in-out duration-300 hover:scale-95"
        />
      </form>
    </section>
  );
};

export default CreateBook;
