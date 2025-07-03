"use client";
import StoryCard from "./StoryCard";

const Story = ({ data }) => {
  return (
    <div className="flex mx-auto mt-6 justify-center items-center gap-x-5 flex-wrap font-regular">
      {data?.childs?.map((item) => {
        return (
          <>
            <StoryCard {...item} />
          </>
        );
      })}
    </div>
  );
};

export default Story;
