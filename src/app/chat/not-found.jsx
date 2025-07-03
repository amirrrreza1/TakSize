import empty from "../../assets/images/emptyList/empty-list.png";
import Image from "next/image";

const NotFoundChat = () => {
    return ( 
        <div className="absolute top-[35%] right-[50%] translate-x-[50%] flex flex-col justify-center items-center ">
             <Image src={empty} width={200} height={200} alt="not-found"/>
            <h1 className="mt-[20px]">هنوز پیامی ندارید ! </h1>
        </div>
     );
}
 
export default NotFoundChat;