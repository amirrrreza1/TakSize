import Image from "next/image";
import empty from "../../assets/images/emptyList/empty-messages.png";

const FavoriteStore = () => {
  return (
    <div className="absolute top-[35%] right-[50%] translate-x-[50%]">
      <Image src={empty} width={200} height={200} alt="not-found" />
      <h2 className="mt-[20px]">هنوز فروشگاه موزد علاقه نداری ! </h2>
    </div>
  );
};

export default FavoriteStore;
