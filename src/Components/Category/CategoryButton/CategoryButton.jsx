const CategoryButton = ({ title, categoryId, clickHandler, category,storeId }) => {
  // console.log(storeId);
  
  return (
    <>
      <button
        onClick={() => clickHandler(categoryId)}
        className={`py-2 px-4 ${
          categoryId === category ? "border-b-2 border-teal-500" : ""
        } text-gray-600`}
      >
        {title}
      </button>
    </>
  );
};

export default CategoryButton;
