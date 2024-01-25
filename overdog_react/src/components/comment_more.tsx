export const CommentMore = () => {
  return (
    <div className="flex items-center my-3 mx-2">
      <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
      <div>
        <div className="flex">
          <div className="ml-2 text-[14px] font-semibold">nickname</div>
          <div className="ml-2 text-[14px]">content</div>
        </div>
        <div className="flex">
          <div className="ml-2 text-[11px]">1주</div>
        </div>
      </div>
    </div>
  );
};
