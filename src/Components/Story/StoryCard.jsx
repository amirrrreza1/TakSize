import Image from "next/image";
import Link from "next/link";

const StoryCard = ({ setCategory, id, picture, title }) => {
  const clickHandler = () => {};

  return (
    <Link
      onClick={clickHandler}
      href={"/"}
      className="md:flex flex-col justify-center items-center gap-2"
    >
      <div className=" rounded-full aspect-square border bg-gray-400 flex justify-center items-center p-px">
        <Image
          className="w-[65px] h-[65px] rounded-[50%] object-cover"
          src={`https://api.taksize.com/${picture}`}
          alt="shirt"
          width={250}
          height={250}
        />
      </div>
      <p className="text-[12px] block text-center text-gray-600">{title}</p>
    </Link>
  );
};

export default StoryCard;
