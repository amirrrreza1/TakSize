import CategoryLayout from "../(sections)/categoryLayout/categoryLayout";
import SliderStory from "../../Components/SliderStory/SliderStory";
import Logo from "../../Components/Logo/Logo";
import SearchInput from "../../Components/Search/Search";
import Products from "../../Components/Products/Products";
import empty from "../../assets/images/emptyList/empty-list.png";
import Image from "next/image";

const fetcher = async () => {
  const res = await fetch("https://api.taksize.com/api/v1/Common/Home/Index", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      imei: "123456789123456789",
      adsPagable: {
        page: 1,
        pageSize: 30,
        search: "string",
      },
      filtering: {
        cityIds: [0],
      },
    }),
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data;
};

const storeDataFetcher = async (id) => {
  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Advertising/GetByCategoryId",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        imei: "123456789123456789",
        pagable: {
          page: 1,
          pageSize: 30,
          search: "string",
        },
        categoryId: id,
        filtering: {
          cityIds: [],
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data;
};

const Category = async ({ params }) => {
  const { slug } = await params;
  const data = await fetcher();
  const storeData = await storeDataFetcher(slug);

  const dataStore = await storeData?.data?.storeAdses;
  if (!data?.data?.categories) {
    return null;
  }
  const categories = data.data.categories;
  const pureData = categories?.filter((elem) => elem.categoryId == slug)[0]
    ?.childs;

  return (
    <div className="container">
      <Logo />
      <SearchInput />
      <CategoryLayout tab_id={slug} />
      <div className="pb-[60px]">
        <div className="flex justify-center gap-x-5 flex-wrap">
          <SliderStory data={pureData} />
        </div>

        <div className="flex max-w-[1400px] mx-auto mt-[25px] w-full justify-center items-center gap-x-5 gap-y-7 flex-wrap text-gray-700 font-regular pb-[50px]">
          {storeData?.data?.adses?.length > 0 ? (
            storeData.data.adses.map((item) => (
              <Products key={item.id} item={item} slug={slug} />
            ))
          ) : (
            <div>
              <Image src={empty} width={200} height={200} alt="not-found" className="mx-auto" />
              <h2 className="mt-[20px]">محصولی در این دسته بندی وجود ندارد</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
