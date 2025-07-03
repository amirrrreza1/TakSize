import Image from "next/image";
import Logo1 from "../../assets/images/logo/logo.svg"
const Logo = () => {
    return ( 
        <div className="flex justify-center items-center mt-[20px] my-[20px]">
            <Image alt="logo" width={100} height={100} src={Logo1}/>
        </div>
     );
}
 
export default Logo;