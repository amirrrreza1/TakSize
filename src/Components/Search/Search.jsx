import { LocationIco } from "../../assets/icon/svgExport";

const SearchInput = () => {
  return (
    <div className="lg:hidden w-[80%] text-[12px] mx-auto my-[30px] flex items-center border border-gray-300 rounded-lg p-2 bg-white shadow-md">
      <input
        type="text"
        placeholder="جستجو در پوشاک، کیف و کفش ..."
        className="ml-2 flex-1 outline-none placeholder-gray-400"
      />
      <div>
        <LocationIco color="green" fill="green" />
      </div>
    </div>
  );
};

export default SearchInput;
